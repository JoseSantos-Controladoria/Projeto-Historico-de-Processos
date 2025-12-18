import { PointRecord } from "../types";
import { Clock } from "lucide-react";

export function PointHistory({ history }: { history: PointRecord[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-800">Jornada & Pontualidade</h3>
        </div>
        <span className="text-xs text-slate-400">Últimos meses</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium">
            <tr>
              <th className="px-4 py-3">Referência</th>
              <th className="px-4 py-3 text-center">Faltas</th>
              <th className="px-4 py-3 text-center">Atrasos</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {history.map((record, idx) => {
              const isCritical = record.status === "Crítico";
              const isAttention = record.status === "Atenção";
              
              return (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-700">{record.month}</td>
                  <td className="px-4 py-3 text-center">
                    {record.absences > 0 ? (
                      <span className="text-red-600 font-bold">{record.absences}</span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center text-slate-600">
                    {record.delaysMinutes > 0 ? `${record.delaysMinutes} min` : "-"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                      isCritical ? 'bg-red-100 text-red-700 border-red-200' :
                      isAttention ? 'bg-amber-100 text-amber-700 border-amber-200' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              );
            })}
            {history.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  Sem registros de ponto disponíveis.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}