import React from 'react';
import { SearchHero } from './components/SearchHero';
import { ProcessList } from './components/ProcessList';
import { useInvestigation } from './hooks/useInvestigation';

// Mantemos o componente
const Investigation = () => {
  const { data, isLoading, error, searchProcesses } = useInvestigation();

  return (
    <div className="flex flex-col h-full p-6 space-y-6">
      
      {/* SearchHero limitado e centralizado */}
      <div className="w-full max-w-5xl mx-auto">
        <SearchHero onSearch={searchProcesses} />
      </div>

      {/* Lista de resultados */}
      <div className="w-full max-w-7xl mx-auto flex-1">
        {data.length > 0 && !isLoading && (
          <div className="mb-4 flex items-center justify-between px-2">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              Resultados da Busca
            </h2>
            <span className="bg-white border border-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              {data.length} encontrados
            </span>
          </div>
        )}

        <ProcessList 
          data={data} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
    </div>
  );
};

// ✅ A CORREÇÃO É ESTA LINHA AQUI:
// O App.tsx espera um "export default", então precisamos ter isso explicitamente.
export default Investigation;