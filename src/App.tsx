import { useState } from 'react';
import { Header } from './components/Header';
import { MapPanel } from './components/MapPanel';
import { DataPanel } from './components/DataPanel';
import { AnalysisPanel } from './components/AnalysisPanel';
import { StatusBar } from './components/StatusBar';
import { SamplePanel } from './components/SamplePanel';

export default function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'analysis' | 'samples'>('map');

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col lg:flex-row gap-3 p-3 overflow-hidden">
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          {activeTab === 'map' && <MapPanel />}
          {activeTab === 'analysis' && <AnalysisPanel />}
          {activeTab === 'samples' && <SamplePanel />}
        </div>
        
        <div className="lg:w-80 flex flex-col gap-3">
          <DataPanel />
        </div>
      </main>

      <StatusBar />
    </div>
  );
}
