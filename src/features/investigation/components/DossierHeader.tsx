import { EmployeeDossier } from "../types";
import { User, Briefcase, Calendar, AlertTriangle, CheckCircle2, UserX } from "lucide-react";

interface DossierHeaderProps {
  dossier: EmployeeDossier;
}

export function DossierHeader({ dossier }: DossierHeaderProps) {
  const isHighRisk = dossier.riskLevel === "Alto" || dossier.riskLevel === "Crítico";
  const isTerminated = dossier.status === "Desligado";


  const badgeColor = isTerminated
    ? "bg-red-100 text-red-700 border-red-200"
    : "bg-emerald-100 text-emerald-700 border-emerald-200";

  return (
    <div className={`relative rounded-xl border-l-4 p-6 shadow-sm bg-white ${isTerminated ? 'border-l-red-600' : 'border-l-emerald-500'}`}>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        {/* Foto / Avatar */}
        <div className="relative shrink-0">
          <div className={`w-24 h-24 rounded-xl border-2 flex items-center justify-center overflow-hidden bg-slate-100 ${isTerminated ? 'border-red-200 grayscale' : 'border-slate-200'}`}>
            {dossier.photoUrl ? (
              <img src={dossier.photoUrl} alt={dossier.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-slate-400" />
            )}
          </div>
          {isTerminated && (
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold uppercase rounded shadow-sm tracking-wider whitespace-nowrap">
              Ex-Colaborador
            </span>
          )}
        </div>

        {/* Informações Principais */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                {dossier.name}
                <span className={`text-xs px-2 py-1 rounded-md border font-medium flex items-center gap-1.5 ${badgeColor}`}>
                  {isTerminated ? <UserX className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                  {dossier.status.toUpperCase()}
                </span>
              </h2>
              <div className="flex flex-wrap gap-4 mt-1 text-sm text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <span className="text-slate-400">CPF:</span> {dossier.cpf}
                </span>
                <span className="w-1 h-1 bg-slate-300 rounded-full self-center" />
                <span className="flex items-center gap-1">
                  <span className="text-slate-400">MAT:</span> {dossier.matricula}
                </span>
              </div>
            </div>

            {/* Badge de Risco */}
            <div className={`px-4 py-2 rounded-lg border flex items-center gap-3 ${isHighRisk ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Nível de Risco</p>
                <p className={`text-lg font-bold ${isHighRisk ? 'text-red-700' : 'text-slate-700'}`}>
                  {dossier.riskLevel}
                </p>
              </div>
              <div className={`p-2 rounded-full ${isHighRisk ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-500'}`}>
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Briefcase className="w-4 h-4 text-slate-400" />
              <span className="font-medium">{dossier.role}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <span className="text-slate-400 text-xs uppercase font-bold">Depto:</span>
              <span className="font-medium">{dossier.department}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500 text-xs">Admissão:</span>
              <span className="font-medium">{new Date(dossier.admissionDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}