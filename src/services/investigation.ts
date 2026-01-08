// src/services/investigation.ts
import { PersonProfile } from '../features/investigation/types'; // Importe o tipo que criamos antes

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * ✨ NOVA FUNÇÃO: Busca de Pessoas
 * Bate na rota GET /investigation/people?q=termo
 */
export const searchPeopleRequest = async (term: string): Promise<PersonProfile[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/investigation/people?q=${term}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar pessoas: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na chamada searchPeopleRequest:', error);
    throw error;
  }
};

/**
 * Busca de Processos (já existente)
 */
export const searchProcessesRequest = async (term: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/investigation/search?q=${term}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar processos: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na chamada searchProcessesRequest:', error);
    throw error;
  }
};

/**
 * Busca de Histórico (já existente)
 */
export const getHistoryRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/investigation/history/${id}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar histórico: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na chamada getHistoryRequest:', error);
    throw error;
  }
};
