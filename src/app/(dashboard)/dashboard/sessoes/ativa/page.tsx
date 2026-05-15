"use client";

import { 
  Play, 
  Square, 
  Plus, 
  History, 
  Save, 
  ChevronRight,
  Info
} from "lucide-react";
import { useState } from "react";

export default function ActiveSessionPage() {
  const [sessionType, setSessionType] = useState<"ABC" | "DTT">("ABC");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header com Timer */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-lg">
            PA
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Sessão Ativa: Pedro Alcantara</h2>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <Info className="h-3 w-3" /> TEA Nível 1 • Foco em Linguagem
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-slate-900">00:42:15</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Duração</div>
          </div>
          <div className="flex gap-2">
            <button className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
              <History className="h-5 w-5" />
            </button>
            <button className="h-10 px-6 rounded-full bg-rose-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all active:scale-95">
              <Square className="h-4 w-4" />
              Encerrar
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Painel de Registro (Esquerda/Centro) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Alternador de Tipo de Registro */}
          <div className="flex p-1 bg-slate-100 rounded-xl w-fit">
            <button 
              onClick={() => setSessionType("ABC")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                sessionType === "ABC" ? "bg-white text-sky-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Registro ABC
            </button>
            <button 
              onClick={() => setSessionType("DTT")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                sessionType === "DTT" ? "bg-white text-sky-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Tentativas DTT
            </button>
          </div>

          {sessionType === "ABC" ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                Novo Episódio ABC
                <span className="text-xs font-normal text-slate-400">Registrado às 14:42</span>
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Antecedente</label>
                  <textarea 
                    placeholder="O que aconteceu antes do comportamento?"
                    className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Comportamento</label>
                  <textarea 
                    placeholder="Descreva o comportamento observado..."
                    className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Consequência</label>
                  <textarea 
                    placeholder="Qual foi a reação/consequência?"
                    className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all min-h-[80px]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
                <button className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all">Limpar</button>
                <button className="px-8 py-2.5 rounded-xl bg-sky-500 text-white font-bold shadow-lg shadow-sky-200 hover:bg-sky-600 transition-all active:scale-95 flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Registro
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4">
               <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900">Programas DTT em Execução</h3>
                  <button className="text-sky-500 text-sm font-bold flex items-center gap-1 hover:underline">
                    <Plus className="h-4 w-4" /> Adicionar Programa
                  </button>
               </div>

               <div className="space-y-6">
                  {["Contato Visual", "Imitação Motora"].map((prog) => (
                    <div key={prog} className="border border-slate-100 rounded-2xl p-6 bg-slate-50/30">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h4 className="font-bold text-slate-900">{prog}</h4>
                          <p className="text-xs text-slate-500">Alvo: 80% de acerto independente</p>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((t) => (
                            <div key={t} className="h-2 w-4 rounded-full bg-slate-200" />
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <button className="p-4 rounded-xl bg-green-500 text-white font-bold shadow-lg shadow-green-100 hover:bg-green-600 active:scale-95 transition-all text-sm">
                          Independente
                        </button>
                        <button className="p-4 rounded-xl bg-amber-500 text-white font-bold shadow-lg shadow-amber-100 hover:bg-amber-600 active:scale-95 transition-all text-sm">
                          Ajuda Parcial
                        </button>
                        <button className="p-4 rounded-xl bg-sky-500 text-white font-bold shadow-lg shadow-sky-100 hover:bg-sky-600 active:scale-95 transition-all text-sm">
                          Ajuda Total
                        </button>
                        <button className="p-4 rounded-xl bg-rose-500 text-white font-bold shadow-lg shadow-rose-100 hover:bg-rose-600 active:scale-95 transition-all text-sm">
                          Erro
                        </button>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>

        {/* Sidebar de Apoio (Direita) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-sky-500" />
              Metas do PEI (Foco)
            </h3>
            <div className="space-y-3">
              {[
                "Manter contato visual por 3 segundos",
                "Responder ao chamado pelo nome",
                "Sentar em cadeira por 5 minutos"
              ].map((meta, i) => (
                <div key={i} className="flex gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
                  <div className="h-5 w-5 rounded-full bg-white border border-slate-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">
                    {i + 1}
                  </div>
                  {meta}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-sky-500 to-indigo-600 p-6 rounded-2xl shadow-xl shadow-sky-200 text-white">
            <h3 className="font-bold mb-2">Dica do Especialista</h3>
            <p className="text-sm text-sky-50/80 leading-relaxed">
              "Para registros ABC, foque no comportamento observável. Evite interpretações subjetivas como 'ele estava bravo'."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
