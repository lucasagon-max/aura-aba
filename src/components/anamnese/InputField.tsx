interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  isTextArea?: boolean;
}

export function InputField({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  required,
  options,
  isTextArea
}: InputFieldProps) {
  const baseClasses = "w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all bg-white text-slate-900";
  
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      
      {isTextArea ? (
        <textarea
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          className={baseClasses}
        />
      ) : options ? (
        <select
          name={name}
          value={value || ''}
          onChange={onChange}
          className={baseClasses}
        >
          <option value="">Selecione...</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
    </div>
  );
}
