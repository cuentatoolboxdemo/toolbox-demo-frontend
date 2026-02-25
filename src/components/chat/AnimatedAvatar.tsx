"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import type { TenantTheme } from "@/lib/tenants";

interface AnimatedAvatarProps {
    isShrunk: boolean;
    isThinking: boolean;
    theme: TenantTheme;
}

export function AnimatedAvatar({ isShrunk, isThinking, theme }: AnimatedAvatarProps) {
    return (
        <div className="relative flex items-center justify-center w-64 h-64 pointer-events-none">
            {/* Core Glow */}
            <div
                className={`absolute rounded-full blur-[40px] transition-all duration-700 ${isThinking ? "w-48 h-48 animate-pulse" : "w-32 h-32 opacity-70"
                    }`}
                style={{ backgroundColor: isThinking ? theme.avatarPulse : theme.avatarGlow }}
            />

            {/* Inner solid ring */}
            <div
                className={`absolute rounded-full border transition-all duration-1000 animate-[spin_4s_linear_infinite] ${isThinking ? "w-48 h-48 border-4 animate-[spin_2s_linear_infinite]" : "w-36 h-36 border-[1px]"
                    }`}
                style={{ borderColor: theme.ring }}
            />

            {/* Outer dashed ring */}
            <div
                className={`absolute rounded-full border border-dashed transition-all duration-1000 animate-[spin_8s_linear_infinite_reverse] ${isThinking ? "w-64 h-64 border-[3px] animate-[spin_3s_linear_infinite_reverse]" : "w-48 h-48 border-[1px]"
                    }`}
                style={{ borderColor: theme.ring, opacity: isThinking ? 0.8 : 0.5 }}
            />

            {/* Outer scattered ring (decorational dots) */}
            {!isShrunk && (
                <div className="absolute w-64 h-64 animate-[spin_12s_linear_infinite] opacity-60">
                    <div className="w-2 h-2 rounded-full absolute top-0 left-1/2 -translate-x-1/2" style={{ backgroundColor: theme.primary }} />
                    <div className="w-1 h-1 rounded-full absolute bottom-4 right-10" style={{ backgroundColor: theme.avatarPulse }} />
                    <div className="w-1.5 h-1.5 rounded-full absolute top-10 left-4" style={{ backgroundColor: theme.ring }} />
                </div>
            )}

            {/* Center Iris / Eye */}
            <div
                className={`absolute rounded-full flex items-center justify-center bg-white transition-all duration-500 ${isThinking ? "w-16 h-16 scale-110" : "w-12 h-12 scale-100"
                    }`}
                style={{
                    boxShadow: `0 0 ${isThinking ? '40px' : '20px'} ${theme.avatarGlow}`,
                }}
            >
                {theme.logoUrl ? (
                    <img src={theme.logoUrl} alt="Logo" className="w-[70%] h-[70%] object-contain" />
                ) : (
                    <div className={`absolute inset-0 rounded-full m-auto transition-all ${isThinking ? "w-10 h-10 animate-ping opacity-50" : "w-4 h-4 opacity-50"
                        }`}
                        style={{ backgroundColor: theme.avatarPulse }}
                    />
                )}
            </div>
        </div>
    );
}
