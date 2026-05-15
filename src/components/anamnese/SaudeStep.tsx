import { InputField } from "./InputField";

export default function SaudeStep({ data, onChange }: { data: any, onChange: any }) {
  return (
    <div className="space-y-6">
      <InputField 
        label="Uso de medicamentos?" 
        name="medicamentos" 
        value={data.medicamentos} 
        onChange={(e) => onChange('saude', 'medicamentos', e.target.value)}
        placeholder="Quais e para quê?"
      />
      <InputField 
        label="Exames auditivos/visuais" 
        name="exames" 
        value={data.exames} 
        onChange={(e) => onChange('saude', 'exames', e.target.value)}
      />
      <InputField 
        label="Alergias conhecidas" 
        name="alergias" 
        value={data.alergias} 
        onChange={(e) => onChange('saude', 'alergias', e.target.value)}
      />
      <InputField 
        label="Diagnósticos prévios" 
        name="diagnosticos" 
        isTextArea
        value={data.diagnosticos} 
        onChange={(e) => onChange('saude', 'diagnosticos', e.target.value)}
        placeholder="Ex: TEA Nível 1 laudado pelo Dr. Fulano..."
      />
    </div>
  );
}
