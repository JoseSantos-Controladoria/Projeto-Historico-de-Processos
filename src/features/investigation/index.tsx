// Adicione esses imports
import { PersonGrid } from './components/PersonGrid';
import { PersonProfile } from './types';
import { SearchHero } from './components/SearchHero';
import { ProcessList } from './components/ProcessList';
import { useInvestigation } from './hooks/useInvestigation';

// Mantemos o componente
const Investigation = () => {
  const { 
    data, 
    isLoading, 
    error, 
    searchProcesses,
    // ✨ NOVAS FUNÇÕES DO HOOK
    peopleResults, 
    isSearchingPeople, 
    handleSearchPeople, 
    clearPeopleSearch 
  } = useInvestigation();

  // ✨ 2. CRIE A FUNÇÃO DE CLIQUE NO CARD
  // Essa função define o comportamento: "Clicou no Fábio -> Busca pelo CPF dele"
  const handleSelectPerson = (person: PersonProfile) => {
    // Passo A: Preenche o campo de busca principal com o CPF da pessoa
    searchProcesses(person.cpf);

    // Passo B: Limpa a lista de "Pessoas" para o Grid sumir e mostrar a Timeline
    clearPeopleSearch();
  };

  return (
    <div className="flex flex-col h-full p-6 space-y-6">
      
      {/* SearchHero limitado e centralizado */}
      <div className="w-full max-w-5xl mx-auto">
        <SearchHero 
          onSearch={(term) => {
            // Busca de pessoas se o termo tiver menos de 3 caracteres ou mudar muito
            handleSearchPeople(term);
            // Se quiser também buscar processos em paralelo:
            // searchProcesses(term);
          }} 
        />
      </div>

      {/* --- GRID DE PESSOAS (Aparece durante/após busca de pessoas) --- */}
      {(isSearchingPeople || peopleResults.length > 0) && (
        <div className="w-full max-w-7xl mx-auto mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              Pessoas Encontradas
            </h2>
            {!isSearchingPeople && peopleResults.length > 0 && (
              <button 
                onClick={clearPeopleSearch}
                className="text-xs text-red-500 hover:text-red-700 underline"
              >
                Limpar resultados
              </button>
            )}
          </div>

          <PersonGrid 
            isLoading={isSearchingPeople}
            results={peopleResults} 
            onSelectPerson={handleSelectPerson} 
          />
          
          <div className="border-b my-6"></div>
        </div>
      )}

      {/* --- LISTA DE PROCESSOS (Escondida enquanto mostra pessoas) --- */}
      {peopleResults.length === 0 && (
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
      )}
    </div>
  );
};

// ✅ A CORREÇÃO É ESTA LINHA AQUI:
// O App.tsx espera um "export default", então precisamos ter isso explicitamente.
export default Investigation;