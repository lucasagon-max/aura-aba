-- Garantir que cada paciente tenha apenas uma anamnese principal
-- Isso permite o uso do 'upsert' no código
ALTER TABLE anamneses ADD CONSTRAINT anamneses_patient_id_key UNIQUE (patient_id);
