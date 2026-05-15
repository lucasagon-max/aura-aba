'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPatient(formData: FormData) {
  const supabase = await createClient();

  // 1. Pegar o clinic_id do usuário logado
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('clinic_id')
    .single();

  console.log('DEBUG - Profile:', profile);
  console.log('DEBUG - Error:', profileError);

  if (!profile?.clinic_id) {
    return { error: `Clínica não encontrada. (Status: ${profileError?.message || 'Perfil sem ID de clínica'})` };
  }

  const name = formData.get('name') as string;
  const birth_date = formData.get('birth_date') as string;
  const gender = formData.get('gender') as string;
  const school = formData.get('school') as string;
  const school_year = formData.get('school_year') as string;

  // 2. Inserir no banco (O Trigger do banco cuidará do limite de 3 pacientes automaticamente)
  const { error } = await supabase
    .from('patients')
    .insert({
      name,
      birth_date: birth_date || null,
      gender,
      school,
      school_year,
      clinic_id: profile.clinic_id
    });

  if (error) {
    console.error('Erro ao criar paciente:', error);
    if (error.message.includes('limite')) {
        return { error: 'Você atingiu o limite de 3 pacientes do plano Trial.' };
    }
    return { error: 'Falha ao cadastrar paciente. Tente novamente.' };
  }

  revalidatePath('/dashboard/pacientes');
  redirect('/dashboard/pacientes');
}
