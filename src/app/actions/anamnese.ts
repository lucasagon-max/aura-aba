'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveAnamnese(patientId: string, sections: any) {
  const supabase = await createClient();

  // Buscar o perfil para obter o clinic_id
  const { data: profile } = await supabase
    .from('profiles')
    .select('clinic_id')
    .single();

  if (!profile?.clinic_id) {
    return { error: 'Clínica não encontrada para o usuário.' };
  }

  const { error } = await supabase
    .from('anamneses')
    .upsert({
      patient_id: patientId,
      clinic_id: profile.clinic_id,
      sections: sections,
      completed_at: new Date().toISOString()
    }, { onConflict: 'patient_id' });

  if (error) {
    console.error('Erro ao salvar anamnese:', error);
    return { error: 'Falha ao salvar os dados.' };
  }

  revalidatePath(`/dashboard/pacientes/${patientId}/anamnese`);
  return { success: true };
}
