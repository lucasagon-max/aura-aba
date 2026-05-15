import { createClient } from "@/utils/supabase/server";
import { saveAnamnese } from "@/app/actions/anamnese";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnamnesePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // 1. Buscar dados do paciente
  const { data: patient } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single();

  if (!patient) notFound();

  // 2. Buscar anamnese existente (se houver)
  const { data: anamnese } = await supabase
    .from('anamneses')
    .select('*')
    .eq('patient_id', id)
    .single();

  const initialSections = anamnese?.sections || {};

  return (
    <div className="max-w-5xl mx-auto p-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
            <Link href="/dashboard/pacientes" className="hover:text-indigo-600 transition-colors">Pacientes</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{patient.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Anamnese Inicial</h1>
          <p className="text-slate-500">Histórico detalhado do desenvolvimento e comportamento.</p>
        </div>
      </div>

      <form action={async (formData: FormData) => {
        'use server'
        const rawData = Object.fromEntries(formData.entries());
        await saveAnamnese(id, rawData);
      }} className="space-y-8">
        
        {/* Seção 1: Desenvolvimento */}
        <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
            Desenvolvimento Motor e Marcos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Com quantos meses sentou?</label>
              <input 
                name="motor_sitting" 
                defaultValue={initialSections.motor_sitting}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Ex: 6 meses"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Com quantos meses andou?</label>
              <input 
                name="motor_walking" 
                defaultValue={initialSections.motor_walking}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Ex: 12 meses"
              />
            </div>
          </div>
        </section>

        {/* Seção 2: Linguagem */}
        <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
            Linguagem e Comunicação
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Principais formas de comunicação atual</label>
              <textarea 
                name="comm_current"
                defaultValue={initialSections.comm_current}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all min-h-[100px]"
                placeholder="Descreva se usa fala, gestos, PECS, etc."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Aponta para o que deseja?</label>
                <select 
                  name="comm_pointing"
                  defaultValue={initialSections.comm_pointing}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white"
                >
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                  <option value="as_vezes">Às vezes</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Atende ao chamado do nome?</label>
                <select 
                  name="comm_name_response"
                  defaultValue={initialSections.comm_name_response}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white"
                >
                  <option value="sempre">Sempre</option>
                  <option value="frequentemente">Frequentemente</option>
                  <option value="raramente">Raramente</option>
                  <option value="nunca">Nunca</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 3: Comportamento */}
        <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-2 h-6 bg-orange-500 rounded-full"></div>
            Comportamentos e Interesses
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Interesses Restritos ou Estereotipias</label>
              <textarea 
                name="behavior_stereotypes"
                defaultValue={initialSections.behavior_stereotypes}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all min-h-[100px]"
                placeholder="Descreva movimentos repetitivos ou interesses fixos."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Hipersensibilidade Sensorial</label>
              <textarea 
                name="behavior_sensory"
                defaultValue={initialSections.behavior_sensory}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all min-h-[100px]"
                placeholder="Luzes, sons, texturas, etc."
              />
            </div>
          </div>
        </section>

        {/* Barra de Ações Fixa */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 z-10">
          <div className="max-w-5xl mx-auto flex justify-end gap-4">
            <Link href="/dashboard/pacientes" className="px-6 py-2 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-all">
              Sair sem salvar
            </Link>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-8 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-95">
              Salvar Anamnese
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
