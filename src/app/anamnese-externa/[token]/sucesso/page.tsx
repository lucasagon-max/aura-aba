import { CheckCircle2, Heart } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl max-w-lg w-full text-center border border-slate-100">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-lg shadow-emerald-50">
          <CheckCircle2 size={40} />
        </div>
        
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Formulário Enviado!</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Muito obrigado pela sua colaboração. As informações foram enviadas com sucesso e já estão disponíveis para a equipe clínica analisar.
        </p>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Próximos Passos</p>
          <ul className="text-sm text-slate-600 space-y-3 text-left">
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">1</div>
              <span>A equipe analisará os dados detalhadamente.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">2</div>
              <span>Caso necessário, entraremos em contato para tirar dúvidas.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">3</div>
              <span>As informações serão usadas para o Plano de Ensino Individualizado (PEI).</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold italic">
            <Heart size={16} fill="currentColor" />
            Aura Neuro
          </div>
          <p className="text-[10px] text-slate-400">Você já pode fechar esta aba.</p>
        </div>
      </div>
    </div>
  );
}
