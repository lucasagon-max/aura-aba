-- 1. Adicionar coluna de tipo de plano à tabela de clínicas
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS plan_type TEXT CHECK (plan_type IN ('trial', 'individual', 'clinic')) DEFAULT 'trial';

-- 2. Função para validar o limite de pacientes baseada no plano
CREATE OR REPLACE FUNCTION check_patient_limit()
RETURNS TRIGGER AS $$
DECLARE
    current_count INTEGER;
    current_plan TEXT;
BEGIN
    SELECT plan_type INTO current_plan FROM clinics WHERE id = NEW.clinic_id;
    
    IF current_plan = 'trial' THEN
        SELECT count(*) INTO current_count FROM patients WHERE clinic_id = NEW.clinic_id AND active = TRUE;
        IF current_count >= 3 THEN
            RAISE EXCEPTION 'Limite de pacientes atingido para o plano Trial (máximo 3).';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Trigger para limite de pacientes
DROP TRIGGER IF EXISTS trg_check_patient_limit ON patients;
CREATE TRIGGER trg_check_patient_limit
BEFORE INSERT ON patients
FOR EACH ROW EXECUTE FUNCTION check_patient_limit();

-- 4. Função para validar o limite de terapeutas/usuários baseada no plano
CREATE OR REPLACE FUNCTION check_therapist_limit()
RETURNS TRIGGER AS $$
DECLARE
    current_count INTEGER;
    current_plan TEXT;
BEGIN
    SELECT plan_type INTO current_plan FROM clinics WHERE id = NEW.clinic_id;
    
    SELECT count(*) INTO current_count FROM profiles WHERE clinic_id = NEW.clinic_id;
    
    IF current_plan = 'individual' AND current_count >= 1 THEN
        RAISE EXCEPTION 'O plano Individual permite apenas 1 terapeuta.';
    ELSIF current_plan = 'clinic' AND current_count >= 5 THEN
        RAISE EXCEPTION 'O plano Clínica permite no máximo 5 terapeutas.';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Trigger para limite de terapeutas
DROP TRIGGER IF EXISTS trg_check_therapist_limit ON profiles;
CREATE TRIGGER trg_check_therapist_limit
BEFORE INSERT ON profiles
FOR EACH ROW EXECUTE FUNCTION check_therapist_limit();
