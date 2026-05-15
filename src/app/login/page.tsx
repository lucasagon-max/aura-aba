'use client'

import { useState, Suspense, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { Brain, ArrowRight, Building2, User, Users, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import Link from 'next/link'
import { login, signup } from '@/app/auth/actions'

function LoginContent() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [planType, setPlanType] = useState<'individual' | 'clinic'>('individual')
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  function handleFormAction(formData: FormData) {
    startTransition(async () => {
      if (mode === 'login') {
        await login(formData)
      } else {
        await signup(formData)
      }
    })
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Lado Esquerdo - Decorativo */}
      <div className="hidden lg:flex w-1/2 bg-sky-500 items-center justify-center p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl" />
        
        <div className="max-w-md space-y-8 relative z-10">
          <div className="bg-white/20 p-4 rounded-2xl w-fit backdrop-blur-md">
            <Brain className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold leading-tight">
            Gestão Inteligente para Terapias ABA
          </h1>
          <p className="text-sky-100 text-lg">
            A plataforma completa para profissionais e clínicas que buscam excelência no acompanhamento terapêutico.
          </p>
          
          <div className="space-y-4 pt-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-sky-300" />
              <span>Registro ABC e DTT em tempo real</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-sky-300" />
              <span>Gestão de Metas PEI Dinâmicas</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-sky-300" />
              <span>Relatórios e Anamneses Digitais</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col space-y-2">
            <div className="lg:hidden flex items-center gap-2 mb-4">
              <div className="bg-sky-500 p-1.5 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Aura ABA</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              {mode === 'login' ? 'Bem-vindo de volta' : 'Comece sua jornada'}
            </h2>
            <p className="text-slate-500">
              {mode === 'login' 
                ? 'Entre na sua conta para gerenciar seus atendimentos.' 
                : 'Crie sua conta e otimize seus processos hoje mesmo.'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 animate-shake">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
            <button 
              type="button"
              disabled={isPending}
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'login' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Login
            </button>
            <button 
              type="button"
              disabled={isPending}
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'signup' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Criar Conta
            </button>
          </div>

          <form action={handleFormAction} className="space-y-5">
            <div className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">
                      Tipo de Perfil
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`cursor-pointer flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all ${planType === 'individual' ? 'border-sky-500 bg-sky-50' : 'border-slate-100 hover:border-slate-200'}`}>
                        <input 
                          type="radio" 
                          name="planType" 
                          value="individual" 
                          className="hidden" 
                          disabled={isPending}
                          onChange={() => setPlanType('individual')}
                          checked={planType === 'individual'}
                        />
                        <User className={`h-6 w-6 mb-2 ${planType === 'individual' ? 'text-sky-600' : 'text-slate-400'}`} />
                        <span className={`text-xs font-bold ${planType === 'individual' ? 'text-sky-700' : 'text-slate-500'}`}>Individual</span>
                      </label>
                      <label className={`cursor-pointer flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all ${planType === 'clinic' ? 'border-sky-500 bg-sky-50' : 'border-slate-100 hover:border-slate-200'}`}>
                        <input 
                          type="radio" 
                          name="planType" 
                          value="clinic" 
                          className="hidden" 
                          disabled={isPending}
                          onChange={() => setPlanType('clinic')}
                          checked={planType === 'clinic'}
                        />
                        <Users className={`h-6 w-6 mb-2 ${planType === 'clinic' ? 'text-sky-600' : 'text-slate-400'}`} />
                        <span className={`text-xs font-bold ${planType === 'clinic' ? 'text-sky-700' : 'text-slate-500'}`}>Clínica</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="clinicName" className="block text-sm font-bold text-slate-700 ml-1 mb-1">
                      {planType === 'individual' ? 'Nome do seu Espaço' : 'Nome da Clínica'}
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        id="clinicName"
                        name="clinicName"
                        type="text"
                        disabled={isPending}
                        required={mode === 'signup'}
                        className="block w-full rounded-xl border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all disabled:opacity-50"
                        placeholder="Ex: Clínica Aura"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 ml-1 mb-1">
                  E-mail Profissional
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  disabled={isPending}
                  required
                  className="block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all disabled:opacity-50"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between ml-1 mb-1">
                  <label htmlFor="password" className="block text-sm font-bold text-slate-700">
                    Senha
                  </label>
                  {mode === 'login' && (
                    <Link href="#" className="text-xs font-medium text-sky-600 hover:text-sky-700">
                      Esqueceu a senha?
                    </Link>
                  )}
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  disabled={isPending}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  required
                  className="block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-base font-bold text-white shadow-lg shadow-sky-100 hover:bg-sky-600 focus:outline-none transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processando...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Entrar no Sistema' : 'Criar Minha Conta'}</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Ao continuar, você concorda com nossos <Link href="#" className="underline">Termos de Serviço</Link> e <Link href="#" className="underline">Política de Privacidade</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
