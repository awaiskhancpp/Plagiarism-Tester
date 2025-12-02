"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Grid from "@/components/Grid";

export default function InternalAnalysisReport() {
  const params = useParams();
  const [analysisData, setAnalysisData] = useState(null);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [selectedOverlapId, setSelectedOverlapId] = useState(null);
  const contentRefA = useRef(null);
  const contentRefB = useRef(null);

  useEffect(() => {
    const id = params?.id;
    if (!id) return;
    const cached = localStorage.getItem(`internal:${id}`);

    if (cached) {
      const data = JSON.parse(cached);
      // Add unique IDs to overlaps
      if (data.comparisons) {
        data.comparisons.forEach((comp) => {
          if (comp.overlaps) {
            comp.overlaps.forEach((overlap, idx) => {
              overlap.uniqueId = `${comp.id}-${idx}`;
            });
          }
        });
      }
      setAnalysisData(data);
      console.log("Analysis data loaded:", data);
      setCurrentPairIndex(0);
    }
  }, [params]);

  const navigateToPair = (direction) => {
    if (!analysisData?.comparisons) return;

    const newIndex =
      direction === "next"
        ? (currentPairIndex + 1) % analysisData.comparisons.length
        : (currentPairIndex - 1 + analysisData.comparisons.length) %
          analysisData.comparisons.length;

    setCurrentPairIndex(newIndex);
    setSelectedOverlapId(null);
  };

  const currentPair = analysisData?.comparisons?.[currentPairIndex];
  const selectedOverlap = currentPair?.overlaps?.find(
    (o) => o.uniqueId === selectedOverlapId
  );

  useEffect(() => {
    if (currentPair) {
      console.log("Current pair overlaps:", currentPair.overlaps);
    }
  }, [currentPair]);

  // Helper to escape HTML
  function escapeForHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Helper to escape regex
  function escapeRegex(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  // Highlight overlaps in content - NOW DOCUMENT-AWARE
  // Replace the highlightContent function in your component with this:

  const highlightContent = (content, overlaps, docName) => {
    if (!content || !overlaps || overlaps.length === 0) {
      return { __html: escapeForHtml(content || "No content available") };
    }

    // Create an array to track which characters are already highlighted
    const highlightMap = new Array(content.length).fill(null);
    const highlights = [];

    // Sort by similarity (highest first) so important matches take precedence
    const sorted = [...overlaps].sort((a, b) => b.similarity - a.similarity);

    sorted.forEach((overlap) => {
      if (!overlap) return;

      // Determine which text to highlight based on which document we're viewing
      let textToHighlight;

      if (overlap.fromDoc === docName && overlap.sectionA) {
        textToHighlight = overlap.sectionA;
      } else if (overlap.toDoc === docName && overlap.sectionB) {
        textToHighlight = overlap.sectionB;
      } else {
        textToHighlight = overlap.text;
      }

      if (!textToHighlight) return;

      // Find all occurrences of this text (case-insensitive)
      const normalizedContent = content.toLowerCase();
      const normalizedText = textToHighlight.toLowerCase();
      let startIndex = 0;

      while (
        (startIndex = normalizedContent.indexOf(normalizedText, startIndex)) !==
        -1
      ) {
        const endIndex = startIndex + textToHighlight.length;

        // Check if this range is already highlighted by a higher-priority match
        let alreadyHighlighted = false;
        for (let i = startIndex; i < endIndex; i++) {
          if (highlightMap[i] !== null) {
            alreadyHighlighted = true;
            break;
          }
        }

        // Only add this highlight if the area is not already covered
        if (!alreadyHighlighted) {
          // Mark this range as highlighted
          for (let i = startIndex; i < endIndex; i++) {
            highlightMap[i] = overlap.uniqueId;
          }

          const isSelected = overlap.uniqueId === selectedOverlapId;
          const colorClass = isSelected
            ? "bg-blue-500"
            : overlap.similarity >= 85
            ? "bg-red-500"
            : overlap.similarity >= 70
            ? "bg-yellow-500"
            : "bg-orange-500";

          highlights.push({
            start: startIndex,
            end: endIndex,
            text: content.substring(startIndex, endIndex),
            colorClass,
            uniqueId: overlap.uniqueId,
          });
        }

        startIndex = endIndex;
      }
    });

    // Sort highlights by position
    highlights.sort((a, b) => a.start - b.start);

    // Build the final HTML
    let html = "";
    let lastIndex = 0;

    highlights.forEach((highlight) => {
      // Add the text before this highlight
      html += escapeForHtml(content.substring(lastIndex, highlight.start));

      // Add the highlighted text
      html += `<span class="${
        highlight.colorClass
      } text-white px-1 cursor-pointer hover:opacity-90 transition" data-overlap-id="${
        highlight.uniqueId
      }">${escapeForHtml(highlight.text)}</span>`;

      lastIndex = highlight.end;
    });

    // Add any remaining text after the last highlight
    html += escapeForHtml(content.substring(lastIndex));

    return { __html: html };
  };

  // Handle click on highlighted text
  useEffect(() => {
    const handleClick = (e) => {
      const span = e.target.closest("span[data-overlap-id]");
      if (span && currentPair) {
        const overlapId = span.getAttribute("data-overlap-id");
        setSelectedOverlapId(overlapId);
      }
    };

    const contentA = contentRefA.current;
    const contentB = contentRefB.current;

    if (contentA) contentA.addEventListener("click", handleClick);
    if (contentB) contentB.addEventListener("click", handleClick);

    return () => {
      if (contentA) contentA.removeEventListener("click", handleClick);
      if (contentB) contentB.removeEventListener("click", handleClick);
    };
  }, [currentPair]);

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 flex items-center justify-center">
        <div className="text-gray-300">Loading internal analysis...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-200 py-20">
      <Grid />
      <div className="max-w-7xl mt-20 mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-6xl font-bold mb-2 tracking-tighter">
            Internal{" "}
            <span className="bg-gradient-to-r from-red-300 to-red-600 bg-clip-text text-transparent">
              Analysis
            </span>
          </h1>
          <p className="text-gray-400">
            {new Date(analysisData.uploadDate).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 underline mt-4 text-purple-400 hover:text-purple-300"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-4 my-20 px-80 h-40">
          <div className="bg-gradient-to-br from-gray-900/50 to-transparent flex items-center justify-center  rounded-lg p-6 border border-gray-700/50 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-red-300 to-red-600 bg-clip-text text-transparent mb-2">
                {analysisData.summary.totalDocuments}
              </div>
              <span className="text-gray-400 text-sm">Documents</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/50 to-transparent flex items-center justify-center rounded-lg p-6 border border-gray-700/50 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-red-300 to-red-600 bg-clip-text text-transparent mb-2">
                {analysisData.comparisons.length}
              </div>
              <span className="text-gray-400 text-sm">Comparisons ≥75%</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/50 flex items-center justify-center to-transparent rounded-lg p-6 border border-gray-700/50 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-red-300 to-red-600 bg-clip-text text-transparent mb-2">
                {analysisData.summary.highestSimilarity}%
              </div>
              <span className="text-gray-400 text-sm">Highest Similarity</span>
            </div>
          </div>
        </div>

        {/* Navigation and Details */}
        {currentPair && (
          <div className="max-w-7xl mx-auto">
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => navigateToPair("prev")}
                className="p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-full transition-colors"
                disabled={analysisData.comparisons.length <= 1}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="text-center">
                <h2 className="text-xl font-bold text-white mb-2">
                  Document Pair {currentPairIndex + 1} of{" "}
                  {analysisData.comparisons.length}
                </h2>
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-lg font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                    {currentPair.similarity}%
                  </span>
                  {currentPair.flagged ? (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>
              </div>

              <button
                onClick={() => navigateToPair("next")}
                className="p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-full transition-colors"
                disabled={analysisData.comparisons.length <= 1}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-4 h-[75vh]">
              {/* Document Viewers - Left Side */}
              <div className="lg:w-2/3 bg-gradient-to-br from-gray-900/50 to-transparent rounded-lg border border-gray-700/50 p-6 max-h-[75vh] overflow-y-auto flex flex-col space-y-6">
                {/* Document A */}
                <div>
                  <h3 className="text-white text-lg font-bold mb-3">
                    {currentPair.docA}
                  </h3>
                  <div
                    ref={contentRefA}
                    className="leading-relaxed text-sm text-gray-300 whitespace-pre-wrap break-words"
                    dangerouslySetInnerHTML={highlightContent(
                      currentPair.contentA,
                      currentPair.overlaps,
                      currentPair.docA
                    )}
                  />
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700/50" />

                {/* Document B */}
                <div>
                  <h3 className="text-white text-lg font-bold mb-3">
                    {currentPair.docB}
                  </h3>
                  <div
                    ref={contentRefB}
                    className="leading-relaxed text-sm text-gray-300 whitespace-pre-wrap break-words"
                    dangerouslySetInnerHTML={highlightContent(
                      currentPair.contentB,
                      currentPair.overlaps,
                      currentPair.docB
                    )}
                  />
                </div>
              </div>

              {/* Sidebar - Overlaps List */}
              <div className="lg:w-1/3 bg-gradient-to-br from-gray-900/50 to-transparent rounded-lg border border-gray-700/50 p-6 max-h-[75vh] overflow-y-auto flex flex-col">
                <div className="mb-4">
                  <h2 className="text-white font-bold text-lg">Overlaps</h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {currentPair.overlaps.length} matches found
                  </p>
                </div>

                {selectedOverlap ? (
                  <div className="space-y-4 flex-1">
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                      <p className="text-sm text-gray-400 mb-2">Matched Text</p>
                      <p className="text-gray-200 text-sm">
                        &quot;{selectedOverlap.text}&quot;
                      </p>
                    </div>

                    {/* Show context from both documents */}
                    {selectedOverlap.sectionA && (
                      <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-700/50">
                        <p className="text-sm text-blue-400 mb-2">
                          From {selectedOverlap.fromDoc}
                        </p>
                        <p className="text-gray-200 text-xs italic">
                          &quot;{selectedOverlap.sectionA}&quot;
                        </p>
                      </div>
                    )}

                    {selectedOverlap.sectionB && (
                      <div className="p-4 bg-green-900/20 rounded-lg border border-green-700/50">
                        <p className="text-sm text-green-400 mb-2">
                          From {selectedOverlap.toDoc}
                        </p>
                        <p className="text-gray-200 text-xs italic">
                          &quot;{selectedOverlap.sectionB}&quot;
                        </p>
                      </div>
                    )}

                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                      <p className="text-sm text-gray-400 mb-3">Similarity</p>
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                        <div
                          className={`h-2 rounded-full ${
                            selectedOverlap.similarity >= 85
                              ? "bg-red-500"
                              : selectedOverlap.similarity >= 70
                              ? "bg-yellow-500"
                              : "bg-orange-500"
                          }`}
                          style={{ width: `${selectedOverlap.similarity}%` }}
                        />
                      </div>
                      <span className="text-white text-sm font-bold">
                        {selectedOverlap.similarity}%
                      </span>
                    </div>

                    {selectedOverlap.context && (
                      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <p className="text-sm text-gray-400 mb-2">Context</p>
                        <p className="text-gray-300 text-xs italic">
                          {selectedOverlap.context}
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => setSelectedOverlapId(null)}
                      className="w-full py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200 text-sm rounded-lg border border-gray-700/50 transition-colors mt-auto"
                    >
                      Back to all
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 flex-1 overflow-y-auto">
                    {currentPair.overlaps.map((overlap) => (
                      <div
                        key={overlap.uniqueId}
                        onClick={() => setSelectedOverlapId(overlap.uniqueId)}
                        className={`p-3 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors border-l-4 ${
                          overlap.similarity >= 85
                            ? "border-red-500 bg-red-900/10"
                            : overlap.similarity >= 70
                            ? "border-yellow-500 bg-yellow-900/10"
                            : "border-orange-500 bg-orange-900/10" // 50-69% range
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-white text-sm font-medium line-clamp-2">
                            &quot;{overlap.text}&quot;
                          </p>
                          <span
                            className={`text-xs font-bold ml-2 flex-shrink-0 ${
                              overlap.similarity > 85
                                ? "text-red-400"
                                : overlap.similarity > 70
                                ? "text-yellow-400"
                                : "text-orange-400"
                            }`}
                          >
                            {overlap.similarity}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!currentPair && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/50 to-transparent my-32 rounded-lg p-12 border border-gray-700/50 text-center">
              <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">
                No document pairs with high similarity found
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
