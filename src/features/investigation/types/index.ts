// src/features/investigation/types/index.ts

// Esta é a interface principal que vem do Backend
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
    task_startdatetime: string; // Backend manda string!
    task_enddatetime: string;   // Backend manda string!
    executor_userid: number;
    executor_name: string;
    executor_email: string;
    executor_username: string;
    reportlink: string;
}

// ALIAS: Aqui está o segredo!
// Dizemos que 'Process' é a mesma coisa que 'ProcessDTO'.
// Isso conserta o erro de importação sem quebrar o resto do seu código.
export type Process = ProcessDTO;