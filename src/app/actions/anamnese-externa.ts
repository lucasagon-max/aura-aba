'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getShareLink(patientId: string) {
  const supabase = await createClient();

  // Verificar se o usuário está logado
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Usuário não autenticado.' };

  // Buscar o paciente e seu token
  const { data: patient, error } = await supabase
    .from('patients')
    .select('id, share_token')
    .eq('id', patientId)
    .single();

  if (error || !patient) {
    return { error: 'Paciente não encontrado.' };
  }

  // Se não tiver token, gera um (embora o SQL default já gere)
  if (!patient.share_token) {
    const { data: updatedPatient } = await supabase
      .from('patients')
      .update({ share_token: crypto.randomUUID() })
      .eq('id', patientId)
      .select('share_token')
      .single();
    
    return { token: updatedPatient?.share_token };
  }

  return { token: patient.share_token };
}

export async function saveAnamnesePublic(token: string, sections: any) {
  const supabase = await createClient();

  // 1. Validar o token e buscar o paciente
  const { data: patient, error: patientError } = await supabase
    .from('patients')
    .select('id, clinic_id')
    .eq('share_token', token)
    .eq('share_token_active', true)
    .single();

  if (patientError || !patient) {
    console.error('Erro ao validar token:', patientError);
    return { error: 'Link de acesso inválido ou expirado.' };
  }

  // 2. Salvar a anamnese (usando o clinic_id do paciente)
  const { error: saveError } = await supabase
    .from('anamneses')
    .upsert({
      patient_id: patient.id,
      clinic_id: patient.clinic_id,
      sections: sections,
      completed_at: new Date().toISOString()
    }, { onConflict: 'patient_id' });

  if (saveError) {
    console.error('Erro ao salvar anamnese pública:', saveError);
    return { error: 'Falha ao salvar os dados. Tente novamente.' };
  }

  return { success: true };
}
