import { EmployeeDossier } from "../types";
import { ShieldAlert, AlertCircle, CheckCircle } from "lucide-react";

export function RiskAnalysis({ dossier }: { dossier: EmployeeDossier }) {
  const isSafe = dossier.riskLevel === "Baixo";
  const factors = dossier.riskFactors || [];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="p-4 border-b border-slate-100 flex items-center gap-2">
        <ShieldAlert className="w-5 h-5 text-slate-500" />
        <h3 className="font-bold text-slate-800">Matriz de Risco</h3>
      </div>
      
      <div className="p-6 flex-1 flex flex-col justify-center">
        {/* Indicador Visual Principal */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Classificação Atual</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            isSafe ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'
          }`}>
            {dossier.riskLevel.toUpperCase()}
          </span>
        </div>

        {/* Lista de Fatores */}
        <div className="space-y-3">
          {factors.length > 0 ? (
            factors.map((factor, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-red-800">Fator de Risco #{index + 1}</p>
                  <p className="text-sm text-red-700">{factor}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center text-center py-4 text-slate-400">
              <CheckCircle className="w-12 h-12 mb-2 text-emerald-500/50" />
              <p className="text-sm">Nenhum fator de risco comportamental identificado até o momento.</p>
            </div>
          )}
        </div>
        
        {!isSafe && (
          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              <span className="font-bold">Recomendação:</span> Monitoramento quinzenal e feedback formal com gestão imediata.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}