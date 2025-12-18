import React, { useState } from 'react';
import { useInvestigation } from './hooks/useInvestigation';
import { SearchHero } from './components/SearchHero';
import { ProcessFilters } from './components/ProcessFilters';
import { DossierHeader } from './components/DossierHeader';
import { OccurrenceTimeline } from './components/OccurrenceTimeline';
import { PointHistory } from './components/PointHistory';
import { RiskAnalysis } from './components/RiskAnalysis';
import { ProcessList } from './components/ProcessList';
import { Users, FileText } from 'lucide-react';

type TabType = 'dossiers' | 'processes';

const Investigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dossiers');
  const { dossier, processes, loading, error, searchDossier, searchProcesses } = useInvestigation();

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navegação por abas */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-1">
          <div className="flex">
            <button
              onClick={() => setActiveTab('dossiers')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'dossiers'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Users className="w-5 h-5" />
              Dossiês de Colaboradores
            </button>
            <button
              onClick={() => setActiveTab('processes')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'processes'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-5 h-5" />
              Processos
            </button>
          </div>
        </div>

        {/* Conteúdo baseado na aba ativa */}
        {activeTab === 'dossiers' ? (
          <>
            <SearchHero onSearch={searchDossier} loading={loading} error={error} />

            {dossier && (
              <>
                <DossierHeader dossier={dossier} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <OccurrenceTimeline occurrences={dossier.occurrences} />
                  <PointHistory history={dossier.pointHistory} />
                </div>
                <RiskAnalysis dossier={dossier} />
              </>
            )}
          </>
        ) : (
          <>
            <ProcessFilters onSearch={searchProcesses} loading={loading} error={error} />
            <ProcessList processes={processes} />
          </>
        )}
      </div>
    </div>
  );
};

export default Investigation;