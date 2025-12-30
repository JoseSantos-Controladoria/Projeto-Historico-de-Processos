// src/features/investigation/hooks/useInvestigation.ts
import { useState, useCallback } from 'react';
import { ProcessDTO } from '../types'; // Certifique-se que o DTO está atualizado no Front também

export const useInvestigation = () => {
  const [data, setData] = useState<ProcessDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return {
    data,
    isLoading,
    error,
    searchProcesses
  };
};