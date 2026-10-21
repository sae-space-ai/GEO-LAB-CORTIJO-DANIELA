import { Wifi, Database, Cpu, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gray-900/80 border-t border-gray-800/60 px-4 py-2">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span>Conectado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Database className="w-3 h-3 text-blue-400" />
            <span>3 bases de datos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-purple-400" />
            <span>CPU: 23%</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-600">GEO-LAB v2.4.1</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span>{time.toLocaleTimeString('es-ES')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
