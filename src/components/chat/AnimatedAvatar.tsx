"use client";

import React from "react";

interface AnimatedAvatarProps {
    isShrunk: boolean;
    isThinking: boolean;
}

export function AnimatedAvatar({ isShrunk, isThinking }: AnimatedAvatarProps) {
    return (
        <div className="relative flex items-center justify-center w-64 h-64 pointer-events-none">
            {/* Core Glow */}
            <div
                className={`absolute rounded-full bg-blue-500 blur-[40px] transition-all duration-700 ${isThinking ? "w-48 h-48 animate-pulse bg-indigo-500" : "w-32 h-32 opacity-70"
                    }`}
            />

            {/* Inner solid ring */}
            <div
                className={`absolute rounded-full border border-blue-300 transition-all duration-1000 animate-[spin_4s_linear_infinite] ${isThinking ? "w-48 h-48 border-indigo-400 border-4 animate-[spin_2s_linear_infinite]" : "w-36 h-36 border-[1px]"
                    }`}
            />

            {/* Outer dashed ring */}
            <div
                className={`absolute rounded-full border border-dashed border-blue-400/50 transition-all duration-1000 animate-[spin_8s_linear_infinite_reverse] ${isThinking ? "w-64 h-64 border-indigo-300 border-[3px] animate-[spin_3s_linear_infinite_reverse]" : "w-48 h-48 border-[1px]"
                    }`}
            />

            {/* Outer scattered ring (decorational dots) */}
            {!isShrunk && (
                <div className="absolute w-64 h-64 animate-[spin_12s_linear_infinite] opacity-60">
                    <div className="w-2 h-2 bg-blue-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2" />
                    <div className="w-1 h-1 bg-indigo-400 rounded-full absolute bottom-4 right-10" />
                    <div className="w-1.5 h-1.5 bg-blue-300 rounded-full absolute top-10 left-4" />
                </div>
            )}

            {/* Center Iris / Eye */}
            <div
                className={`absolute rounded-full bg-white shadow-[0_0_20px_rgba(59,130,246,0.8)] transition-all duration-500 ${isThinking ? "w-16 h-16 scale-110 shadow-[0_0_40px_rgba(99,102,241,1)]" : "w-12 h-12 scale-100"
                    }`}
            >
                {/* Pupil pulse */}
                <div className={`absolute inset-0 rounded-full bg-blue-100 m-auto transition-all ${isThinking ? "w-10 h-10 animate-ping opacity-50" : "w-4 h-4 opacity-50"
                    }`} />
            </div>
        </div>
    );
}
