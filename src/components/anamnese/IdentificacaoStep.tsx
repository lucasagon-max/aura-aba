import { InputField } from "./InputField";

export default function IdentificacaoStep({ data, onChange }: { data: any, onChange: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="col-span-full">
        <InputField 
          label="Nome Completo" 
          name="nome" 
          value={data.nome} 
          onChange={(e) => onChange('identificacao', 'nome', e.target.value)}
          required
        />
      </div>
      <InputField 
        label="Data de Nascimento" 
        name="data_nascimento" 
        type="date"
        value={data.data_nascimento} 
        onChange={(e) => onChange('identificacao', 'data_nascimento', e.target.value)}
        required
      />
      <InputField 
        label="Sexo" 
        name="sexo" 
        options={[
          { value: 'masculino', label: 'Masculino' },
          { value: 'feminino', label: 'Feminino' },
          { value: 'outro', label: 'Outro' }
        ]}
        value={data.sexo} 
        onChange={(e) => onChange('identificacao', 'sexo', e.target.value)}
      />
      <InputField 
        label="Escola" 
        name="escola" 
        value={data.escola} 
        onChange={(e) => onChange('identificacao', 'escola', e.target.value)}
      />
      <InputField 
        label="Ano Escolar" 
        name="ano_escolar" 
        value={data.ano_escolar} 
        onChange={(e) => onChange('identificacao', 'ano_escolar', e.target.value)}
      />
    </div>
  );
}
