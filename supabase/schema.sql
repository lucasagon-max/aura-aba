-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabela de Clínicas (Tenants)
CREATE TABLE clinics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subscription_status TEXT DEFAULT 'trial',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Perfis (Terapeutas/Admins)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'therapist')) DEFAULT 'therapist',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela de Pacientes
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  birth_date DATE,
  gender TEXT,
  school TEXT,
  school_year TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabela de Anamneses
CREATE TABLE anamneses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  sections JSONB NOT NULL DEFAULT '{}',
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabela de Sessões ABA
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  therapist_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  start_time TIMESTAMPTZ DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabela de Registros ABC (Comportamento)
CREATE TABLE abc_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  antecedent TEXT,
  behavior TEXT,
  consequence TEXT,
  function TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Tabela de Metas PEI
CREATE TABLE pei_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  area TEXT NOT NULL, -- Ex: Linguagem, Autocuidado
  description TEXT NOT NULL,
  mastery_criteria TEXT,
  status TEXT CHECK (status IN ('active', 'mastered', 'maintenance', 'inactive')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- HABILITAR RLS (Row Level Security)
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE anamneses ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE abc_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE pei_goals ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE RLS (Exemplo para Pacientes)
-- Somente usuários da mesma clínica podem ver seus pacientes
CREATE POLICY "Users can view their own clinic's patients"
ON patients FOR SELECT
USING (clinic_id IN (
  SELECT clinic_id FROM profiles WHERE id = auth.uid()
));

CREATE POLICY "Users can insert patients into their own clinic"
ON patients FOR INSERT
WITH CHECK (clinic_id IN (
  SELECT clinic_id FROM profiles WHERE id = auth.uid()
));
