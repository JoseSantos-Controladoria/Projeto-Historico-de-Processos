import React, { useState } from 'react';
import { useInvestigation } from './hooks/useInvestigation';
import { SearchHero } from './components/SearchHero';
import { ProcessFilters } from './components/ProcessFilters';
import { DossierHeader } from './components/DossierHeader';
import { OccurrenceTimeline } from './components/OccurrenceTimeline';
import { PointHistory } from './components/PointHistory';
import { RiskAnalysis } from './components/RiskAnalysis';
import { ProcessList } from './components/ProcessList';
// Importamos a nova Sidebar
import { Sidebar } from '../../components/Sidebar';

// Tipagem movida para uso comum (idealmente estaria num arquivo types.ts compartilhado)
export type TabType = 'dossiers' | 'processes';

const Investigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dossiers');
  const { dossier, processes, loading, error, searchDossier, searchProcesses } = useInvestigation();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Sidebar Fixa */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 2. Área de Conteúdo Principal (com margem para a sidebar) */}
      <main className="ml-64 min-h-screen transition-all duration-300">
        
        {/* Header da Página (Contexto) */}
        <header className="bg-white border-b border-slate-200 px-8 py-6 mb-8 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-slate-800">
            {activeTab === 'dossiers' ? 'Dossiês de Colaboradores' : 'Gestão de Processos'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {activeTab === 'dossiers' 
              ? 'Consulte histórico, riscos e ocorrências.' 
              : 'Gerencie e acompanhe processos em andamento.'}
          </p>
        </header>

        {/* Conteúdo Dinâmico */}
        <div className="px-8 pb-12 max-w-7xl mx-auto space-y-8">
          {activeTab === 'dossiers' ? (
            <>
              <SearchHero onSearch={searchDossier} loading={loading} error={error} />

              {dossier && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                  <DossierHeader dossier={dossier} />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <OccurrenceTimeline occurrences={dossier.occurrences} />
                    <PointHistory history={dossier.pointHistory} />
                  </div>
                  <RiskAnalysis dossier={dossier} />
                </div>
              )}
            </>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <ProcessFilters onSearch={searchProcesses} loading={loading} error={error} />
              <ProcessList processes={processes} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Investigation;