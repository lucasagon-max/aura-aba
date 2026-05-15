import { InputField } from "./InputField";

export default function EscolarStep({ data, onChange }: { data: any, onChange: any }) {
  return (
    <div className="space-y-6">
      <InputField 
        label="Relacionamento com pares" 
        name="relacionamento" 
        isTextArea
        value={data.relacionamento} 
        onChange={(e) => onChange('escolar', 'relacionamento', e.target.value)}
        placeholder="Como a criança interage com outras crianças?"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField 
          label="Matérias preferidas" 
          name="materias_preferidas" 
          value={data.materias_preferidas} 
          onChange={(e) => onChange('escolar', 'materias_preferidas', e.target.value)}
        />
        <InputField 
          label="Dificuldades específicas" 
          name="dificuldades_especificas" 
          value={data.dificuldades_especificas} 
          onChange={(e) => onChange('escolar', 'dificuldades_especificas', e.target.value)}
        />
      </div>
      <InputField 
        label="Histórico de reprovação ou troca de escola" 
        name="historico_escolar" 
        isTextArea
        value={data.historico_escolar} 
        onChange={(e) => onChange('escolar', 'historico_escolar', e.target.value)}
      />
    </div>
  );
}
