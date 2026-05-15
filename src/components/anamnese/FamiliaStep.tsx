import { InputField } from "./InputField";

export default function FamiliaStep({ data, onChange }: { data: any, onChange: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField 
        label="Nome do Pai" 
        name="nome_pai" 
        value={data.nome_pai} 
        onChange={(e) => onChange('familia', 'nome_pai', e.target.value)}
      />
      <InputField 
        label="Profissão do Pai" 
        name="profissao_pai" 
        value={data.profissao_pai} 
        onChange={(e) => onChange('familia', 'profissao_pai', e.target.value)}
      />
      <InputField 
        label="Nome da Mãe" 
        name="nome_mae" 
        value={data.nome_mae} 
        onChange={(e) => onChange('familia', 'nome_mae', e.target.value)}
      />
      <InputField 
        label="Profissão da Mãe" 
        name="profissao_mae" 
        value={data.profissao_mae} 
        onChange={(e) => onChange('familia', 'profissao_mae', e.target.value)}
      />
      <div className="col-span-full">
        <InputField 
          label="Com quem a criança vive?" 
          name="composicao_familiar" 
          value={data.composicao_familiar} 
          onChange={(e) => onChange('familia', 'composicao_familiar', e.target.value)}
          placeholder="Ex: Pais e um irmão mais novo"
        />
      </div>
      <div className="col-span-full">
        <InputField 
          label="Histórico de dificuldades na família" 
          name="historico_familiar" 
          isTextArea
          value={data.historico_familiar} 
          onChange={(e) => onChange('familia', 'historico_familiar', e.target.value)}
          placeholder="Descreva se há outros casos de TEA, TDAH ou dificuldades de aprendizagem na família..."
        />
      </div>
    </div>
  );
}
