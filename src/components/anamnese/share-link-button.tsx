'use client'

import { useState } from 'react';
import { Share2, Check, Copy, MessageCircle } from 'lucide-react';
import { getShareLink } from '@/app/actions/anamnese-externa';

interface ShareLinkButtonProps {
  patientId: string;
  patientName: string;
}

export function ShareLinkButton({ patientId, patientName }: ShareLinkButtonProps) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await getShareLink(patientId);
    if (result.token) {
      setToken(result.token);
    }
    setLoading(false);
  };

  const shareUrl = token ? `${window.location.origin}/anamnese-externa/${token}` : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openWhatsApp = () => {
    const message = `Olá! Segue o link para preenchimento da Anamnese Inicial de ${patientName}: ${shareUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!token) {
    return (
      <button 
        onClick={handleGenerate}
        disabled={loading}
        className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-all text-sm font-medium border border-slate-200 disabled:opacity-50"
      >
        <Share2 size={16} />
        {loading ? 'Gerando...' : 'Gerar Link para Pais'}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-white border border-indigo-200 rounded-lg px-3 py-2 text-xs font-mono text-indigo-600 truncate max-w-[200px]">
        {shareUrl}
      </div>
      <button 
        onClick={copyToClipboard}
        className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
        title="Copiar link"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <button 
        onClick={openWhatsApp}
        className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
        title="Enviar pelo WhatsApp"
      >
        <MessageCircle size={16} />
      </button>
      <button 
        onClick={() => setToken(null)}
        className="text-[10px] text-slate-400 hover:text-slate-600 ml-2"
      >
        Ocultar
      </button>
    </div>
  );
}
