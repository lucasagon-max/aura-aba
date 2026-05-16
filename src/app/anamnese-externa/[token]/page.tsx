import { createClient } from "@/utils/supabase/server";
import { saveAnamnesePublic } from "@/app/actions/anamnese-externa";
import { notFound, redirect } from "next/navigation";
import { AnamneseForm } from "@/components/anamnese/anamnese-form";
import { Heart } from "lucide-react";

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function PublicAnamnesePage({ params }: PageProps) {
  const { token } = await params;
  const supabase = await createClient();

  // 1. Buscar o paciente pelo token (usando o cliente de servidor)
  const { data: patient, error: patientError } = await supabase
    .from('patients')
    .select('id, name, share_token_active')
    .eq('share_token', token)
    .single();

  if (patientError || !patient || !patient.share_token_active) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Link Inválido</h1>
          <p className="text-slate-500 mb-6">Este link de anamnese não é mais válido ou expirou. Por favor, solicite um novo link à clínica.</p>
        </div>
      </div>
    );
  }

  // 2. Buscar anamnese existente (se houver)
  const { data: anamnese } = await supabase
    .from('anamneses')
    .select('sections')
    .eq('patient_id', patient.id)
    .single();

  const initialSections = anamnese?.sections || {};

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar Minimalista */}
      <nav className="bg-white border-b border-slate-200 p-4 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Heart size={20} fill="currentColor" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Aura Neuro</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Anamnese Inicial</p>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-4 md:p-8 pb-32">
        {/* Intro */}
        <div className="bg-indigo-600 rounded-3xl p-8 mb-8 text-white shadow-xl shadow-indigo-100">
          <h1 className="text-3xl font-bold mb-2">Olá! 👋</h1>
          <p className="text-indigo-100 max-w-2xl">
            Este é o formulário de anamnese para <strong>{patient.name}</strong>. 
            Suas respostas nos ajudarão a entender melhor o desenvolvimento da criança e planejar o melhor acompanhamento possível.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-indigo-200">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Suas informações são tratadas com total sigilo e segurança.
          </div>
        </div>

        <AnamneseForm 
          isPublic 
          initialData={initialSections} 
          onSubmit={async (data) => {
            'use server'
            const result = await saveAnamnesePublic(token, data);
            if (result.success) {
              redirect(`/anamnese-externa/${token}/sucesso`);
            }
          }} 
        />
      </main>
    </div>
  );
}
