-- 1. ADICIONAR COLUNA DE PLANO (Caso não exista)
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS plan_type TEXT CHECK (plan_type IN ('trial', 'individual', 'clinic')) DEFAULT 'trial';

-- 2. FUNÇÃO AUXILIAR: Obter clinic_id do usuário logado
CREATE OR REPLACE FUNCTION get_user_clinic_id()
RETURNS UUID AS $$
BEGIN
  RETURN (SELECT clinic_id FROM profiles WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. POLÍTICAS DE RLS PARA TODAS AS TABELAS

-- Clinics: Usuário só vê sua própria clínica
DROP POLICY IF EXISTS "Users can view their own clinic" ON clinics;
CREATE POLICY "Users can view their own clinic" ON clinics
FOR SELECT USING (id = get_user_clinic_id());

-- Profiles: Usuário vê apenas colegas da mesma clínica
DROP POLICY IF EXISTS "Users can view clinic profiles" ON profiles;
CREATE POLICY "Users can view clinic profiles" ON profiles
FOR SELECT USING (clinic_id = get_user_clinic_id());

-- Patients: Isolamento total por clínica
DROP POLICY IF EXISTS "Users can view clinic patients" ON patients;
CREATE POLICY "Users can view clinic patients" ON patients
FOR SELECT USING (clinic_id = get_user_clinic_id());

DROP POLICY IF EXISTS "Users can manage clinic patients" ON patients;
CREATE POLICY "Users can manage clinic patients" ON patients
FOR ALL USING (clinic_id = get_user_clinic_id());

-- Anamneses, Sessions, ABC Records, PEI Goals (Padrão repetido)
DO $$
DECLARE
    t TEXT;
BEGIN
    FOREACH t IN ARRAY ARRAY['anamneses', 'sessions', 'abc_records', 'pei_goals'] LOOP
        EXECUTE format('DROP POLICY IF EXISTS "Users can manage %I" ON %I', t, t);
        EXECUTE format('CREATE POLICY "Users can manage %I" ON %I FOR ALL USING (clinic_id = get_user_clinic_id())', t, t);
    END LOOP;
END $$;

-- 4. TRIGGERS DE LIMITES DE NEGÓCIO

-- Função para validar o limite de pacientes
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_check_patient_limit ON patients;
CREATE TRIGGER trg_check_patient_limit
BEFORE INSERT ON patients
FOR EACH ROW EXECUTE FUNCTION check_patient_limit();

-- Função para validar o limite de terapeutas
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_check_therapist_limit ON profiles;
CREATE TRIGGER trg_check_therapist_limit
BEFORE INSERT ON profiles
FOR EACH ROW EXECUTE FUNCTION check_therapist_limit();
