import { createClient } from "@/utils/supabase/server";
import { saveAnamnese } from "@/app/actions/anamnese";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Stethoscope, 
  Activity, 
  MessageSquare, 
  Heart, 
  Brain, 
  Users, 
  GraduationCap, 
  Home,
  Save,
  ArrowLeft
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnamnesePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: patient } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single();

  if (!patient) notFound();

  const { data: anamnese } = await supabase
    .from('anamneses')
    .select('*')
    .eq('patient_id', id)
    .single();

  const initialSections = anamnese?.sections || {};

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
            <Link href="/dashboard/pacientes" className="hover:text-indigo-600 flex items-center gap-1 transition-colors">
              <ArrowLeft size={14} /> Pacientes
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{patient.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Anamnese Inicial</h1>
          <p className="text-slate-500">Preenchimento rápido e padronizado do histórico clínico.</p>
        </div>
      </div>

      <form action={async (formData: FormData) => {
        'use server'
        const rawData = Object.fromEntries(formData.entries());
        await saveAnamnese(id, rawData);
      }} className="space-y-6">
        
        {/* 1. Histórico Médico */}
        <FormSection title="1. Histórico Médico e Pré-Natal" icon={<Stethoscope className="text-blue-500" />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormSelect label="Intercorrências na Gestação" name="med_gestation" defaultValue={initialSections.med_gestation} options={['Sem intercorrências', 'Diabetes Gestacional', 'Pré-eclâmpsia', 'Infecções', 'Outros']} />
            <FormSelect label="Tipo de Parto" name="med_birth_type" defaultValue={initialSections.med_birth_type} options={['Normal', 'Cesárea', 'Fórceps']} />
            <FormSelect label="Tempo de Gestação" name="med_term" defaultValue={initialSections.med_term} options={['Prematuro (<37s)', 'No tempo (37-42s)', 'Pós-termo (>42s)']} />
            <FormSelect label="Precisou de UTI Neonatal?" name="med_uti" defaultValue={initialSections.med_uti} options={['Sim', 'Não']} />
            <FormSelect label="Icterícia?" name="med_jaundice" defaultValue={initialSections.med_jaundice} options={['Sim', 'Não']} />
            <FormSelect label="Histórico de Convulsões?" name="med_seizures" defaultValue={initialSections.med_seizures} options={['Sim', 'Não']} />
            <FormSelect label="Medicação Contínua?" name="med_continuous" defaultValue={initialSections.med_continuous} options={['Sim', 'Não']} />
          </div>
          <div className="mt-6 space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Exames Realizados</label>
            <div className="flex flex-wrap gap-4">
              {['Bera (Audição)', 'Teste Olhinho', 'EEG', 'Ressonância'].map(exam => (
                <label key={exam} className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                  <input type="checkbox" name={`exam_${exam.split(' ')[0].toLowerCase()}`} defaultChecked={initialSections[`exam_${exam.split(' ')[0].toLowerCase()}`] === 'on'} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm text-slate-700">{exam}</span>
                </label>
              ))}
            </div>
          </div>
        </FormSection>

        {/* 2. Desenvolvimento Motor */}
        <FormSection title="2. Desenvolvimento Motor" icon={<Activity className="text-emerald-500" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormSelect label="Sustentou a cabeça (3m)" name="motor_head" defaultValue={initialSections.motor_head} options={['No tempo', 'Atrasado', 'Não sabe']} />
            <FormSelect label="Sentou s/ apoio (6-8m)" name="motor_sitting" defaultValue={initialSections.motor_sitting} options={['No tempo', 'Atrasado', 'Não sabe']} />
            <FormSelect label="Engatinhou (9m)" name="motor_crawling" defaultValue={initialSections.motor_crawling} options={['No tempo', 'Atrasado', 'Não engatinhou', 'Não sabe']} />
            <FormSelect label="Andou sozinho (12-15m)" name="motor_walking" defaultValue={initialSections.motor_walking} options={['No tempo', 'Atrasado', 'Não sabe']} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <FormSelect label="Cai com frequência?" name="motor_falls" defaultValue={initialSections.motor_falls} options={['Sim', 'Não']} />
            <FormSelect label="Sobe/Desce escadas?" name="motor_stairs" defaultValue={initialSections.motor_stairs} options={['Sim', 'Não']} />
            <FormSelect label="Coordenação Fina (Lápis/Tesoura)?" name="motor_fine" defaultValue={initialSections.motor_fine} options={['Sim', 'Com dificuldade', 'Não']} />
          </div>
        </FormSection>

        {/* 3. Linguagem */}
        <FormSection title="3. Linguagem e Comunicação" icon={<MessageSquare className="text-indigo-500" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect label="Houve Perda de fala (Regressão)?" name="lang_regression" defaultValue={initialSections.lang_regression} options={['Sim', 'Não']} />
            <FormSelect label="Compreensão de Ordens" name="lang_comprehension" defaultValue={initialSections.lang_comprehension} options={['Entende tudo', 'Entende comandos simples', 'Pouca compreensão']} />
            <FormSelect label="Contato Visual" name="lang_eye_contact" defaultValue={initialSections.lang_eye_contact} options={['Consistente', 'Intermitente', 'Raro/Ausente']} />
            <FormSelect label="Responde ao Nome" name="lang_name_response" defaultValue={initialSections.lang_name_response} options={['Sempre', 'Às vezes', 'Raramente', 'Nunca']} />
          </div>
          <div className="mt-6 space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Formas de Comunicação Atual</label>
            <div className="flex flex-wrap gap-4">
              {['Frases', 'Palavras', 'Gestos', 'Puxa mão', 'Gritos', 'Não-verbal'].map(form => (
                <label key={form} className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                  <input type="checkbox" name={`comm_${form.toLowerCase()}`} defaultChecked={initialSections[`comm_${form.toLowerCase()}`] === 'on'} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm text-slate-700">{form}</span>
                </label>
              ))}
            </div>
          </div>
        </FormSection>

        {/* 4. Autocuidado */}
        <FormSection title="4. Autocuidado e Vida Diária" icon={<Heart className="text-rose-500" />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormSelect label="Alimentação" name="life_eating" defaultValue={initialSections.life_eating} options={['Sim (talheres)', 'Sim (mãos)', 'Ajuda total']} />
            <FormSelect label="Seletividade Alimentar?" name="life_selectivity" defaultValue={initialSections.life_selectivity} options={['Sim', 'Não']} />
            <FormSelect label="Dificuldade no Sono?" name="life_sleep" defaultValue={initialSections.life_sleep} options={['Sim', 'Não']} />
            <FormSelect label="Desfralde Diurno" name="life_toilet_day" defaultValue={initialSections.life_toilet_day} options={['Concluído', 'Em andamento', 'Não iniciado']} />
            <FormSelect label="Desfralde Noturno" name="life_toilet_night" defaultValue={initialSections.life_toilet_night} options={['Concluído', 'Em andamento', 'Não iniciado']} />
            <FormSelect label="Veste-se sozinho?" name="life_dressing" defaultValue={initialSections.life_dressing} options={['Sim', 'Com ajuda', 'Não']} />
          </div>
        </FormSection>

        {/* 5. Comportamento */}
        <FormSection title="5. Comportamento e Sensorial" icon={<Brain className="text-orange-500" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect label="Interesses Restritos?" name="beh_interests" defaultValue={initialSections.beh_interests} options={['Sim', 'Não']} />
            <FormSelect label="Movimentos Repetitivos (Flapping)" name="beh_stereotypes" defaultValue={initialSections.beh_stereotypes} options={['Sempre', 'Frequentemente', 'Às vezes', 'Raramente', 'Nunca']} />
            <FormSelect label="Andar na ponta dos pés?" name="beh_toes" defaultValue={initialSections.beh_toes} options={['Sim', 'Não']} />
            <FormSelect label="Frequência de Crises" name="beh_crises" defaultValue={initialSections.beh_crises} options={['Diárias', 'Semanais', 'Raras', 'Nunca']} />
            <FormSelect label="Sensibilidade ao Som?" name="beh_sens_sound" defaultValue={initialSections.beh_sens_sound} options={['Sim', 'Não']} />
            <FormSelect label="Sensibilidade ao Toque?" name="beh_sens_touch" defaultValue={initialSections.beh_sens_touch} options={['Sim', 'Não']} />
          </div>
        </FormSection>

        {/* 6. Socialização */}
        <FormSection title="6. Socialização e Brincar" icon={<Users className="text-purple-500" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect label="Busca outras crianças?" name="soc_seek_peers" defaultValue={initialSections.soc_seek_peers} options={['Sim', 'Às vezes', 'Fica sozinho']} />
            <FormSelect label="Brincar de Faz de Conta?" name="soc_pretend" defaultValue={initialSections.soc_pretend} options={['Sim', 'Pouco', 'Não']} />
            <FormSelect label="Brincar Funcional?" name="soc_functional" defaultValue={initialSections.soc_functional} options={['Sim', 'Pouco', 'Não']} />
            <FormSelect label="Aceita Toque/Carinho?" name="soc_affection" defaultValue={initialSections.soc_affection} options={['Sim', 'Às vezes', 'Evita']} />
          </div>
        </FormSection>

        {/* 7. Escolaridade */}
        <FormSection title="7. Escolaridade" icon={<GraduationCap className="text-amber-600" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect label="Frequenta Escola?" name="edu_attending" defaultValue={initialSections.edu_attending} options={['Sim', 'Não']} />
            <FormSelect label="Dificuldade de Adaptação?" name="edu_adaptation" defaultValue={initialSections.edu_adaptation} options={['Sim', 'Não']} />
            <FormSelect label="Possui Mediador escolar?" name="edu_mediator" defaultValue={initialSections.edu_mediator} options={['Sim', 'Não']} />
            <FormSelect label="Dificuldade de Aprendizado?" name="edu_difficulty" defaultValue={initialSections.edu_difficulty} options={['Sim', 'Não']} />
          </div>
        </FormSection>

        {/* 8. Família e Queixa */}
        <FormSection title="8. Contexto Familiar e Queixa" icon={<Home className="text-slate-600" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FormSelect label="Histórico Familiar (Autismo/TDAH)?" name="fam_history" defaultValue={initialSections.fam_history} options={['Sim', 'Não']} />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Observações Gerais e Queixa Principal</label>
              <textarea 
                name="complaint_details"
                defaultValue={initialSections.complaint_details}
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[120px] bg-slate-50/50"
                placeholder="Descreva as principais preocupações da família..."
              />
            </div>
          </div>
        </FormSection>

        {/* Ações Fixas */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 z-20">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Link href="/dashboard/pacientes" className="text-slate-500 font-medium hover:text-slate-700 transition-colors">
              Cancelar
            </Link>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 active:scale-95">
              <Save size={18} /> Salvar Prontuário
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}

function FormSection({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3">
        {icon}
        {title}
      </h3>
      {children}
    </section>
  );
}

function FormSelect({ label, name, options, defaultValue }: { label: string, name: string, options: string[], defaultValue?: any }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-600">{label}</label>
      <select 
        name={name}
        defaultValue={defaultValue || ""}
        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50/50 text-slate-700 font-medium"
      >
        <option value="" disabled>Selecione...</option>
        {options.map(opt => (
          <option key={opt} value={opt.toLowerCase().replace(/ /g, '_')}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
