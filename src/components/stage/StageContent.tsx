import { StageContent as StageContentType } from '@/types';
import { ImageContent } from './content/ImageContent';
import { ListContent } from './content/ListContent';
import { FormContent } from './content/FormContent';
import { PageContent } from './content/PageContent';

interface StageContentProps {
  content: StageContentType | null;
}

/**
 * Componente responsável por renderizar diferentes tipos de conteúdo no Stage
 * baseado no tipo de conteúdo recebido
 */
export function StageContent({ content }: StageContentProps) {
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <p className="text-muted-foreground">
          Nenhum conteúdo para exibir no momento.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          O conteúdo será exibido aqui quando disponível.
        </p>
      </div>
    );
  }

  // Renderiza o conteúdo baseado no tipo
  switch (content.type) {
    case 'image':
      return <ImageContent content={content} />;
    case 'list':
      return <ListContent content={content} />;
    case 'form':
      return <FormContent content={content} />;
    case 'page':
      return <PageContent content={content} />;
    default:
      return (
        <div className="p-4">
          <p className="text-muted-foreground mb-2">
            Conteúdo de tipo desconhecido: {content.type}
          </p>
          <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">
            {JSON.stringify(content.content, null, 2)}
          </pre>
        </div>
      );
  }
} 