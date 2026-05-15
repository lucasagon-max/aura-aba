import { InputField } from "./InputField";

export default function DesenvolvimentoStep({ data, onChange }: { data: any, onChange: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <InputField 
        label="Idade que sentou" 
        name="sentou" 
        value={data.sentou} 
        onChange={(e) => onChange('desenvolvimento', 'sentou', e.target.value)}
      />
      <InputField 
        label="Idade que andou" 
        name="andou" 
        value={data.andou} 
        onChange={(e) => onChange('desenvolvimento', 'andou', e.target.value)}
      />
      <InputField 
        label="Idade que falou" 
        name="falou" 
        value={data.falou} 
        onChange={(e) => onChange('desenvolvimento', 'falou', e.target.value)}
      />
      <InputField 
        label="Controle de esfíncteres" 
        name="esfincteres" 
        value={data.esfincteres} 
        onChange={(e) => onChange('desenvolvimento', 'esfincteres', e.target.value)}
        placeholder="Ex: Diurno aos 3 anos"
      />
      <InputField 
        label="Qualidade do Sono" 
        name="sono" 
        value={data.sono} 
        onChange={(e) => onChange('desenvolvimento', 'sono', e.target.value)}
        placeholder="Ex: Acorda muito à noite"
      />
      <InputField 
        label="Alimentação" 
        name="alimentacao" 
        value={data.alimentacao} 
        onChange={(e) => onChange('desenvolvimento', 'alimentacao', e.target.value)}
        placeholder="Ex: Seletividade alimentar"
      />
    </div>
  );
}
