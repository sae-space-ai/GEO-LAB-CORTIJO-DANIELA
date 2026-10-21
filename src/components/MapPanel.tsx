import { useState } from 'react';
import { MapPin, ZoomIn, ZoomOut, Layers, Crosshair } from 'lucide-react';

interface TerrainPoint {
  x: number;
  y: number;
  elevation: number;
  label: string;
  type: 'water' | 'forest' | 'field' | 'building' | 'path';
}

const terrainPoints: TerrainPoint[] = [
  { x: 15, y: 25, elevation: 342, label: 'Río Genil', type: 'water' },
  { x: 35, y: 18, elevation: 567, label: 'Bosque Norte', type: 'forest' },
  { x: 55, y: 42, elevation: 423, label: 'Cortijo Principal', type: 'building' },
  { x: 72, y: 30, elevation: 389, label: 'Olivar Este', type: 'field' },
  { x: 45, y: 65, elevation: 298, label: 'Arroyo Sur', type: 'water' },
  { x: 25, y: 55, elevation: 512, label: 'Encinar', type: 'forest' },
  { x: 80, y: 60, elevation: 445, label: 'Loma del Sur', type: 'field' },
  { x: 60, y: 75, elevation: 356, label: 'Camino Viejo', type: 'path' },
  { x: 40, y: 35, elevation: 478, label: 'Punto Geodésico', type: 'building' },
  { x: 88, y: 45, elevation: 501, label: 'Sierra Este', type: 'forest' },
];

const typeColors: Record<string, string> = {
  water: 'bg-blue-400',
  forest: 'bg-green-500',
  field: 'bg-yellow-500',
  building: 'bg-red-400',
  path: 'bg-orange-400',
};

const typeLabels: Record<string, string> = {
  water: 'Hidrografía',
  forest: 'Vegetación',
  field: 'Cultivos',
  building: 'Edificaciones',
  path: 'Caminos',
};

export function MapPanel() {
  const [zoom, setZoom] = useState(1);
  const [selectedPoint, setSelectedPoint] = useState<TerrainPoint | null>(null);
  const [showLayers, setShowLayers] = useState(true);

  return (
    <div className="flex-1 bg-gray-900/60 rounded-xl border border-gray-800/60 overflow-hidden flex flex-col">
      {/* Map toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800/60 bg-gray-900/40">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-gray-300">Mapa Topográfico</span>
          <span className="text-xs text-gray-500 ml-2">37.17°N, 3.59°W</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
            className="p-1.5 rounded hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-500 w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom(Math.min(2, zoom + 0.25))}
            className="p-1.5 rounded hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowLayers(!showLayers)}
            className={`p-1.5 rounded transition-colors ${showLayers ? 'bg-emerald-900/40 text-emerald-400' : 'hover:bg-gray-800 text-gray-400'}`}
          >
            <Layers className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition-colors">
            <Crosshair className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Terrain background with contour lines */}
        <div 
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* SVG Terrain Map */}
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="terrainGrad" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#1a3a2a" />
                <stop offset="40%" stopColor="#1a2e1a" />
                <stop offset="70%" stopColor="#1e2a1e" />
                <stop offset="100%" stopColor="#0f1a0f" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Base terrain */}
            <rect width="100" height="100" fill="url(#terrainGrad)" />
            
            {/* Contour lines */}
            {[20, 30, 40, 50, 60, 70, 80].map((r) => (
              <ellipse
                key={r}
                cx="50"
                cy="45"
                rx={r * 0.6}
                ry={r * 0.5}
                fill="none"
                stroke="#2a5a3a"
                strokeWidth="0.15"
                opacity="0.5"
              />
            ))}
            
            {/* Water features */}
            <path
              d="M 10 25 Q 20 28 30 24 Q 40 20 45 25 Q 50 30 45 35 Q 40 45 35 55 Q 30 65 40 70"
              fill="none"
              stroke="#2563eb"
              strokeWidth="0.6"
              opacity="0.6"
            />
            <path
              d="M 45 60 Q 50 65 55 62 Q 60 58 65 63 Q 70 68 75 65"
              fill="none"
              stroke="#2563eb"
              strokeWidth="0.4"
              opacity="0.5"
            />
            
            {/* Forest areas */}
            <ellipse cx="35" cy="18" rx="12" ry="8" fill="#166534" opacity="0.3" />
            <ellipse cx="25" cy="55" rx="10" ry="7" fill="#166534" opacity="0.25" />
            <ellipse cx="85" cy="45" rx="8" ry="10" fill="#166534" opacity="0.3" />
            
            {/* Field areas */}
            <rect x="65" y="22" width="18" height="14" fill="#854d0e" opacity="0.15" rx="2" />
            <rect x="73" y="52" width="15" height="12" fill="#854d0e" opacity="0.12" rx="2" />
            
            {/* Grid overlay */}
            {Array.from({ length: 10 }, (_, i) => (
              <g key={`grid-${i}`}>
                <line x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="#374151" strokeWidth="0.1" opacity="0.3" />
                <line x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="#374151" strokeWidth="0.1" opacity="0.3" />
              </g>
            ))}
          </svg>

          {/* Terrain points */}
          {terrainPoints.map((point, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPoint(point)}
              className={`absolute w-4 h-4 rounded-full ${typeColors[point.type]} opacity-80 hover:opacity-100 hover:scale-150 transition-all duration-200 cursor-pointer border-2 border-white/20 shadow-lg`}
              style={{ left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%, -50%)' }}
              title={point.label}
            >
              {selectedPoint === point && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-gray-700">
                  {point.label}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Layer legend */}
        {showLayers && (
          <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700/50 p-3">
            <h4 className="text-xs font-semibold text-gray-300 mb-2">Capas</h4>
            <div className="space-y-1.5">
              {Object.entries(typeLabels).map(([type, label]) => (
                <div key={type} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${typeColors[type]}`} />
                  <span className="text-xs text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected point info */}
        {selectedPoint && (
          <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm rounded-lg border border-emerald-700/40 p-4 min-w-48">
            <h4 className="text-sm font-semibold text-emerald-300 mb-2">{selectedPoint.label}</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Elevación:</span>
                <span className="text-gray-200">{selectedPoint.elevation} m</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Tipo:</span>
                <span className="text-gray-200">{typeLabels[selectedPoint.type]}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Coordenadas:</span>
                <span className="text-gray-200">{(37.17 + (selectedPoint.y - 50) * 0.001).toFixed(4)}°N</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
