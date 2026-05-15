import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  FileText,
  MoreVertical
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function PatientsPage() {
  const supabase = await createClient();
  
  const { data: patients, error } = await supabase
    .from('patients')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Erro ao buscar pacientes:', error);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Meus Pacientes</h2>
          <p className="text-slate-500">Gerencie os prontuários e históricos dos seus pacientes.</p>
        </div>
        <Link 
          href="/dashboard/pacientes/novo"
          className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-sky-600 transition-all shadow-lg shadow-sky-200 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Novo Paciente
        </Link>
      </div>

      {/* Filtros e Busca */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou diagnóstico..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all bg-white"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-all font-medium">
          <Filter className="h-4 w-4" />
          Filtros
        </button>
      </div>

      {/* Tabela de Pacientes */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Paciente</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nascimento</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Escola</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {patients?.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  Nenhum paciente cadastrado ainda.
                </td>
              </tr>
            ) : (
              patients?.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-xs">
                        {patient.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2)}
                      </div>
                      <span className="font-medium text-slate-900">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {patient.birth_date ? new Date(patient.birth_date).toLocaleDateString('pt-BR') : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{patient.school || '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 transition-opacity">
                      <Link 
                        href={`/dashboard/pacientes/${patient.id}/anamnese`}
                        className="p-2 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-all" 
                        title="Ver Anamnese"
                      >
                        <FileText className="h-4 w-4" />
                      </Link>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

