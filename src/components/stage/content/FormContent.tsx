import { StageContent } from '@/types';
import { useState } from 'react';

interface FormContentProps {
  content: StageContent;
}

type FieldType = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
};

export function FormContent({ content }: FormContentProps) {
  const fields = content.content || [];
  const [formData, setFormData] = useState<Record<string, string>>({});

  if (!Array.isArray(fields) || fields.length === 0) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">Nenhum campo definido para este formulário.</p>
      </div>
    );
  }

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    alert('Formulário enviado com sucesso!');
  };

  return (
    <div className="p-4">
      {content.title && (
        <h3 className="text-lg font-medium mb-4">{content.title}</h3>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field: FieldType) => (
          <div key={field.id} className="flex flex-col gap-1">
            <label 
              htmlFor={field.id} 
              className="text-sm font-medium"
            >
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                value={formData[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className="p-2 border rounded-md bg-background"
                rows={4}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.id}
                value={formData[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                required={field.required}
                className="p-2 border rounded-md bg-background"
              >
                <option value="">Selecione...</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.id}
                type={field.type}
                value={formData[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className="p-2 border rounded-md bg-background"
              />
            )}
          </div>
        ))}
        
        <div className="pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
} 