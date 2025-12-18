import { Occurrence } from "../types";
import { AlertOctagon, Info, FileWarning, CheckCircle } from "lucide-react";

export function OccurrenceTimeline({ occurrences }: { occurrences: Occurrence[] }) {

  const getIcon = (type: string) => {
    if (type === "Suspensão") return <AlertOctagon className="w-5 h-5 text-white" />;
    if (type === "Advertência") return <FileWarning className="w-5 h-5 text-white" />;
    return <Info className="w-5 h-5 text-white" />;
  };

 
  const getBgColor = (severity: string) => {
    if (severity === "high") return "bg-red-500 shadow-red-200";
    if (severity === "medium") return "bg-amber-500 shadow-amber-200";
    return "bg-blue-500 shadow-blue-200";
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full">
      <div className="p-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-800">Histórico Disciplinar</h3>
      </div>

      <div className="p-6">
        {occurrences.length > 0 ? (
          <div className="relative border-l-2 border-slate-100 ml-3 space-y-8 pb-2">
            {occurrences.map((occ) => (
              <div key={occ.id} className="ml-8 relative group">
                {/* Ícone na Linha do Tempo */}
                <div className={`absolute -left-[43px] top-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white ${getBgColor(occ.severity)}`}>
                  {getIcon(occ.type)}
                </div>

                {/* Conteúdo do Card */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                      occ.severity === 'high' ? 'text-red-600 bg-red-100' : 
                      occ.severity === 'medium' ? 'text-amber-600 bg-amber-100' : 
                      'text-blue-600 bg-blue-100'
                    }`}>
                      {occ.type}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {new Date(occ.date).toLocaleDateString()} • Reg: {occ.registeredBy}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {occ.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[200px]">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
              <CheckCircle className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-sm">Histórico disciplinar limpo.</p>
          </div>
        )}
      </div>
    </div>
  );
}