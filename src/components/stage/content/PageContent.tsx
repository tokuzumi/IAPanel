import { StageContent } from '@/types';
import Image from 'next/image';

interface PageContentProps {
  content: StageContent;
}

export function PageContent({ content }: PageContentProps) {
  const { title, image_url, description } = content.content;

  return (
    <div className="p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      {image_url && (
        <div className="relative w-full aspect-video mb-6 overflow-hidden rounded-lg border">
          <Image 
            src={image_url} 
            alt={title || "Imagem da página"} 
            fill
            className="object-cover"
          />
        </div>
      )}
      
      {description && (
        <div className="prose dark:prose-invert max-w-none">
          {typeof description === 'string' ? (
            <p>{description}</p>
          ) : (
            // Se a descrição for um array, renderiza cada parte como um parágrafo
            Array.isArray(description) && description.map((para, idx) => (
              <p key={idx} className="mb-4">{para}</p>
            ))
          )}
        </div>
      )}
    </div>
  );
} 