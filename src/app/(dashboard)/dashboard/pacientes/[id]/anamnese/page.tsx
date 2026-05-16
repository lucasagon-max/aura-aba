import { createClient } from "@/utils/supabase/server";
import { saveAnamnese } from "@/app/actions/anamnese";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnamneseForm } from "@/components/anamnese/anamnese-form";
import { ShareLinkButton } from "@/components/anamnese/share-link-button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnamnesePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: patient } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single();

  if (!patient) notFound();

  const { data: anamnese } = await supabase
    .from('anamneses')
    .select('*')
    .eq('patient_id', id)
    .single();

  const initialSections = anamnese?.sections || {};

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
            <Link href="/dashboard/pacientes" className="hover:text-indigo-600 flex items-center gap-1 transition-colors">
              <ArrowLeft size={14} /> Pacientes
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{patient.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Anamnese Inicial</h1>
          <p className="text-slate-500">Histórico clínico e desenvolvimento.</p>
        </div>

        <ShareLinkButton patientId={id} patientName={patient.name} />
      </div>

      <AnamneseForm 
        initialData={initialSections} 
        onSubmit={async (data) => {
          'use server'
          await saveAnamnese(id, data);
        }} 
      />
    </div>
  );
}
