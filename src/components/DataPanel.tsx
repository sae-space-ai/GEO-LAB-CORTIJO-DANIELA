import { Thermometer, Droplets, Wind, Mountain, Sun, CloudRain } from 'lucide-react';

interface DataItem {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

const weatherData: DataItem[] = [
  { label: 'Temperatura', value: '24.3', unit: '°C', icon: <Thermometer className="w-4 h-4" />, trend: 'up', color: 'text-orange-400' },
  { label: 'Humedad', value: '42', unit: '%', icon: <Droplets className="w-4 h-4" />, trend: 'down', color: 'text-blue-400' },
  { label: 'Viento', value: '12.5', unit: 'km/h', icon: <Wind className="w-4 h-4" />, trend: 'stable', color: 'text-cyan-400' },
  { label: 'Presión', value: '1013', unit: 'hPa', icon: <Mountain className="w-4 h-4" />, trend: 'up', color: 'text-purple-400' },
  { label: 'Radiación UV', value: '6.2', unit: 'idx', icon: <Sun className="w-4 h-4" />, trend: 'up', color: 'text-yellow-400' },
  { label: 'Precipitación', value: '0.0', unit: 'mm', icon: <CloudRain className="w-4 h-4" />, trend: 'stable', color: 'text-indigo-400' },
];

const trendIcons = {
  up: '↑',
  down: '↓',
  stable: '→',
};

export function DataPanel() {
  return (
    <div className="bg-gray-900/60 rounded-xl border border-gray-800/60 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-800/60 bg-gray-900/40">
        <h3 className="text-sm font-semibold text-gray-200">Datos Ambientales</h3>
        <p className="text-xs text-gray-500 mt-0.5">Estación meteorológica — Actualizado hace 2 min</p>
      </div>

      <div className="p-3 space-y-2">
        {weatherData.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2.5 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className={`${item.color} opacity-80`}>{item.icon}</div>
              <div>
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="text-sm font-semibold text-gray-100">
                  {item.value} <span className="text-xs text-gray-500 font-normal">{item.unit}</span>
                </p>
              </div>
            </div>
            <div className={`text-xs ${
              item.trend === 'up' ? 'text-emerald-400' : item.trend === 'down' ? 'text-red-400' : 'text-gray-500'
            }`}>
              {trendIcons[item.trend]}
            </div>
          </div>
        ))}
      </div>

      {/* Mini elevation chart */}
      <div className="px-4 pb-4">
        <div className="p-3 rounded-lg bg-gray-800/30 border border-gray-700/30">
          <h4 className="text-xs font-medium text-gray-400 mb-2">Perfil Elevación (Transecto N-S)</h4>
          <svg viewBox="0 0 200 50" className="w-full h-12">
            <defs>
              <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 40 Q 20 35 40 30 Q 60 20 80 15 Q 100 18 120 25 Q 140 30 160 22 Q 180 18 200 20"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
            />
            <path
              d="M 0 40 Q 20 35 40 30 Q 60 20 80 15 Q 100 18 120 25 Q 140 30 160 22 Q 180 18 200 20 L 200 50 L 0 50 Z"
              fill="url(#elevGrad)"
            />
          </svg>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>298m</span>
            <span>567m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
