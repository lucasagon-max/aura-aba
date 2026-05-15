'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const clinicName = formData.get('clinicName') as string
  const planType = (formData.get('planType') as string) || 'trial'

  // 1. Criar o usuário no Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError || !authData.user) {
    redirect(`/login?error=${encodeURIComponent(authError?.message || 'Erro ao criar conta')}`)
  }

  // 2. Criar a Clínica (Tenant)
  const { data: clinicData, error: clinicError } = await supabase
    .from('clinics')
    .insert({
      name: clinicName,
      plan_type: planType
    })
    .select()
    .single()

  if (clinicError) {
    // Nota: Em produção, você pode querer deletar o usuário do auth se isso falhar
    console.error('Erro ao criar clínica:', clinicError)
    redirect(`/login?error=${encodeURIComponent('Erro ao configurar sua clínica. Entre em contato com o suporte.')}`)
  }

  // 3. Criar o Perfil do Usuário vinculado à Clínica
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user.id,
      clinic_id: clinicData.id,
      full_name: email.split('@')[0], // Nome provisório
      role: 'admin'
    })

  if (profileError) {
    console.error('Erro ao criar perfil:', profileError)
    redirect(`/login?error=${encodeURIComponent('Erro ao criar perfil de usuário.')}`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
