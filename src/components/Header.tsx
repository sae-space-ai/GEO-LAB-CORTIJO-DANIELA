import { Map, BarChart3, FlaskConical, Globe2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'map' | 'analysis' | 'samples';
  setActiveTab: (tab: 'map' | 'analysis' | 'samples') => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const tabs = [
    { id: 'map' as const, label: 'Mapa Territorial', icon: Map },
    { id: 'analysis' as const, label: 'Análisis Geo', icon: BarChart3 },
    { id: 'samples' as const, label: 'Muestras', icon: FlaskConical },
  ];

  return (
    <header className="bg-gray-900/80 border-b border-emerald-900/40 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-900/30">
            <Globe2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-emerald-100">
              GEO-LAB
            </h1>
            <p className="text-xs text-emerald-500/70 -mt-0.5">Cortijo de Daniela</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600/20 text-emerald-300 shadow-inner shadow-emerald-900/20 border border-emerald-700/40'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/30 border border-emerald-700/30">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">EN LÍNEA</span>
          </div>
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="md:hidden flex items-center gap-1 px-4 pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-700/40'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
