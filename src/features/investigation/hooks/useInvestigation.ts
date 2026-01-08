// src/features/investigation/hooks/useInvestigation.ts
import { useState, useCallback } from 'react';
import { ProcessDTO, PersonProfile } from '../types'; // Certifique-se que o DTO está atualizado no Front também
import { searchPeopleRequest } from '../../../services/investigation'; // Importe a função do passo 2.1

export const useInvestigation = () => {
  const [data, setData] = useState<ProcessDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✨ NOVO ESTADO: Lista de pessoas encontradas
  const [peopleResults, setPeopleResults] = useState<PersonProfile[]>([]);
  
  // ✨ NOVO ESTADO: Loading específico da busca de pessoas (opcional, mas recomendado)
  const [isSearchingPeople, setIsSearchingPeople] = useState(false);

  // Função para buscar os dados
  const searchProcesses = useCallback(async (term: string) => {
    // Se o termo for vazio, limpa a lista e não busca
    if (!term.trim()) {
      setData([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // URL do Backend que acabamos de criar
      // DICA DE STAFF: Em produção, isso viria de uma variável de ambiente (import.meta.env.VITE_API_URL)
      const response = await fetch(`http://localhost:3000/api/investigation/search?q=${term}`);

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
      
    } catch (err) {
      console.error('Erro ao buscar processos:', err);
      setError('Não foi possível carregar os dados. Verifique a conexão com o servidor.');
      setData([]); // Limpa dados antigos em caso de erro
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✨ NOVA FUNÇÃO: Dispara a busca de pessoas
  const handleSearchPeople = useCallback(async (term: string) => {
    if (!term || term.length < 3) {
        setPeopleResults([]); // Limpa se digitar pouco
        return;
    }

    setIsSearchingPeople(true);
    try {
      const results = await searchPeopleRequest(term);
      setPeopleResults(results);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
      setPeopleResults([]);
    } finally {
      setIsSearchingPeople(false);
    }
  }, []);

  // ✨ NOVA FUNÇÃO: Limpar a busca (útil quando clicar no "X" ou trocar de tela)
  const clearPeopleSearch = useCallback(() => {
    setPeopleResults([]);
  }, []);

  return {
    data,
    isLoading,
    error,
    searchProcesses,
    peopleResults,      // Exporta a lista
    isSearchingPeople,  // Exporta o loading
    handleSearchPeople, // Exporta a função
    clearPeopleSearch   // Exporta a limpeza
  };
};