import { InvestigationRepository } from '../repositories/InvestigationRepository';
import { ProcessDTO } from '../types/Investigation';

export class InvestigationService {
  private repo: InvestigationRepository;

  constructor() {
    this.repo = new InvestigationRepository();
  }

  async searchProcesses(term: string): Promise<ProcessDTO[]> {
    console.log(`Iniciando busca"${term}" ---`);

    const employees = await this.repo.findEmployeesByName(term);
    
    console.log(`Funcionários encontrados na MasterData: ${employees.length}`);
    employees.forEach(emp => {
        console.log(`Encontrado: ${emp.employee_name} | CPF: ${emp.personal_tax_id}`);
    });

    if (employees.length === 0) {
      console.log('Nenhum funcionário encontrado.');
      return [];
    }

    const taxIds = employees
      .map(e => e.personal_tax_id)
      .filter(cpf => cpf != null && cpf !== ''); 

    if (taxIds.length === 0) {
      console.log('Funcionários encontrados, mas sem CPF cadastrado.');
      return [];
    }

    console.log(`Buscando processos para ${taxIds.length} CPFs...`);
    
    const processIds = await this.repo.findProcessIdsByTaxIds(taxIds);

    console.log(`IDs de processos encontrados na Attributes: ${processIds.length}`);

    if (processIds.length === 0) {
      console.log('Nenhum processo vinculado a estes CPFs.');
      return [];
    }

    console.log(`Buscando detalhes dos ${processIds.length} processos...`);
    
    const rawSteps = await this.repo.findStepsByInstanceIds(processIds);

    console.log(`Detalhes recuperados: ${rawSteps.length} linhas.`);

    const results: ProcessDTO[] = rawSteps.map(step => ({
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

    return results;
  }
  
  async getProcessHistory(instanceId: number): Promise<ProcessDTO[]> {

    const rawSteps = await this.repo.findStepsByInstanceIds([instanceId]);

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