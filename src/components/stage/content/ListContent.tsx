import { StageContent } from '@/types';

interface ListContentProps {
  content: StageContent;
}

export function ListContent({ content }: ListContentProps) {
  const items = content.content || [];

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">Nenhum item na lista.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {content.title && (
        <h3 className="text-lg font-medium mb-4">{content.title}</h3>
      )}
      
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="bg-background rounded-md p-3 border">
            {typeof item === 'string' ? (
              <span>{item}</span>
            ) : (
              <>
                {item.title && (
                  <h4 className="font-medium">{item.title}</h4>
                )}
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 