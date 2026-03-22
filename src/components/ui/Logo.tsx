'use client';

import React from 'react';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="180"
        height="40"
        viewBox="0 0 180 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-full"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="180" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Abstract "Choreography" Symbol */}
        <g filter="url(#glow)">
          <path
            d="M5 12C5 12 15 5 25 12C35 19 45 12 45 12"
            stroke="url(#logo-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-40"
          />
          <path
            d="M5 20C5 20 15 13 25 20C35 27 45 20 45 20"
            stroke="url(#logo-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M5 28C5 28 15 21 25 28C35 35 45 28 45 28"
            stroke="url(#logo-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-40"
          />
        </g>

        {/* KORE Wordmark */}
        <text
          x="60"
          y="29"
          fill="url(#logo-gradient)"
          fontSize="32"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
          letterSpacing="-0.05em"
          fontStyle="italic"
          style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.3))' }}
        >
          KORE
        </text>
      </svg>
    </div>
  );
}
