import { InvestigationRepository } from '../repositories/InvestigationRepository';
import { ProcessDTO } from '../types/Investigation';

export class InvestigationService {
  private repo: InvestigationRepository;

  constructor() {
    this.repo = new InvestigationRepository();
  }

  async searchProcesses(term: string): Promise<ProcessDTO[]> {
    console.log(`🔍 --- INICIANDO BUSCA POR: "${term}" ---`);

    // ---------------------------------------------------------
    // ETAPA 1: Buscar Funcionários (Master Data)
    // ---------------------------------------------------------
    // O termo pode ser Nome ou CPF, o repositório cuida disso
    const employees = await this.repo.findEmployeesByName(term);
    
    console.log(`👤 Etapa 1 - Funcionários encontrados na MasterData: ${employees.length}`);
    employees.forEach(emp => {
        console.log(`   -> Encontrado: ${emp.employee_name} | CPF: ${emp.personal_tax_id}`);
    });

    if (employees.length === 0) {
      console.log('❌ Parando busca: Nenhum funcionário encontrado.');
      return [];
    }

    // Extraímos apenas os CPFs válidos da lista de funcionários encontrados
    const taxIds = employees
      .map(e => e.personal_tax_id)
      .filter(cpf => cpf != null && cpf !== ''); // Remove nulos e vazios

    if (taxIds.length === 0) {
      console.log('❌ Parando busca: Funcionários encontrados, mas sem CPF cadastrado.');
      return [];
    }

    // ---------------------------------------------------------
    // ETAPA 2: Buscar IDs dos Processos (Attributes)
    // ---------------------------------------------------------
    console.log(`🔍 Etapa 2 - Buscando processos para ${taxIds.length} CPFs...`);
    
    // AQUI ESTAVA O ERRO: Agora passamos o array inteiro de uma vez!
    const processIds = await this.repo.findProcessIdsByTaxIds(taxIds);

    console.log(`📄 Etapa 2 - IDs de processos encontrados na Attributes: ${processIds.length}`);

    if (processIds.length === 0) {
      console.log('❌ Parando busca: Nenhum processo vinculado a estes CPFs.');
      return [];
    }

    // ---------------------------------------------------------
    // ETAPA 3: Buscar Detalhes dos Passos (Steps)
    // ---------------------------------------------------------
    console.log(`📋 Etapa 3 - Buscando detalhes dos ${processIds.length} processos...`);
    
    const rawSteps = await this.repo.findStepsByInstanceIds(processIds);

    console.log(`✅ Etapa 3 - Detalhes recuperados: ${rawSteps.length} linhas.`);

    // ---------------------------------------------------------
    // ETAPA 4: Mapeamento para DTO (Frontend)
    // ---------------------------------------------------------
    const results: ProcessDTO[] = rawSteps.map(step => ({
      id: step.instance_id, // Usamos o ID mapeado
      requestname: step.requestname,
      setor: step.department_id?.toString() || 'N/A', // Ajuste caso department_id seja número
      requester_setor: step.requester_setor,
      requester_setor_id: step.requester_setor_id,
      requester_cargo: step.requester_cargo,
      requester_cargo_id: step.requester_cargo_id,
      flow_name: step.flow_name,
      task_instance_id: step.task_instance_id,
      task_id: step.task_id,
      task_name: step.task_name,
      task_type: step.task_type,
      task_result: step.task_result,
      // Convertendo datas para string ISO
      task_startdatetime: step.task_startdatetime ? new Date(step.task_startdatetime).toISOString() : '',
      task_enddatetime: step.task_enddatetime ? new Date(step.task_enddatetime).toISOString() : '',
      executor_userid: step.executor_userid,
      executor_name: step.executor_name,
      executor_email: step.executor_email,
      executor_username: step.executor_username,
      reportlink: step.reportlink
    }));

    return results;
  }
  
  // Adicione este método na classe InvestigationService
  async getProcessHistory(instanceId: number): Promise<ProcessDTO[]> {
    // Reutilizamos a query que já existe no repositório
    const rawSteps = await this.repo.findStepsByInstanceIds([instanceId]);

    // Mapeamos para o formato bonito (DTO)
    return rawSteps.map(step => ({
      id: step.instance_id,
      requestname: step.requestname,
      setor: step.department_id?.toString() || 'N/A',
      requester_setor: step.requester_setor,
      requester_setor_id: step.requester_setor_id,
      requester_cargo: step.requester_cargo,
      requester_cargo_id: step.requester_cargo_id,
      flow_name: step.flow_name,
      task_instance_id: step.task_instance_id,
      task_id: step.task_id,
      task_name: step.task_name,
      task_type: step.task_type,
      task_result: step.task_result,
      task_startdatetime: step.task_startdatetime ? new Date(step.task_startdatetime).toISOString() : '',
      task_enddatetime: step.task_enddatetime ? new Date(step.task_enddatetime).toISOString() : '',
      executor_userid: step.executor_userid,
      executor_name: step.executor_name,
      executor_email: step.executor_email,
      executor_username: step.executor_username,
      reportlink: step.reportlink
    }));
  }
}