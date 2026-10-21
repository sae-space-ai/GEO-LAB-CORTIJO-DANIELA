import { useState } from 'react';
import { TrendingUp, BarChart2, PieChart, Activity } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

const soilComposition: ChartData[] = [
  { label: 'Arcilla', value: 28, color: '#92400e' },
  { label: 'Limo', value: 35, color: '#a16207' },
  { label: 'Arena', value: 22, color: '#ca8a04' },
  { label: 'Materia Org.', value: 15, color: '#65a30d' },
];

const elevationHistory = [
  { month: 'Ene', value: 412 },
  { month: 'Feb', value: 418 },
  { month: 'Mar', value: 425 },
  { month: 'Abr', value: 431 },
  { month: 'May', value: 428 },
  { month: 'Jun', value: 435 },
  { month: 'Jul', value: 442 },
  { month: 'Ago', value: 438 },
  { month: 'Sep', value: 445 },
  { month: 'Oct', value: 450 },
  { month: 'Nov', value: 447 },
  { month: 'Dic', value: 452 },
];

const landUseData = [
  { category: 'Olivar', percentage: 42, color: 'bg-green-600' },
  { category: 'Bosque', percentage: 25, color: 'bg-emerald-700' },
  { category: 'Pastos', percentage: 18, color: 'bg-yellow-600' },
  { category: 'Impermeable', percentage: 8, color: 'bg-gray-600' },
  { category: 'Agua', percentage: 7, color: 'bg-blue-500' },
];

type AnalysisTab = 'terrain' | 'soil' | 'landuse';

export function AnalysisPanel() {
  const [analysisTab, setAnalysisTab] = useState<AnalysisTab>('terrain');

  return (
    <div className="flex-1 bg-gray-900/60 rounded-xl border border-gray-800/60 overflow-hidden flex flex-col">
      {/* Analysis tabs */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-800/60 bg-gray-900/40">
        <Activity className="w-4 h-4 text-emerald-400 mr-2" />
        <button
          onClick={() => setAnalysisTab('terrain')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            analysisTab === 'terrain' ? 'bg-emerald-900/40 text-emerald-300' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 inline mr-1" />
          Terreno
        </button>
        <button
          onClick={() => setAnalysisTab('soil')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            analysisTab === 'soil' ? 'bg-emerald-900/40 text-emerald-300' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <PieChart className="w-3.5 h-3.5 inline mr-1" />
          Suelo
        </button>
        <button
          onClick={() => setAnalysisTab('landuse')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            analysisTab === 'landuse' ? 'bg-emerald-900/40 text-emerald-300' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5 inline mr-1" />
          Uso del Suelo
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        {analysisTab === 'terrain' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-200 mb-3">Evolución de Elevación Media</h4>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
                <svg viewBox="0 0 400 120" className="w-full h-32">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map(i => (
                    <line key={i} x1="30" y1={20 + i * 20} x2="390" y2={20 + i * 20} stroke="#374151" strokeWidth="0.5" strokeDasharray="2,4" />
                  ))}
                  {/* Y axis labels */}
                  {[460, 450, 440, 430, 420].map((val, i) => (
                    <text key={val} x="25" y={24 + i * 20} fill="#6b7280" fontSize="8" textAnchor="end">{val}m</text>
                  ))}
                  {/* Area fill */}
                  <path
                    d={`M 30 ${120 - ((elevationHistory[0].value - 410) / 50) * 100} ${elevationHistory.map((d, i) => `L ${30 + i * 33} ${120 - ((d.value - 410) / 50) * 100}`).join(' ')} L 390 120 L 30 120 Z`}
                    fill="url(#chartGrad)"
                  />
                  {/* Line */}
                  <path
                    d={`M ${elevationHistory.map((d, i) => `${30 + i * 33} ${120 - ((d.value - 410) / 50) * 100}`).join(' L ')}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  {/* Data points */}
                  {elevationHistory.map((d, i) => (
                    <circle
                      key={i}
                      cx={30 + i * 33}
                      cy={120 - ((d.value - 410) / 50) * 100}
                      r="3"
                      fill="#10b981"
                      stroke="#064e3b"
                      strokeWidth="1"
                    />
                  ))}
                  {/* X axis labels */}
                  {elevationHistory.filter((_, i) => i % 2 === 0).map((d, i) => (
                    <text key={d.month} x={30 + i * 66} y="118" fill="#6b7280" fontSize="7" textAnchor="middle">{d.month}</text>
                  ))}
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                <p className="text-xs text-gray-500">Elevación Máxima</p>
                <p className="text-xl font-bold text-emerald-300">567 m</p>
                <p className="text-xs text-gray-500 mt-1">Bosque Norte</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                <p className="text-xs text-gray-500">Elevación Mínima</p>
                <p className="text-xl font-bold text-blue-300">298 m</p>
                <p className="text-xs text-gray-500 mt-1">Arroyo Sur</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                <p className="text-xs text-gray-500">Pendiente Media</p>
                <p className="text-xl font-bold text-yellow-300">12.4°</p>
                <p className="text-xs text-gray-500 mt-1">Zona central</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                <p className="text-xs text-gray-500">Área Total</p>
                <p className="text-xl font-bold text-purple-300">24.7 ha</p>
                <p className="text-xs text-gray-500 mt-1">Finca completa</p>
              </div>
            </div>
          </div>
        )}

        {analysisTab === 'soil' && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-200 mb-3">Composición del Suelo</h4>
            
            {/* Donut chart */}
            <div className="flex items-center justify-center py-4">
              <svg viewBox="0 0 120 120" className="w-40 h-40">
                {soilComposition.reduce<{ elements: React.ReactNode[]; offset: number }>(
                  (acc, item, idx) => {
                    const circumference = 2 * Math.PI * 40;
                    const dashLength = (item.value / 100) * circumference;
                    const dashOffset = -(acc.offset / 100) * circumference;
                    acc.elements.push(
                      <circle
                        key={idx}
                        cx="60"
                        cy="60"
                        r="40"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="16"
                        strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                        strokeDashoffset={dashOffset}
                        transform="rotate(-90 60 60)"
                      />
                    );
                    acc.offset += item.value;
                    return acc;
                  },
                  { elements: [], offset: 0 }
                ).elements}
                <text x="60" y="56" textAnchor="middle" fill="#e5e7eb" fontSize="12" fontWeight="bold">Suelo</text>
                <text x="60" y="70" textAnchor="middle" fill="#9ca3af" fontSize="8">Franco</text>
              </svg>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2">
              {soilComposition.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded bg-gray-800/30">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <div>
                    <p className="text-xs text-gray-300">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-100">{item.value}%</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Soil properties */}
            <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
              <h5 className="text-xs font-semibold text-gray-300 mb-2">Propiedades Edafológicas</h5>
              <div className="space-y-2">
                {[
                  { label: 'pH', value: '7.2', range: 'Neutro' },
                  { label: 'Materia Orgánica', value: '3.8%', range: 'Moderado' },
                  { label: 'Conductividad', value: '0.42 dS/m', range: 'Bajo' },
                  { label: 'Capacidad Campo', value: '28%', range: 'Media' },
                ].map((prop, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{prop.label}</span>
                    <div className="text-right">
                      <span className="text-xs font-medium text-gray-200">{prop.value}</span>
                      <span className="text-xs text-gray-500 ml-2">({prop.range})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {analysisTab === 'landuse' && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-200 mb-3">Uso del Suelo — Cortijo de Daniela</h4>
            
            {/* Bar chart */}
            <div className="space-y-3">
              {landUseData.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-300">{item.category}</span>
                    <span className="text-xs font-semibold text-gray-200">{item.percentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                <p className="text-xs text-gray-500">NDVI Medio</p>
                <p className="text-xl font-bold text-green-300">0.62</p>
                <p className="text-xs text-gray-500 mt-1">Vegetación activa</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                <p className="text-xs text-gray-500">Cobertura Vegetal</p>
                <p className="text-xl font-bold text-emerald-300">67%</p>
                <p className="text-xs text-gray-500 mt-1">Área total</p>
              </div>
            </div>

            {/* Change detection */}
            <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
              <h5 className="text-xs font-semibold text-gray-300 mb-2">Detección de Cambios (último año)</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs text-gray-400">Expansión olivar: +1.2 ha</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="text-xs text-gray-400">Reducción pastos: -0.8 ha</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-xs text-gray-400">Nuevo punto de agua: +0.3 ha</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
