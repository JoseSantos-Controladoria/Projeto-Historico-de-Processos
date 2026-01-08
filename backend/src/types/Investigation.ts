export interface ProcessDTO {
    id: number;                 
    requestname: string;
    setor: string;              
    requester_setor: string;
    requester_setor_id: number;
    requester_cargo: string;
    requester_cargo_id: number;
    flow_name: string;
    task_instance_id: number;
    task_id: number;
    task_name: string;
    task_type: string;
    task_result: string;
    task_startdatetime: string | Date; 
    task_enddatetime: string | Date;
    executor_userid: number;
    executor_name: string;
    executor_email: string;
    executor_username: string;
    reportlink: string;
}

export interface EmployeeEntity {
    employee_name: string;
    external_id: number;
    personal_tax_id: string; 
}

export interface AttributeEntity {
    instanceid: number;
    name_filed: string;
    value_field: string;
}


export interface ProcessStepEntity {
    id: number;
    instance_id: number;
    requestname: string;
    department_id: string;
    requester_setor: string;
    requester_setor_id: number;
    requester_cargo: string;
    requester_cargo_id: number;
    flow_name: string;
    task_instance_id: number;
    task_id: number;
    task_name: string;
    task_type: string;
    task_result: string;
    task_startdatetime: Date;
    task_enddatetime: Date;
    executor_userid: number;
    executor_name: string;
    executor_email: string;
    executor_username: string;
    reportlink: string;
}

export interface InvestigationFilters {
  startDate?: string;
  endDate?: string;
  status?: string;
  flowName?: string;
}


export interface PersonProfile {
  name: string;
  cpf: string; 
  sector: string;
  role: string;
  totalProcesses: number; 
}