'use client'

import { useState } from "react";
import { 
  User, 
  Users, 
  AlertCircle, 
  Activity, 
  Heart, 
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  Save,
  CheckCircle2
} from "lucide-react";
import { saveAnamnese } from "@/app/actions/anamnese";

// Importando componentes das etapas
import IdentificacaoStep from "./IdentificacaoStep";
import FamiliaStep from "./FamiliaStep";
import QueixaStep from "./QueixaStep";
import DesenvolvimentoStep from "./DesenvolvimentoStep";
import SaudeStep from "./SaudeStep";
import EscolarStep from "./EscolarStep";

const STEPS = [
  { id: 'identificacao', label: 'Identificação', icon: User, Component: IdentificacaoStep },
  { id: 'familia', label: 'Família', icon: Users, Component: FamiliaStep },
  { id: 'queixa', label: 'Queixa', icon: AlertCircle, Component: QueixaStep },
  { id: 'desenvolvimento', label: 'Desenvolvimento', icon: Activity, Component: DesenvolvimentoStep },
  { id: 'saude', label: 'Saúde', icon: Heart, Component: SaudeStep },
  { id: 'escolar', label: 'Escolar', icon: GraduationCap, Component: EscolarStep },
];

export default function AnamneseForm({ patient, initialData }: { patient: any, initialData?: any }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState(initialData || {
    identificacao: {
      nome: patient.name,
      data_nascimento: patient.birth_date,
      sexo: patient.gender || '',
      escola: patient.school || '',
      ano_escolar: patient.school_year || ''
    },
    familia: {},
    queixa: {},
    desenvolvimento: {},
    saude: {},
    escolar: {}
  });

  const handleFieldChange = (section: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await saveAnamnese(patient.id, formData);
    setIsSaving(false);
    
    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      alert(result.error || "Ocorreu um erro ao salvar.");
    }
  };

  const ActiveStepComponent = STEPS[currentStep].Component;

  return (
    <div className="space-y-8 relative">
      {/* Toast de Sucesso */}
      {showSuccess && (
        <div className="fixed top-24 right-8 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 z-50">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-bold">Anamnese salva com sucesso!</span>
        </div>
      )}

      {/* Stepper Progress */}
      <div className="flex justify-between items-center relative px-2">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-10" />
        
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <button 
                onClick={() => setCurrentStep(index)}
                className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                  isActive 
                    ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-200" 
                    : isCompleted 
                      ? "bg-green-500 border-green-500 text-white" 
                      : "bg-white border-slate-200 text-slate-400"
                }`}
              >
                {isCompleted ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </button>
              <span className={`text-[10px] font-bold uppercase tracking-tight ${
                isActive ? "text-sky-600" : isCompleted ? "text-green-600" : "text-slate-400"
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Form Content Area */}
      <div className="min-h-[400px] py-4">
        <div className="bg-slate-50/50 rounded-2xl p-8 border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
              {(() => {
                const Icon = STEPS[currentStep].icon;
                return <Icon className="h-6 w-6 text-sky-500" />;
              })()}
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              {STEPS[currentStep].label}
            </h3>
          </div>
          
          <ActiveStepComponent 
            data={formData[STEPS[currentStep].id] || {}} 
            onChange={handleFieldChange} 
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-slate-100">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all ${
            currentStep === 0 
              ? "text-slate-300 cursor-not-allowed" 
              : "text-slate-600 hover:bg-slate-100 active:scale-95"
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
          Anterior
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all border-2 ${
              isSaving 
                ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                : "border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-95"
            }`}
          >
            <Save className="h-5 w-5" />
            {isSaving ? "Salvando..." : "Salvar Rascunho"}
          </button>

          {currentStep === STEPS.length - 1 ? (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-green-500 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-100 active:scale-95"
            >
              <Save className="h-5 w-5" />
              Finalizar
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 bg-sky-500 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-sky-600 transition-all shadow-lg shadow-sky-100 active:scale-95"
            >
              Próximo
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
