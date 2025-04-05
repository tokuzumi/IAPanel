import { StageContent } from '@/types';
import Image from 'next/image';

interface ImageContentProps {
  content: StageContent;
}

export function ImageContent({ content }: ImageContentProps) {
  const imageUrl = content.content;

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="relative w-full max-w-xl mx-auto aspect-video overflow-hidden rounded-lg border">
        <Image 
          src={imageUrl} 
          alt={content.title || "Imagem"} 
          fill
          className="object-contain"
        />
      </div>
      {content.title && (
        <p className="mt-4 text-sm text-muted-foreground text-center">
          {content.title}
        </p>
      )}
    </div>
  );
} 