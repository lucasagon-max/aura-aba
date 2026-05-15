import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  Target, 
  BarChart3, 
  Settings, 
  LogOut,
  Brain
} from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/auth/actions";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Pacientes", href: "/dashboard/pacientes" },
    { icon: Clock, label: "Sessões ABA", href: "/dashboard/sessoes" },
    { icon: Target, label: "Metas PEI", href: "/dashboard/metas" },
    { icon: BarChart3, label: "Relatórios", href: "/dashboard/relatorios" },
    { icon: Settings, label: "Configurações", href: "/dashboard/config" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 z-50">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="bg-sky-500 p-1 rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Aura ABA</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-sky-50 hover:text-sky-600 transition-all group"
            >
              <item.icon className="h-5 w-5 text-slate-400 group-hover:text-sky-500 transition-colors" />
              {item.label}
            </Link>
          ))}
        </nav>

        <form className="p-4 border-t border-slate-100">
          <button 
            formAction={logout}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-rose-600 rounded-lg hover:bg-rose-50 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="pl-64 flex-1">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
          <h1 className="text-sm font-medium text-slate-500">Bem-vindo, <span className="text-slate-900 font-bold">Terapeuta João</span></h1>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 font-bold text-xs">
              JT
            </div>
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
