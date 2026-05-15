import { InputField } from "./InputField";

export default function QueixaStep({ data, onChange }: { data: any, onChange: any }) {
  return (
    <div className="space-y-6">
      <InputField 
        label="Descrição da dificuldade principal" 
        name="descricao_queixa" 
        isTextArea
        value={data.descricao_queixa} 
        onChange={(e) => onChange('queixa', 'descricao_queixa', e.target.value)}
        placeholder="O que motivou a busca por atendimento?"
      />
      <InputField 
        label="Quando as dificuldades foram notadas?" 
        name="inicio_queixa" 
        value={data.inicio_queixa} 
        onChange={(e) => onChange('queixa', 'inicio_queixa', e.target.value)}
        placeholder="Ex: Aos 2 anos de idade, após entrar na escola..."
      />
      <InputField 
        label="O que já foi feito até o momento?" 
        name="intervencoes_anteriores" 
        isTextArea
        value={data.intervencoes_anteriores} 
        onChange={(e) => onChange('queixa', 'intervencoes_anteriores', e.target.value)}
        placeholder="Ex: Fonoaudiologia por 6 meses, exames neurológicos..."
      />
    </div>
  );
}
