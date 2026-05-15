import { Brain, Heart, ShieldCheck, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header / Navbar */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center justify-center gap-2">
          <div className="bg-sky-500 p-1.5 rounded-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Aura<span className="text-sky-500">ABA</span>
          </span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <a className="text-sm font-medium hover:text-sky-500 transition-colors" href="#">
            Funcionalidades
          </a>
          <a className="text-sm font-medium hover:text-sky-500 transition-colors" href="#">
            Preços
          </a>
          <button className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-sky-200 hover:bg-sky-600 transition-all active:scale-95">
            Entrar no Sistema
          </button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-sky-50/50 to-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
                    SaaS de Gestão Clínica Profissional
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-slate-900">
                    Otimize seus atendimentos de <span className="text-sky-500">ABA e Psicopedagogia</span>
                  </h1>
                  <p className="max-w-[600px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    A plataforma completa para gerenciar sessões, registros ABC, metas PEI e prontuários diários em um só lugar.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-3 text-base font-medium text-white shadow-xl shadow-sky-200 hover:bg-sky-600 transition-all active:scale-95">
                    Começar Agora Grátis
                  </button>
                  <button className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3 text-base font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
                    Ver Demonstração
                  </button>
                </div>
              </div>
              <div className="mx-auto flex w-full items-center justify-center lg:order-last">
                <div className="relative w-full max-w-[500px] aspect-square bg-sky-100 rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-8 border-white">
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Activity className="h-48 w-48 text-sky-500/20" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Heart className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">Evolução do Paciente</div>
                        <div className="text-xs text-slate-500">+12% de progresso este mês</div>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[75%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tudo que sua clínica precisa</h2>
                <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Desenvolvido por especialistas para garantir a melhor experiência terapêutica e administrativa.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center p-6 rounded-2xl hover:bg-sky-50 transition-colors">
                <div className="bg-sky-100 p-3 rounded-xl">
                  <ShieldCheck className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold">Segurança LGPD</h3>
                <p className="text-sm text-slate-500">Dados sensíveis criptografados e controle total de privacidade para seus pacientes.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center p-6 rounded-2xl hover:bg-sky-50 transition-colors">
                <div className="bg-sky-100 p-3 rounded-xl">
                  <Activity className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold">Registro ABC e DTT</h3>
                <p className="text-sm text-slate-500">Coleta de dados em tempo real durante as sessões com gráficos automáticos.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center p-6 rounded-2xl hover:bg-sky-50 transition-colors">
                <div className="bg-sky-100 p-3 rounded-xl">
                  <Heart className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold">Plano PEI Dinâmico</h3>
                <p className="text-sm text-slate-500">Gestão de metas individuais com critérios de maestria configuráveis.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-6 md:py-12">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-sky-500" />
            <span className="font-bold">Aura ABA</span>
          </div>
          <p className="text-xs text-slate-500">© 2024 Aura ABA. Todos os direitos reservados.</p>
          <nav className="flex gap-4 sm:gap-6">
            <a className="text-xs hover:underline underline-offset-4" href="#">
              Termos de Uso
            </a>
            <a className="text-xs hover:underline underline-offset-4" href="#">
              Privacidade
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
