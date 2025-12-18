import { EmployeeDossier, Process } from "../types";

export const MOCK_DOSSIERS: EmployeeDossier[] = [

  {
    id: "1",
    name: "Carlos Eduardo Souza",
    cpf: "333.444.555-66",
    matricula: "MAT-9988",
    photoUrl: undefined, 
    role: "Vendedor Externo",
    department: "Comercial",
    manager: "Roberto Justus",
    status: "Desligado",
    admissionDate: "2023-01-10",
    terminationDate: "2024-02-15",
    email: "carlos.souza@exemplo.com",
    riskLevel: "Alto",
    riskFactors: ["Conflito com Gestão", "Baixa Performance", "Insubordinação"],
    lastUpdate: "2024-02-15T14:30:00Z",
    pointHistory: [
      { month: "Jan/2024", absences: 5, delaysMinutes: 120, overtimeMinutes: 0, status: "Crítico" },
      { month: "Dez/2023", absences: 2, delaysMinutes: 45, overtimeMinutes: 0, status: "Atenção" }
    ],
    occurrences: [
      {
        id: "occ-1",
        type: "Suspensão",
        date: "2024-02-01",
        description: "Suspensão de 3 dias por insubordinação direta ao gerente regional.",
        severity: "high",
        registeredBy: "RH Central"
      },
      {
        id: "occ-2",
        type: "Advertência",
        date: "2024-01-15",
        description: "Ausência não justificada em reunião de metas.",
        severity: "medium",
        registeredBy: "Roberto Justus"
      }
    ]
  },

  {
    id: "2",
    name: "Ana Beatriz Rocha",
    cpf: "111.222.333-44",
    matricula: "MAT-2024",
    photoUrl: undefined, 
    role: "Analista Financeiro Sr",
    department: "Controladoria",
    manager: "Amanda Silva",
    status: "Ativo",
    admissionDate: "2020-05-20",
    email: "ana.rocha@exemplo.com",
    riskLevel: "Baixo",
    riskFactors: [],
    lastUpdate: "2025-06-01T09:00:00Z",
    pointHistory: [
      { month: "Mai/2025", absences: 0, delaysMinutes: 0, overtimeMinutes: 120, status: "Normal" },
      { month: "Abr/2025", absences: 0, delaysMinutes: 5, overtimeMinutes: 60, status: "Normal" }
    ],
    occurrences: [] 
  },

  {
    id: "3",
    name: "Marcos Vinicius",
    cpf: "999.888.777-66",
    matricula: "MAT-3040",
    photoUrl: undefined,
    role: "Assistente de Logística",
    department: "Operações",
    manager: "Pedro Santos",
    status: "Ativo",
    admissionDate: "2024-11-01",
    email: "marcos.v@exemplo.com",
    riskLevel: "Médio",
    riskFactors: ["Absenteísmo Recorrente"],
    lastUpdate: "2025-06-10T08:15:00Z",
    pointHistory: [
      { month: "Mai/2025", absences: 3, delaysMinutes: 15, overtimeMinutes: 0, status: "Atenção" },
      { month: "Abr/2025", absences: 1, delaysMinutes: 30, overtimeMinutes: 0, status: "Normal" }
    ],
    occurrences: [
      {
        id: "occ-3",
        type: "Feedback",
        date: "2025-05-20",
        description: "Conversa de orientação sobre faltas injustificadas.",
        severity: "low",
        registeredBy: "Pedro Santos"
      }
    ]
  },
  {
    id: "4",
    name: "Juliana Mendes",
    cpf: "555.666.777-88",
    matricula: "MAT-4050",
    photoUrl: undefined,
    role: "Coordenadora de Marketing",
    department: "Marketing",
    manager: "Fernanda Lima",
    status: "Ativo",
    admissionDate: "2022-03-15",
    email: "juliana.mendes@workongroup.com.br",
    riskLevel: "Baixo",
    riskFactors: [],
    lastUpdate: "2025-05-30T10:45:00Z",
    pointHistory: [
      { month: "Mai/2025", absences: 0, delaysMinutes: 0, overtimeMinutes: 90, status: "Normal" },
      { month: "Abr/2025", absences: 0, delaysMinutes: 0, overtimeMinutes: 120, status: "Normal" }
    ],
    occurrences: []
   
  }
];

export const MOCK_PROCESSES: Process[] = [
  {
    id: 408162.0,
    requestname: "P1.077 - APs Colaboradores v. 3",
    setor: "P1",
    requester_setor: "Operação",
    requester_setor_id: 2780.0,
    requester_cargo: "Assistente Operações - TCL (Time Alyne)",
    requester_cargo_id: 1473.0,
    flow_name: "P1.077 - APs Colaboradores",
    task_instance_id: 2419793.0,
    task_id: 39484.0,
    task_name: "T07 - Liberar Pagamento (Contas à Pagar)",
    task_type: "taskapproval",
    task_result: "Aprovado",
    task_startdatetime: "2025-12-15 17:53:51",
    task_enddatetime: "2025-12-15 17:57:12",
    executor_userid: 2654.0,
    executor_name: "Maria Mustafa",
    executor_email: "maria.mustafa@workongroup.com.br",
    executor_username: "maria.mustafa",
    employee_id: "1",
    reportlink: "https://workongroup.zeev.it/2.0/audit?c=eaBKhIga%2FfDNREtMIWHjbs1lNjTe30tBPv4%2B5bizUUnfqrjTWfuS7BipUadc2CF7Olcj5KZ0VLCHcRWOD3Z2K%2BDzO0rCfqj9pCzzO9BFO6Y%3D"
  },
  {
    id: 408163.0,
    requestname: "P1.078 - Solicitação de Material",
    setor: "P1",
    requester_setor: "Compras",
    requester_setor_id: 2781.0,
    requester_cargo: "Analista de Compras",
    requester_cargo_id: 1474.0,
    flow_name: "P1.078 - Solicitação de Material",
    task_instance_id: 2419794.0,
    task_id: 39485.0,
    task_name: "T01 - Aprovar Solicitação",
    task_type: "taskapproval",
    task_result: "Pendente",
    task_startdatetime: "2025-12-16 09:00:00",
    task_enddatetime: null,
    executor_userid: 2655.0,
    executor_name: "João Silva",
    executor_email: "joao.silva@workongroup.com.br",
    executor_username: "joao.silva",
    employee_id: "3",
    reportlink: "https://workongroup.zeev.it/2.0/audit?c=eaBKhIga%2FfDNREtMIWHjbs1lNjTe30tBPv4%2B5bizUUnfqrjTWfuS7BipUadc2CF7Olcj5KZ0VLCHcRWOD3Z2K%2BDzO0rCfqj9pCzzO9BFO6Y%3D"
  },
  {
    id: 408164.0,
    requestname: "P2.001 - Processo Disciplinar",
    setor: "P2",
    requester_setor: "RH",
    requester_setor_id: 2782.0,
    requester_cargo: "Gerente de RH",
    requester_cargo_id: 1475.0,
    flow_name: "P2.001 - Processo Disciplinar",
    task_instance_id: 2419795.0,
    task_id: 39486.0,
    task_name: "T02 - Investigar Ocorrência",
    task_type: "taskmanual",
    task_result: "Em Andamento",
    task_startdatetime: "2025-12-14 14:30:00",
    task_enddatetime: null,
    executor_userid: 2656.0,
    executor_name: "Maria Oliveira",
    executor_email: "maria.oliveira@workongroup.com.br",
    executor_username: "maria.oliveira",
    employee_id: "1",
    reportlink: "https://workongroup.zeev.it/2.0/audit?c=eaBKhIga%2FfDNREtMIWHjbs1lNjTe30tBPv4%2B5bizUUnfqrjTWfuS7BipUadc2CF7Olcj5KZ0VLCHcRWOD3Z2K%2BDzO0rCfqj9pCzzO9BFO6Y%3D"
  
  },
  {
    id: 408165.0,
    requestname: "P3.002 - Avaliação de Desempenho",
    setor: "P3",
    requester_setor: "Controladoria",
    requester_setor_id: 2783.0,
    requester_cargo: "Gerente de Controladoria",
    requester_cargo_id: 1476.0,
    flow_name: "P3.002 - Avaliação de Desempenho",
    task_instance_id: 2419796.0,
    task_id: 39487.0,
    task_name: "T03 - Revisar Avaliação",
    task_type: "taskapproval",
    task_result: "Aprovado",
    task_startdatetime: "2025-12-10 10:15:00",
    task_enddatetime: "2025-12-10 11:30:00",
    executor_userid: 2657.0,
    executor_name: "Amanda Silva",
    executor_email: "amanda.silva@workongroup.com.br",
    executor_username: "amanda.silva",
    employee_id: "2",
    reportlink: "https://workongroup.zeev.it/2.0/audit?c=eaBKhIga%2FfDNREtMIWHjbs1lNjTe30tBPv4%2B5bizUUnfqrjTWfuS7BipUadc2CF7Olcj5KZ0VLCHcRWOD3Z2K%2BDzO0rCfqj9pCzzO9BFO6Y%3D"
  
  },
  {
    id: 408166.0,
    requestname: "P1.079 - Treinamento de Segurança",
    setor: "P1",
    requester_setor: "Operações",
    requester_setor_id: 2784.0,
    requester_cargo: "Coordenador de Operações",
    requester_cargo_id: 1477.0,
    flow_name: "P1.079 - Treinamento de Segurança",
    task_instance_id: 2419797.0,
    task_id: 39488.0,
    task_name: "T04 - Agendar Treinamento",
    task_type: "taskmanual",
    task_result: "Pendente",
    task_startdatetime: "2025-12-17 08:00:00",
    task_enddatetime: null,
    executor_userid: 2658.0,
    executor_name: "Pedro Santos",
    executor_email: "pedro.santos@workongroup.com.br",
    executor_username: "pedro.santos",
    employee_id: "3",
    reportlink: "https://workongroup.zeev.it/2.0/audit?c=eaBKhIga%2FfDNREtMIWHjbs1lNjTe30tBPv4%2B5bizUUnfqrjTWfuS7BipUadc2CF7Olcj5KZ0VLCHcRWOD3Z2K%2BDzO0rCfqj9pCzzO9BFO6Y%3D"
  
  },

  {
    id: 408167.0,
    requestname: "P4.003 - Revisão de Políticas Internas",
    setor: "P4",
    requester_setor: "Compliance",
    requester_setor_id: 2785.0,
    requester_cargo: "Analista de Compliance",
    requester_cargo_id: 1478.0,
    flow_name: "P4.003 - Revisão de Políticas Internas",
    task_instance_id: 2419798.0,
    task_id: 39489.0,
    task_name: "T05 - Atualizar Políticas",
    task_type: "taskmanual",
    task_result: "Em Andamento",
    task_startdatetime: "2025-12-12 13:00:00",
    task_enddatetime: null,
    executor_userid: 2659.0,
    executor_name: "Fernanda Lima",
    executor_email: "fernanda.lima@workongroup.com.br",
    executor_username: "fernanda.lima",
    employee_id: "4",
    reportlink: "https://workongroup.zeev.it/2.0/audit?c=eaBKhIga%2FfDNREtMIWHjbs1lNjTe30tBPv4%2B5bizUUnfqrjTWfuS7BipUadc2CF7Olcj5KZ0VLCHcRWOD3Z2K%2BDzO0rCfqj9pCzzO9BFO6Y%3D"
  }
];