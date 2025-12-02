"use client";
import React, { useEffect, useState } from "react";
import { DM_Sans, Inter, Poppins, Raleway } from "next/font/google";

const dmSans_lighter = DM_Sans({ subsets: ["latin"], weight: ["200"] });
const rw = Raleway({ subsets: ["latin"], weight: ["200"] });
const poppins_light = Poppins({ subsets: ["latin"], weight: ["300"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function TestimonialsSection() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/v1/public/get-testimonials", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(Array.isArray(data) ? data : [data]);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const duplicatedUsers = [...users, ...users, ...users];

  const mockUsers = [
    {
      _id: "mock1",
      name: "Dr. Sarah Mitchell",
      profession: "University Professor",
      title: "Computer Science Department",
      bio: "SleuthInk has transformed how I grade assignments. The accuracy is unmatched.",
    },
    {
      _id: "mock2",
      name: "James Rodriguez",
      profession: "Graduate Student",
      title: "Research Scholar",
      bio: "Essential tool for ensuring my research papers maintain academic integrity.",
    },
    {
      _id: "mock3",
      name: "Emily Chen",
      profession: "High School Teacher",
      title: "English Department Head",
      bio: "Finally, a plagiarism detector that catches paraphrasing and AI-generated content.",
    },
  ];

  const displayUsers =
    users.length > 0
      ? duplicatedUsers
      : [...mockUsers, ...mockUsers, ...mockUsers];

  if (loading) {
    return (
      <div className="w-full bg-gradient-to-r from-black to-gray-900 py-20">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin border-4 border-solid border-purple-500 border-r-transparent"></div>
          <p className={`${dmSans_lighter.className} text-gray-400 mt-4`}>
            Loading testimonials...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-black to-gray-900 pt-20 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h1
          className={`${rw.className} text-center text-4xl md:text-5xl lg:text-[6rem] tracking-tighter bg-gradient-to-r from-purple-300 via-purple-500 to-purple-300 pb-2 bg-clip-text text-transparent p-1`}
        >
          Trusted by Educators & Students
        </h1>
        <p
          className={`${dmSans_lighter.className} text-xl mt-2 md:text-2xl text-gray-400`}
        >
          Join our community protecting academic integrity
        </p>
      </div>

      {/* Scrolling Carousel */}
      <div className="relative flex items-center">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-scroll -space-x-7">
          {displayUsers.map((user, index) => {
            const offsetY = index % 2 === 0 ? "translate-y-0" : "translate-y-0"; // No vertical offset

            return (
              <div
                key={`${user._id || user.email}-${index}`}
                className={`flex-shrink-0 w-80 h-80 ${offsetY}`}
              >
                {/* Glassy Floating Circle Card */}
                <div
                  className={`w-80 h-80 p-8 flex flex-col justify-between
    bg-gradient-to-r from-gray-900 to-transparent backdrop-blur-lg
    rounded-full
    hover:scale-105 
    transition-transform duration-500 relative overflow-hidden`}
                >
                  {/* Top Section - Profession */}
                  <div className="relative z-10">
                    {user.profession && (
                      <div className="text-3xl font-bold text-purple-300 leading-tight">
                        {user.profession}
                      </div>
                    )}
                  </div>

                  {/* Middle Section - Name & Quote */}
                  <div className="relative z-10 text-center">
                    <div
                      className={`${poppins.className} text-xl font-semibold text-white mb-4`}
                    >
                      {user.name}
                    </div>
                    {user.title && (
                      <div className="text-xs text-gray-400 mb-4 uppercase tracking-wider">
                        {user.title}
                      </div>
                    )}

                    {user.bio && (
                      <p
                        className={`${poppins_light.className} text-gray-200 text-sm mb-4 italic leading-relaxed`}
                      >
                        "{user.bio}"
                      </p>
                    )}
                    {user.department && (
                      <div className="text-xs text-gray-400 mb-4  tracking-wider">
                        {user.department}
                      </div>
                    )}
                  </div>

                  {/* Bottom Section - Email */}
                  <div className="relative z-10">
                    {user.email && (
                      <div className="text-xs text-gray-500 truncate">
                        {user.email}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CSS Animation */}
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>

      {/* Bottom Note */}
      <div className="text-center mt-12">
        <p
          className={`${dmSans_lighter.className} text-gray-500 underline text-sm`}
        >
          Profiles from our verified users
        </p>
      </div>
    </div>
  );
}
