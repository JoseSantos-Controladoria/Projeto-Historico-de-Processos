export type EmployeeStatus = "Ativo" | "Desligado" | "Afastado" | "Férias";
export type RiskLevel = "Baixo" | "Médio" | "Alto" | "Crítico";
export type OccurrenceType = "Advertência" | "Suspensão" | "Feedback" | "Comportamental" | "Investigação";

export type ProcessType = "Disciplinar" | "Administrativo" | "Recrutamento" | "Demissional" | "Avaliação";
export type ProcessStatus = "Aberto" | "Em Andamento" | "Concluído" | "Cancelado";

export interface Occurrence {
  id: string;
  type: OccurrenceType;
  date: string;
  description: string;
  severity: "low" | "medium" | "high";
  registeredBy: string;
}

export interface PointRecord {
  month: string; 
  absences: number;
  delaysMinutes: number;
  overtimeMinutes: number;
  status: "Normal" | "Atenção" | "Crítico";
}

export interface SensitiveData {
  salary: number;
  bankInfo: string;
  address: string;
}

export interface Process {
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
  task_startdatetime: string;
  task_enddatetime: string | null;
  executor_userid: number;
  executor_name: string;
  executor_email: string;
  executor_username: string;
  employee_id?: string;
  reportlink?: string;
}

export interface EmployeeDossier {
  id: string;
  name: string;
  cpf: string;
  matricula: string;
  photoUrl?: string;
  role: string;
  department: string;
  manager: string;
  status: EmployeeStatus;
  admissionDate: string;
  terminationDate?: string;
  email: string;
  riskLevel: RiskLevel;
  riskFactors: string[];
  pointHistory: PointRecord[];
  occurrences: Occurrence[];
  lastUpdate: string;
}