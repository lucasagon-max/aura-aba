# Referência de Formulários

Este documento serve como base para a criação das tabelas no banco de dados e dos componentes de formulário no frontend.

## 1. Anamnese Psicopedagógica

| Seção | Campos | Tipo de Dado |
| :--- | :--- | :--- |
| **Identificação** | Nome Completo, Data de Nascimento, Sexo, Escola, Ano Escolar | Texto / Data |
| **Família** | Nome do Pai/Mãe, Profissão, Com quem a criança vive, Histórico de dificuldades na família | Texto / LongText |
| **Queixa** | Descrição da dificuldade principal, Quando começou, O que já foi feito | LongText |
| **Desenvolvimento** | Idade que sentou, andou, falou, controle de esfíncteres, sono, alimentação | Texto / Enum |
| **Saúde** | Uso de medicamentos, Exames auditivos/visuais, Alergias, Diagnósticos prévios | LongText |
| **Vida Escolar** | Relacionamento com pares, Matérias preferidas, Dificuldades específicas, Histórico de reprovação | LongText |

## 2. Prontuário Diário (Sessão ABA)

### Cabeçalho
- **Data/Hora:** Automático.
- **Terapeuta:** Relacionado ao perfil logado.
- **Duração:** Timer de sessão.

### Registro de Programas (DTT)
- **Programa:** (Ex: Imitação Motora).
- **Alvo:** (Ex: Tocar a cabeça).
- **Tentativas:** Lista de 10 tentativas com status (Acerto, Ajuda Física, Ajuda Verbal, Erro).

### Registro ABC (Análise de Comportamento)
- **Antecedente:** O que aconteceu logo antes.
- **Comportamento:** O que a criança fez.
- **Consequência:** O que aconteceu logo depois.
- **Função Provável:** Fugir de demanda, Obter item, Sensorial, Atenção.

### Evolução Qualitativa
- **Notas do Dia:** Texto livre sobre intercorrências.
- **Status do PEI:** Atualização manual de progresso.

## 3. Plano de Ensino Individualizado (PEI)
- **Área de Desenvolvimento:** (Linguagem, Autocuidado, Social, Acadêmico).
- **Meta Curto Prazo:** Texto.
- **Critério de Maestria:** (Ex: 90% em 5 dias).
- **Status:** (Ativo, Masterizado, Manutenção).