import { useState } from 'react';
import { FlaskConical, TestTube, Beaker, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface Sample {
  id: string;
  name: string;
  type: 'soil' | 'water' | 'vegetation';
  location: string;
  date: string;
  status: 'pending' | 'processing' | 'complete';
  results?: {
    ph?: number;
    moisture?: number;
    organicMatter?: number;
    nutrients?: string;
  };
}

const samples: Sample[] = [
  {
    id: 'M-001',
    name: 'Suelo Olivar Norte',
    type: 'soil',
    location: 'Parcela A-3',
    date: '2024-12-15',
    status: 'complete',
    results: { ph: 7.1, moisture: 18.5, organicMatter: 3.2, nutrients: 'N:Medio P:Alto K:Medio' },
  },
  {
    id: 'M-002',
    name: 'Agua Arroyo Sur',
    type: 'water',
    location: 'Punto muestreo W-2',
    date: '2024-12-18',
    status: 'complete',
    results: { ph: 7.4, moisture: 100, nutrients: 'N:Bajo P:Bajo K:Bajo' },
  },
  {
    id: 'M-003',
    name: 'Suelo Encinar',
    type: 'soil',
    location: 'Parcela B-1',
    date: '2024-12-20',
    status: 'processing',
    results: { ph: 6.8, moisture: 22.1, organicMatter: 4.5 },
  },
  {
    id: 'M-004',
    name: 'Vegetación Ribera',
    type: 'vegetation',
    location: 'Zona riparia',
    date: '2024-12-22',
    status: 'pending',
  },
  {
    id: 'M-005',
    name: 'Suelo Loma Sur',
    type: 'soil',
    location: 'Parcela C-2',
    date: '2024-12-23',
    status: 'pending',
  },
  {
    id: 'M-006',
    name: 'Agua Sondeo Principal',
    type: 'water',
    location: 'Sondeo S-1',
    date: '2024-12-24',
    status: 'processing',
    results: { ph: 7.0 },
  },
];

const typeIcons = {
  soil: <Beaker className="w-4 h-4" />,
  water: <TestTube className="w-4 h-4" />,
  vegetation: <FlaskConical className="w-4 h-4" />,
};

const typeColors = {
  soil: 'text-amber-400 bg-amber-900/30',
  water: 'text-blue-400 bg-blue-900/30',
  vegetation: 'text-green-400 bg-green-900/30',
};

const statusConfig = {
  pending: { icon: Clock, color: 'text-yellow-400', label: 'Pendiente' },
  processing: { icon: AlertCircle, color: 'text-blue-400', label: 'Procesando' },
  complete: { icon: CheckCircle2, color: 'text-emerald-400', label: 'Completo' },
};

export function SamplePanel() {
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
  const [filter, setFilter] = useState<'all' | 'soil' | 'water' | 'vegetation'>('all');

  const filteredSamples = filter === 'all' ? samples : samples.filter(s => s.type === filter);

  return (
    <div className="flex-1 bg-gray-900/60 rounded-xl border border-gray-800/60 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800/60 bg-gray-900/40">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-gray-200">Banco de Muestras</span>
          <span className="text-xs text-gray-500 ml-2">{samples.length} muestras registradas</span>
        </div>
        <div className="flex items-center gap-1">
          {(['all', 'soil', 'water', 'vegetation'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                filter === f ? 'bg-emerald-900/40 text-emerald-300' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {f === 'all' ? 'Todas' : f === 'soil' ? 'Suelo' : f === 'water' ? 'Agua' : 'Vegetación'}
            </button>
          ))}
        </div>
      </div>

      {/* Samples list */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-3 md:grid-cols-2">
          {filteredSamples.map((sample) => {
            const StatusIcon = statusConfig[sample.status].icon;
            return (
              <button
                key={sample.id}
                onClick={() => setSelectedSample(sample)}
                className={`text-left p-4 rounded-lg border transition-all ${
                  selectedSample?.id === sample.id
                    ? 'bg-emerald-900/20 border-emerald-700/50 shadow-lg shadow-emerald-900/10'
                    : 'bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/50 hover:border-gray-600/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded ${typeColors[sample.type]}`}>
                      {typeIcons[sample.type]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200">{sample.name}</p>
                      <p className="text-xs text-gray-500">{sample.id} • {sample.location}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${statusConfig[sample.status].color}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    <span className="text-xs">{statusConfig[sample.status].label}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-700/30">
                  <span className="text-xs text-gray-500">{sample.date}</span>
                  {sample.results && (
                    <span className="text-xs text-gray-400">
                      {sample.results.ph !== undefined && `pH: ${sample.results.ph}`}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected sample details */}
        {selectedSample && selectedSample.results && (
          <div className="mt-4 p-4 rounded-lg bg-gray-800/40 border border-emerald-700/30">
            <h4 className="text-sm font-semibold text-emerald-300 mb-3">
              Resultados: {selectedSample.name}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {selectedSample.results.ph !== undefined && (
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">pH</p>
                  <p className="text-lg font-bold text-gray-100">{selectedSample.results.ph}</p>
                  <div className="mt-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-full"
                      style={{ width: `${(selectedSample.results.ph / 14) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              {selectedSample.results.moisture !== undefined && (
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Humedad</p>
                  <p className="text-lg font-bold text-blue-300">{selectedSample.results.moisture}%</p>
                  <div className="mt-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${Math.min(selectedSample.results.moisture, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {selectedSample.results.organicMatter !== undefined && (
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Mat. Orgánica</p>
                  <p className="text-lg font-bold text-amber-300">{selectedSample.results.organicMatter}%</p>
                  <div className="mt-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${(selectedSample.results.organicMatter / 10) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              {selectedSample.results.nutrients && (
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Nutrientes</p>
                  <p className="text-xs font-medium text-gray-200 mt-1">{selectedSample.results.nutrients}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
