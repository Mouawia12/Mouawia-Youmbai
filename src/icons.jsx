// Inline SVG icons — stroke uses currentColor, so color comes from the parent.
// No emoji anywhere; these are the only glyphs used as icons.
import React from "react";

const base = {
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export const Icon = {
  layers: (p) => (
    <svg {...base} {...p}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="m3 13 9 5 9-5" />
      <path d="m3 18 9 5 9-5" opacity="0.5" />
    </svg>
  ),
  cursor: (p) => (
    <svg {...base} {...p}>
      <path d="M4 3l7 18 2.5-7.5L21 11 4 3Z" />
    </svg>
  ),
  spark: (p) => (
    <svg {...base} {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
    </svg>
  ),
  gauge: (p) => (
    <svg {...base} {...p}>
      <path d="M12 13 15.5 9.5" />
      <path d="M4 18a8 8 0 1 1 16 0" />
      <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  server: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  ),
  database: (p) => (
    <svg {...base} {...p}>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      <path d="M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  ),
  pin: (p) => (
    <svg {...base} {...p}>
      <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  ),
  mail: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  arrowDown: (p) => (
    <svg {...base} {...p}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  ),
  github: (p) => (
    <svg {...base} {...p}>
      <path d="M9 19c-4 1.3-4-2-6-2.5m12 4.5v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.6 2 5.6 2.3 5.6 2.3a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 8.8c0 4.6 2.8 5.6 5.5 6a3 3 0 0 0-.8 2.3V21" />
    </svg>
  ),
  linkedin: (p) => (
    <svg {...base} {...p}>
      <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-10h4v1.5" />
      <rect x="2" y="9" width="4" height="11" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  x: (p) => (
    <svg {...base} {...p}>
      <path d="M4 4l16 16M20 4 4 20" />
    </svg>
  ),
};
