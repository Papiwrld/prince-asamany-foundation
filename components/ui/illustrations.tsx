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

export interface MapHotspot {
  id: string;
  name: string;
  area: string;
  tag: string;
  tagColor: string;
  x: number;
  y: number;
  impact: string;
}

export const MAP_HOTSPOTS: MapHotspot[] = [
  {
    id: 'akyawkrom',
    name: 'Akyawkrom',
    area: 'Ejisu Municipal Assembly',
    tag: 'Foundation HQ & Agriculture',
    tagColor: 'bg-brand-green text-white',
    x: 218,
    y: 216,
    impact: 'Foundation headquarters, farmers’ cooperative empowerment, and youth workshops.',
  },
  {
    id: 'ejisu',
    name: 'Ejisu Town',
    area: 'Mansa Memorial Hospital',
    tag: 'Preventive Healthcare',
    tagColor: 'bg-brand-red text-white',
    x: 202,
    y: 195,
    impact: 'Annual free cervical cancer screenings and preventive health education.',
  },
  {
    id: 'kumasi',
    name: 'Kumasi Metro',
    area: 'Amakom, Asafo & WAEC',
    tag: 'Social Welfare',
    tagColor: 'bg-brand-navy text-white',
    x: 172,
    y: 208,
    impact: 'Annual "Joy to the Street" relief campaign reaching 800+ street children and vulnerable families.',
  },
  {
    id: 'forestry',
    name: 'Forestry Commission Centre',
    area: 'Akyawkrom Corridor',
    tag: 'Student Wellness',
    tagColor: 'bg-brand-gold text-brand-navy',
    x: 232,
    y: 178,
    impact: 'Free deworming medication and hygiene training for 84 Natural Resources students.',
  },
];

// Ashanti region interactive SVG map
export function AshantiMap({
  activeId = 'akyawkrom',
  onSelect,
}: {
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-md mx-auto select-none"
      aria-label="Interactive map highlighting Prince Asamany Foundation hotspots in the Ashanti Region"
      role="img"
    >
      <path
        d="M200 15 L295 38 L350 85 L358 148 L342 200 L320 245 L295 278 L255 305 L200 318 L145 305 L105 278 L80 245 L58 200 L42 148 L50 85 L105 38 Z"
        className="fill-brand-green stroke-brand-green"
        fillOpacity="0.10"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      <path
        d="M155 170 L195 162 L238 168 L258 190 L252 218 L228 235 L198 242 L168 238 L148 220 L145 198 Z"
        className="fill-brand-gold stroke-brand-gold"
        fillOpacity="0.3"
        strokeWidth="2"
        strokeOpacity="0.65"
      />
      <text
        x="166"
        y="178"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="10"
        className="fill-brand-gold"
        fontWeight="600"
        opacity="0.9"
      >
        Ashanti Region
      </text>

      {/* Interactive Hotspots */}
      {MAP_HOTSPOTS.map((spot) => {
        const isActive = activeId === spot.id;
        return (
          <g
            key={spot.id}
            onClick={() => onSelect?.(spot.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect?.(spot.id);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`${spot.name}: ${spot.tag}`}
            aria-pressed={isActive}
            className="cursor-pointer focus:outline-none group"
          >
            {/* Expanded touch area */}
            <circle cx={spot.x} cy={spot.y} r="18" fill="transparent" />

            {/* Pulsing ring for active or hovered node */}
            <circle
              className={
                isActive
                  ? 'pulse-ring stroke-brand-red'
                  : 'transition-opacity duration-300 stroke-brand-gold opacity-0 group-hover:opacity-75'
              }
              cx={spot.x}
              cy={spot.y}
              r={isActive ? '14' : '12'}
              strokeWidth="1.5"
              fill="none"
            />

            {/* Pin circle */}
            <circle
              cx={spot.x}
              cy={spot.y}
              r={isActive ? '8.5' : '6.5'}
              className={`transition-all duration-200 ${
                isActive ? 'fill-brand-red' : 'fill-brand-navy group-hover:fill-brand-red'
              }`}
            />
            <circle
              cx={spot.x}
              cy={spot.y}
              r={isActive ? '4' : '3'}
              className="fill-white transition-all duration-200"
            />

            {/* Node label */}
            <text
              x={spot.x}
              y={spot.y + (spot.y > 210 ? 18 : -12)}
              textAnchor="middle"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontSize={isActive ? '11' : '10'}
              fontWeight={isActive ? '700' : '600'}
              className={`transition-colors duration-200 pointer-events-none ${
                isActive
                  ? 'fill-brand-red font-bold'
                  : 'fill-brand-navy/80 group-hover:fill-brand-navy'
              }`}
            >
              {spot.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
