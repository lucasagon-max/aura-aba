import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import AnamneseForm from "@/components/anamnese/AnamneseForm";

export default async function AnamnesePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: patient, error: pError } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single();

  const { data: anamnese } = await supabase
    .from('anamneses')
    .select('*')
    .eq('patient_id', id)
    .single();

  if (pError || !patient) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/pacientes"
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Anamnese Digital</h2>
          <p className="text-slate-500">Paciente: <span className="font-semibold text-slate-700">{patient.name}</span></p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-8">
        <AnamneseForm patient={patient} initialData={anamnese?.sections} />
      </div>
    </div>
  );
}


