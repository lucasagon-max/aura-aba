'use client'

import { 
  Stethoscope, 
  Activity, 
  MessageSquare, 
  Heart, 
  Brain, 
  Users, 
  GraduationCap, 
  Home,
  Save
} from "lucide-react";
import { useState } from "react";

interface AnamneseFormProps {
  initialData: any;
  onSubmit: (data: any) => Promise<void>;
  isPublic?: boolean;
}

export function AnamneseForm({ initialData, onSubmit, isPublic = false }: AnamneseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sections = initialData || {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. Histórico Médico */}
      <FormSection title="1. Histórico Médico e Pré-Natal" icon={<Stethoscope className="text-blue-500" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormSelect label="Intercorrências na Gestação" name="med_gestation" defaultValue={sections.med_gestation} options={['Sem intercorrências', 'Diabetes Gestacional', 'Pré-eclâmpsia', 'Infecções', 'Outros']} />
          <FormSelect label="Tipo de Parto" name="med_birth_type" defaultValue={sections.med_birth_type} options={['Normal', 'Cesárea', 'Fórceps']} />
          <FormSelect label="Tempo de Gestação" name="med_term" defaultValue={sections.med_term} options={['Prematuro (<37s)', 'No tempo (37-42s)', 'Pós-termo (>42s)']} />
          <FormSelect label="Precisou de UTI Neonatal?" name="med_uti" defaultValue={sections.med_uti} options={['Sim', 'Não']} />
          <FormSelect label="Icterícia?" name="med_jaundice" defaultValue={sections.med_jaundice} options={['Sim', 'Não']} />
          <FormSelect label="Histórico de Convulsões?" name="med_seizures" defaultValue={sections.med_seizures} options={['Sim', 'Não']} />
          <FormSelect label="Medicação Contínua?" name="med_continuous" defaultValue={sections.med_continuous} options={['Sim', 'Não']} />
        </div>
        <div className="mt-6 space-y-4">
          <FormTextArea label="Detalhes sobre Médicações e Exames" name="med_notes" defaultValue={sections.med_notes} placeholder="Descreva medicações, dosagens e resultados de exames importantes..." />
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Exames Realizados</label>
            <div className="flex flex-wrap gap-4">
              {['Bera (Audição)', 'Teste Olhinho', 'EEG', 'Ressonância'].map(exam => (
                <label key={exam} className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                  <input type="checkbox" name={`exam_${exam.split(' ')[0].toLowerCase()}`} defaultChecked={sections[`exam_${exam.split(' ')[0].toLowerCase()}`] === 'on'} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm text-slate-700">{exam}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </FormSection>

      {/* 2. Desenvolvimento Motor */}
      <FormSection title="2. Desenvolvimento Motor" icon={<Activity className="text-emerald-500" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FormSelect label="Sustentou a cabeça (3m)" name="motor_head" defaultValue={sections.motor_head} options={['No tempo', 'Atrasado', 'Não sabe']} />
          <FormSelect label="Sentou s/ apoio (6-8m)" name="motor_sitting" defaultValue={sections.motor_sitting} options={['No tempo', 'Atrasado', 'Não sabe']} />
          <FormSelect label="Engatinhou (9m)" name="motor_crawling" defaultValue={sections.motor_crawling} options={['No tempo', 'Atrasado', 'Não engatinhou', 'Não sabe']} />
          <FormSelect label="Andou sozinho (12-15m)" name="motor_walking" defaultValue={sections.motor_walking} options={['No tempo', 'Atrasado', 'Não sabe']} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <FormSelect label="Cai com frequência?" name="motor_falls" defaultValue={sections.motor_falls} options={['Sim', 'Não']} />
          <FormSelect label="Sobe/Desce escadas?" name="motor_stairs" defaultValue={sections.motor_stairs} options={['Sim', 'Não']} />
          <FormSelect label="Coordenação Fina (Lápis/Tesoura)?" name="motor_fine" defaultValue={sections.motor_fine} options={['Sim', 'Com dificuldade', 'Não']} />
        </div>
        <div className="mt-6">
          <FormTextArea label="Observações sobre o Desenvolvimento Motor" name="motor_notes" defaultValue={sections.motor_notes} placeholder="Descreva outras habilidades ou atrasos percebidos..." />
        </div>
      </FormSection>

      {/* 3. Linguagem */}
      <FormSection title="3. Linguagem e Comunicação" icon={<MessageSquare className="text-indigo-500" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect label="Houve Perda de fala (Regressão)?" name="lang_regression" defaultValue={sections.lang_regression} options={['Sim', 'Não']} />
          <FormSelect label="Compreensão de Ordens" name="lang_comprehension" defaultValue={sections.lang_comprehension} options={['Entende tudo', 'Entende comandos simples', 'Pouca compreensão']} />
          <FormSelect label="Contato Visual" name="lang_eye_contact" defaultValue={sections.lang_eye_contact} options={['Consistente', 'Intermitente', 'Raro/Ausente']} />
          <FormSelect label="Responde ao Nome" name="lang_name_response" defaultValue={sections.lang_name_response} options={['Sempre', 'Às vezes', 'Raramente', 'Nunca']} />
        </div>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Formas de Comunicação Atual</label>
            <div className="flex flex-wrap gap-4">
              {['Frases', 'Palavras', 'Gestos', 'Puxa mão', 'Gritos', 'Não-verbal'].map(form => (
                <label key={form} className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                  <input type="checkbox" name={`comm_${form.toLowerCase()}`} defaultChecked={sections[`comm_${form.toLowerCase()}`] === 'on'} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm text-slate-700">{form}</span>
                </label>
              ))}
            </div>
          </div>
          <FormTextArea label="Detalhes sobre a Comunicação" name="lang_notes" defaultValue={sections.lang_notes} placeholder="Como a criança expressa desejos, frustrações e interage verbalmente?" />
        </div>
      </FormSection>

      {/* 4. Autocuidado */}
      <FormSection title="4. Autocuidado e Vida Diária" icon={<Heart className="text-rose-500" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormSelect label="Alimentação" name="life_eating" defaultValue={sections.life_eating} options={['Sim (talheres)', 'Sim (mãos)', 'Ajuda total']} />
          <FormSelect label="Seletividade Alimentar?" name="life_selectivity" defaultValue={sections.life_selectivity} options={['Sim', 'Não']} />
          <FormSelect label="Dificuldade no Sono?" name="life_sleep" defaultValue={sections.life_sleep} options={['Sim', 'Não']} />
          <FormSelect label="Desfralde Diurno" name="life_toilet_day" defaultValue={sections.life_toilet_day} options={['Concluído', 'Em andamento', 'Não iniciado']} />
          <FormSelect label="Desfralde Noturno" name="life_toilet_night" defaultValue={sections.life_toilet_night} options={['Concluído', 'Em andamento', 'Não iniciado']} />
          <FormSelect label="Veste-se sozinho?" name="life_dressing" defaultValue={sections.life_dressing} options={['Sim', 'Com ajuda', 'Não']} />
        </div>
        <div className="mt-6">
          <FormTextArea label="Detalhes sobre Rotina e Autonomia" name="life_notes" defaultValue={sections.life_notes} placeholder="Descreva a rotina de sono, seletividade alimentar ou outras dificuldades do dia a dia..." />
        </div>
      </FormSection>

      {/* 5. Comportamento */}
      <FormSection title="5. Comportamento e Sensorial" icon={<Brain className="text-orange-500" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect label="Interesses Restritos?" name="beh_interests" defaultValue={sections.beh_interests} options={['Sim', 'Não']} />
          <FormSelect label="Movimentos Repetitivos (Flapping)" name="beh_stereotypes" defaultValue={sections.beh_stereotypes} options={['Sempre', 'Frequentemente', 'Às vezes', 'Raramente', 'Nunca']} />
          <FormSelect label="Andar na ponta dos pés?" name="beh_toes" defaultValue={sections.beh_toes} options={['Sim', 'Não']} />
          <FormSelect label="Frequência de Crises" name="beh_crises" defaultValue={sections.beh_crises} options={['Diárias', 'Semanais', 'Raras', 'Nunca']} />
          <FormSelect label="Sensibilidade ao Som?" name="beh_sens_sound" defaultValue={sections.beh_sens_sound} options={['Sim', 'Não']} />
          <FormSelect label="Sensibilidade ao Toque?" name="beh_sens_touch" defaultValue={sections.beh_sens_touch} options={['Sim', 'Não']} />
        </div>
        <div className="mt-6">
          <FormTextArea label="Comportamentos Desafiadores ou Sensoriais" name="beh_notes" defaultValue={sections.beh_notes} placeholder="Descreva como são as crises, o que as gatilha e outras questões sensoriais..." />
        </div>
      </FormSection>

      {/* 6. Socialização */}
      <FormSection title="6. Socialização e Brincar" icon={<Users className="text-purple-500" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect label="Busca outras crianças?" name="soc_seek_peers" defaultValue={sections.soc_seek_peers} options={['Sim', 'Às vezes', 'Fica sozinho']} />
          <FormSelect label="Brincar de Faz de Conta?" name="soc_pretend" defaultValue={sections.soc_pretend} options={['Sim', 'Pouco', 'Não']} />
          <FormSelect label="Brincar Funcional?" name="soc_functional" defaultValue={sections.soc_functional} options={['Sim', 'Pouco', 'Não']} />
          <FormSelect label="Aceita Toque/Carinho?" name="soc_affection" defaultValue={sections.soc_affection} options={['Sim', 'Às vezes', 'Evita']} />
        </div>
        <div className="mt-6">
          <FormTextArea label="Observações sobre a Interação Social" name="soc_notes" defaultValue={sections.soc_notes} placeholder="Como a criança brinca e se relaciona com adultos e outras crianças?" />
        </div>
      </FormSection>

      {/* 7. Escolaridade */}
      <FormSection title="7. Escolaridade" icon={<GraduationCap className="text-amber-600" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect label="Frequenta Escola?" name="edu_attending" defaultValue={sections.edu_attending} options={['Sim', 'Não']} />
          <FormSelect label="Dificuldade de Adaptação?" name="edu_adaptation" defaultValue={sections.edu_adaptation} options={['Sim', 'Não']} />
          <FormSelect label="Possui Mediador escolar?" name="edu_mediator" defaultValue={sections.edu_mediator} options={['Sim', 'Não']} />
          <FormSelect label="Dificuldade de Aprendizado?" name="edu_difficulty" defaultValue={sections.edu_difficulty} options={['Sim', 'Não']} />
        </div>
        <div className="mt-6">
          <FormTextArea label="Histórico Escolar e Apoio" name="edu_notes" defaultValue={sections.edu_notes} placeholder="Descreva o histórico escolar, inclusão e dificuldades específicas na escola..." />
        </div>
      </FormSection>

      {/* 8. Família e Queixa */}
      <FormSection title="8. Contexto Familiar e Queixa" icon={<Home className="text-slate-600" />}>
        <div className="space-y-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Histórico Familiar de Condições Genéticas ou Neurológicas</label>
            <p className="text-xs text-slate-500 mb-2">Marque todas as opções aplicáveis para parentes de primeiro ou segundo grau (pais, irmãos, tios, avós).</p>
            <div className="flex flex-wrap gap-4">
              {['Autismo (TEA)', 'TDAH', 'Atraso de Desenvolvimento', 'Esquizofrenia', 'Epilepsia', 'Nenhum Histórico'].map(hist => {
                const nameKey = `fam_hist_${hist.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
                return (
                  <label key={hist} className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input type="checkbox" name={nameKey} defaultChecked={sections[nameKey] === 'on'} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-sm text-slate-700">{hist}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <FormTextArea 
            label="Detalhes do Histórico Familiar" 
            name="fam_history_notes" 
            defaultValue={sections.fam_history_notes} 
            placeholder="Se marcou alguma condição acima, especifique o grau de parentesco ou outras condições genéticas/neurológicas relevantes..." 
          />
        </div>
        <div className="space-y-4">
          <FormTextArea 
            label="Observações Gerais e Queixa Principal" 
            name="complaint_details" 
            defaultValue={sections.complaint_details} 
            placeholder="Descreva as principais preocupações da família..." 
          />
        </div>
      </FormSection>

      {/* Ações Fixas */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 z-20">
        <div className="max-w-5xl mx-auto flex justify-end">
          <button disabled={isSubmitting} type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 active:scale-95 w-full md:w-auto justify-center disabled:opacity-70 disabled:cursor-not-allowed">
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {isSubmitting ? 'Enviando...' : (isPublic ? 'Enviar Anamnese' : 'Salvar Prontuário')}
          </button>
        </div>
      </div>
    </form>
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
  const [value, setValue] = useState(defaultValue || "");

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-600">{label}</label>
      <select 
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50/50 text-slate-700 font-medium"
      >
        <option value="" disabled>Selecione...</option>
        {options.map(opt => (
          <option key={opt} value={opt.toLowerCase().replace(/ /g, '_')}>{opt}</option>
        ))}
      </select>
      {value.includes('outro') && (
        <div className="pt-2 animate-in fade-in slide-in-from-top-2">
          <input 
            type="text" 
            name={`${name}_other_details`} 
            placeholder="Por favor, especifique..."
            className="w-full p-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white text-slate-700 text-sm"
            required
          />
        </div>
      )}
    </div>
  );
}

function FormTextArea({ label, name, defaultValue, placeholder }: { label: string, name: string, defaultValue?: string, placeholder?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-600">{label}</label>
      <textarea 
        name={name}
        defaultValue={defaultValue}
        className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[100px] bg-slate-50/50"
        placeholder={placeholder}
      />
    </div>
  );
}
