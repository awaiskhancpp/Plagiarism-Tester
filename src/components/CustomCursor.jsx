"use client";
import { useState, useEffect } from "react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-40"
      style={{
        left: mousePosition.x - 100,
        top: mousePosition.y - 100,
        width: "200px",
        height: "200px",
        background: "white",
        borderRadius: "50%",
        mixBlendMode: "difference",
        transition: "left 0.1s ease-out, top 0.1s ease-out",
        filter: "contrast(-1) brightness(1)",
      }}
    />
  );
}
