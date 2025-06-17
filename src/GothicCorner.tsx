import React from "react";

export default function GothicCorner({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <path
        d="M62 2Q40 8 32 32Q8 40 2 62"
        stroke="#bfa45d"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#shadow)"
      />
      <defs>
        <filter id="shadow" x="0" y="0" width="80" height="80">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#000" />
        </filter>
      </defs>
    </svg>
  );
}