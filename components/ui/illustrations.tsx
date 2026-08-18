import React from 'react';

// Ghana/Ashanti map silhouette as inline SVG
export function GhanaMapSilhouette() {
  return (
    <svg
      viewBox="0 0 300 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
    >
      <path
        d="M150 20 L230 45 L270 90 L275 150 L260 200 L250 240 L230 270 L200 300 L170 330 L150 355 L130 330 L100 300 L70 270 L50 240 L40 200 L25 150 L30 90 L70 45 Z"
        className="fill-brand-gold stroke-brand-gold"
        fillOpacity="0.15"
        strokeWidth="2"
        strokeOpacity="0.4"
      />
      <path
        d="M120 180 L180 175 L195 200 L185 230 L160 245 L135 240 L115 220 Z"
        className="fill-brand-gold stroke-brand-gold"
        fillOpacity="0.45"
        strokeWidth="1.5"
      />
      <circle cx="155" cy="208" r="8" className="fill-brand-red" />
      <circle cx="155" cy="208" r="4" className="fill-white" />
      <circle className="pulse-ring stroke-brand-red" cx="155" cy="208" r="14" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
      <text x="168" y="212" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11" className="fill-brand-gold" fontWeight="600">
        Ejisu
      </text>
    </svg>
  );
}

// Ashanti region focused SVG map
export function AshantiMap() {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-md mx-auto"
      aria-label="Map of Ghana highlighting Ejisu in the Ashanti Region"
      role="img"
    >
      <path
        d="M200 15 L295 38 L350 85 L358 148 L342 200 L320 245 L295 278 L255 305 L200 318 L145 305 L105 278 L80 245 L58 200 L42 148 L50 85 L105 38 Z"
        className="fill-brand-green stroke-brand-green"
        fillOpacity="0.12"
        strokeWidth="1.5"
        strokeOpacity="0.35"
      />
      <path
        d="M155 170 L195 162 L238 168 L258 190 L252 218 L228 235 L198 242 L168 238 L148 220 L145 198 Z"
        className="fill-brand-gold stroke-brand-gold"
        fillOpacity="0.35"
        strokeWidth="2"
        strokeOpacity="0.7"
      />
      <circle cx="200" cy="205" r="9" className="fill-brand-red" />
      <circle cx="200" cy="205" r="4.5" className="fill-white" />
      <circle className="pulse-ring stroke-brand-red" cx="200" cy="205" r="16" strokeWidth="1.5" fill="none" opacity="0.5" />
      <text x="215" y="210" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="13" className="fill-brand-red" fontWeight="700">Ejisu</text>
      <text x="172" y="185" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" className="fill-brand-gold" fontWeight="500" opacity="0.85">Ashanti Region</text>
      <circle cx="170" cy="195" r="4" className="fill-brand-gold" opacity="0.6"/>
      <text x="130" y="195" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" className="fill-brand-gold" opacity="0.7">Kumasi</text>
      <text x="188" y="295" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" className="fill-brand-green" opacity="0.5">Accra</text>
      <circle cx="200" cy="288" r="3" className="fill-brand-green" opacity="0.35"/>
    </svg>
  );
}
