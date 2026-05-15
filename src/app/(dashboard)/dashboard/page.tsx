import { 
  Users, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  Plus
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Pacientes Ativos", value: "12", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Sessões esta Semana", value: "28", icon: Calendar, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Metas Alcançadas", value: "85%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
    { label: "Pendências de Registro", value: "3", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  return (
    <div className="space-y-8">
      {/* Header com Ações Rápidas */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Visão Geral</h2>
          <p className="text-slate-500">Acompanhe o progresso da sua clínica em tempo real.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-sky-600 transition-all shadow-lg shadow-sky-200 active:scale-95">
          <Plus className="h-5 w-5" />
          Nova Sessão
        </button>
      </div>

      {/* Grid de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.bg} p-2 rounded-xl`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Área de Conteúdo (Exemplo de Atividades Recentes) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Atendimentos de Hoje</h3>
            <button className="text-sm text-sky-500 font-medium hover:underline">Ver agenda completa</button>
          </div>
          <div className="divide-y divide-slate-50">
            {[1, 2, 3].map((i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                    {i === 1 ? "PA" : i === 2 ? "LM" : "BC"}
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      {i === 1 ? "Pedro Alcantara" : i === 2 ? "Lucas Mendes" : "Beatriz Costa"}
                    </h4>
                    <p className="text-xs text-slate-500">Sessão ABA • 14:00 - 15:00</p>
                  </div>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Confirmado</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 mb-4">Metas Próximas da Maestria</h3>
          <div className="space-y-4">
            {[
              { label: "Contato Visual", progress: 85 },
              { label: "Sentar sob demanda", progress: 70 },
              { label: "Pedir Água", progress: 95 },
            ].map((goal) => (
              <div key={goal.label} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700">{goal.label}</span>
                  <span className="text-slate-500">{goal.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-sky-500 rounded-full" 
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
