"use client";

import React, { useEffect, useState } from "react";

type EducationalTool = {
  icon: string;
  name: string;
  delay: string;
  duration: string;
};

const getRandom = (max: number) => Math.random() * max;

const EducationToolsBackground: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Static gradient background elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-15 animate-pulse" />
      </div>

      {/* Floating geometric shapes for education theme */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={
              {
                left: `${getRandom(100)}%`,
                top: `${getRandom(100)}%`,
                animation: `drift ${8 + getRandom(60)}s linear infinite`,
                animationDelay: `${getRandom(50)}s`,
              } as React.CSSProperties
            }
          >
            {i % 4 === 0 && <div className="w-6 h-6 bg-blue-400 rounded rotate-45" />}
            {i % 4 === 1 && <div className="w-4 h-4 bg-green-400 rounded-full" />}
            {i % 4 === 2 && <div className="w-8 h-2 bg-purple-400 rounded-full" />}
            {i % 4 === 3 && <div className="w-5 h-5 border-2 border-orange-400 rounded" />}
          </div>
        ))}
      </div>

      {/* Additional floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-20"
            style={
              {
                left: `${getRandom(100)}%`,
                top: `${getRandom(100)}%`,
                animation: `twinkle ${3 + getRandom(4)}s ease-in-out infinite`,
                animationDelay: `${getRandom(3)}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(2deg);
          }
          50% {
            transform: translateY(-5px) rotate(-1deg);
          }
          75% {
            transform: translateY(-10px) rotate(1deg);
          }
        }

        @keyframes drift {
          0% {
            transform: translateX(-50px) translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateX(50px) translateY(-30px) rotate(180deg);
          }
          100% {
            transform: translateX(-50px) translateY(0px) rotate(360deg);
          }
        }

        @keyframes ring {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.1;
          }
        }

        @keyframes drawLine {
          0%,
          100% {
            stroke-dasharray: 0, 100;
          }
          50% {
            stroke-dasharray: 50, 100;
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
};

export default EducationToolsBackground;
