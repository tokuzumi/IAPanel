# Documentação Central do IA Panel

## Visão Geral

IA Panel é uma aplicação web moderna para interações de chat com IA, inspirada no layout do Claude AI. O sistema possui uma interface responsiva e elegante com três componentes principais que interagem harmoniosamente:

- **Sidebar (esquerda)** - Menu de navegação expansível/retrátil
- **Chat (centro)** - Interface principal de interação com o usuário
- **Stage (direita)** - Painel lateral para conteúdo contextual

## Estrutura do Projeto

```
src/
├── app/                      # Rotas e layouts do Next.js
├── components/               # Componentes React
│   ├── chat/                 # Componente de chat
│   ├── sidebar/              # Barra lateral de navegação
│   └── stage/                # Painel lateral direito
│       └── content/          # Componentes de conteúdo do Stage
├── lib/                      # Utilitários e helpers
│   ├── auth/                 # Configuração de autenticação
│   └── api.ts                # Serviços de API e webhook
├── store/                    # Gerenciamento de estado global
│   ├── chat.ts               # Estado do chat
│   ├── sidebar.ts            # Estado da sidebar
│   └── stage.ts              # Estado do stage
└── types/                    # Definições de tipos TypeScript
```

## Stack Tecnológico

- **Frontend**: Next.js 14, React 18, TypeScript
- **Estilização**: TailwindCSS, Shadcn/UI
- **Gerenciamento de Estado**: Zustand
- **Autenticação**: NextAuth.js
- **Banco de Dados**: PostgreSQL/MySQL com Prisma
- **Integração Externa**: Webhook n8n
- **Hospedagem**: Vercel

## Componentes Principais e Suas Soluções

### 1. Sidebar

**Configurações Ideais**:
- Largura de 64px quando recolhido e 256px (w-64) quando expandido
- Botão de toggle no header para expandir/recolher
- Navegação com ícones centralizados quando recolhido
- Botão de logout oculto quando recolhido

**Implementação**:
```typescript
<aside className={`h-full flex flex-col bg-secondary border-r 
  transition-all duration-300 ease-in-out
  ${isExpanded ? 'w-64' : 'w-16'}`}>
  
  {/* Conteúdo da sidebar */}
  
  {/* Footer condicional com o botão de logout */}
  <div className="h-16 flex items-center justify-between px-4 border-t">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-background">
        {getUserInitials()}
      </div>
      {isExpanded && (
        <div className="flex-1">
          <div className="font-medium">{getFormattedName()}</div>
        </div>
      )}
    </div>
    {isExpanded && (
      <button onClick={handleLogout} 
        className="p-2 hover:bg-destructive/10 rounded-md">
        <LogOut className="h-5 w-5" />
      </button>
    )}
  </div>
</aside>
```

### 2. Stage

**Configurações Ideais**:
- Largura de 40% da viewport (w-[40vw]) quando expandido
- Completamente oculto quando recolhido
- Botão de toggle posicionado na borda direita, centralizado verticalmente
- Animação da direita para a esquerda
- Suporte para diferentes tipos de conteúdo: imagens, listas e formulários

**Implementação**:
```typescript
<div className="fixed top-0 right-0 h-full">
  {!isExpanded && (
    <button
      onClick={() => setExpanded(true)}
      className="fixed right-0 top-1/2 -translate-y-1/2
        w-6 h-12 flex items-center justify-center 
        bg-secondary border-l border-y rounded-l-md 
        hover:bg-primary/10 
        transition-all duration-300 ease-in-out
        z-50">
      <ChevronLeft className="h-5 w-5" />
    </button>
  )}
  
  <aside className={`w-[40vw] h-full flex flex-col bg-secondary border-l 
    transform transition-transform duration-300 ease-in-out
    ${isExpanded ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className="h-14 flex items-center justify-between px-4 border-b">
      <span className="font-semibold text-lg">{content?.title || 'Stage'}</span>
      <button
        onClick={() => setExpanded(false)}
        className="p-1.5 hover:bg-destructive/10 rounded-md">
        <X className="h-5 w-5" />
      </button>
    </div>

    <div className="flex-1 overflow-y-auto">
      <StageContent content={content} />
    </div>
  </aside>
</div>
```

### 3. Chat

**Configurações Ideais**:
- Padding dinâmico baseado nos estados do Sidebar e Stage
- Centralização automática do conteúdo
- Transições suaves entre estados
- Integração com webhook para processamento de mensagens

**Implementação**:
```typescript
// Função para determinar as classes de padding
const getPaddingClasses = () => {
  // Ambos expandidos
  if (isSidebarExpanded && isStageExpanded) {
    return 'pl-4 pr-[40vw]'
  }
  // Apenas sidebar expandido
  if (isSidebarExpanded && !isStageExpanded) {
    return 'px-[10%]'
  }
  // Ambos recolhidos
  if (!isSidebarExpanded && !isStageExpanded) {
    return 'px-[20%]'
  }
  // Apenas stage expandido (sidebar recolhido)
  return 'pl-6 pr-[40vw]'
}

// Uso na definição do componente
<main className={`h-full flex flex-col bg-background 
  transition-all duration-300 ease-in-out
  ${getPaddingClasses()}`}>
  {/* Conteúdo do chat */}
</main>
```

## Integração com Webhook n8n

### Visão Geral
O sistema está integrado com um webhook n8n para processamento de mensagens e exibição de conteúdo dinâmico no Stage. O endpoint do webhook é:

```
https://webhook.neversleep.com.br/webhook/IAPnel
```

### Fluxo de Comunicação
1. Usuário envia uma mensagem pelo Chat
2. A mensagem é enviada para o webhook n8n
3. O webhook processa a mensagem e retorna:
   - Uma resposta textual
   - Opcionalmente, uma função a ser executada no Stage

### Estrutura da Requisição
```typescript
interface WebhookRequest {
  content: string;         // Conteúdo da mensagem do usuário
  conversation_id?: string; // ID da conversa (opcional)
  user_id?: string;        // ID do usuário (opcional)
}
```

### Estrutura da Resposta

A resposta do webhook pode vir em dois formatos possíveis:

#### 1. Formato Padrão
```typescript
interface WebhookResponse {
  message: {
    content: string;       // Conteúdo da resposta
    role: string;          // Papel da mensagem (assistant, system)
  };
  function?: {
    name: string;          // Nome da função a ser executada
    parameters: Record<string, any>; // Parâmetros da função
  };
}
```

#### 2. Formato AgenteIA (processado automaticamente)
```typescript
[
  {
    "output": {
      "message": {
        "content": string,  // Conteúdo da resposta
        "role": string      // Papel da mensagem
      },
      "function"?: {
        "name": string,     // Nome da função
        "parameters": object // Parâmetros da função
      }
    }
  }
]
```

O sistema detecta automaticamente o formato e normaliza internamente para o formato padrão.

### Funções Suportadas
O Stage pode renderizar diferentes tipos de conteúdo com base na função recebida:

1. **showImage** - Exibe uma imagem
   ```typescript
   {
     "name": "showImage",
     "parameters": {
       "title": "Título da imagem",
       "url": "https://example.com/image.jpg"
     }
   }
   ```

2. **showList** - Exibe uma lista de itens
   ```typescript
   {
     "name": "showList",
     "parameters": {
       "title": "Título da lista",
       "items": [
         "Item 1",
         "Item 2",
         { "title": "Item com título", "description": "Descrição detalhada" }
       ]
     }
   }
   ```

3. **showForm** - Exibe um formulário interativo
   ```typescript
   {
     "name": "showForm",
     "parameters": {
       "title": "Título do formulário",
       "fields": [
         {
           "id": "name",
           "label": "Nome",
           "type": "text",
           "placeholder": "Digite seu nome",
           "required": true
         },
         {
           "id": "email",
           "label": "Email",
           "type": "email",
           "placeholder": "Digite seu email"
         },
         {
           "id": "options",
           "label": "Opções",
           "type": "select",
           "options": [
             { "value": "1", "label": "Opção 1" },
             { "value": "2", "label": "Opção 2" }
           ]
         }
       ]
     }
   }
   ```

4. **showPage** - Exibe uma página com título, imagem e descrição
   ```typescript
   {
     "name": "showPage",
     "parameters": {
       "title": "Título da página",
       "image_url": "https://example.com/image.jpg",
       "description": "Descrição detalhada da página. Pode ser uma string simples ou um array de parágrafos."
       // Ou usando array para múltiplos parágrafos:
       // "description": [
       //   "Primeiro parágrafo da descrição.",
       //   "Segundo parágrafo com mais detalhes."
       // ]
     }
   }
   ```

## Criando Novas Funções para o Stage

Para adicionar uma nova função ao Stage (por exemplo, uma função chamada `showCustomContent`), siga os passos abaixo:

### 1. Criar o Componente de Conteúdo

Primeiro, crie um novo componente React na pasta `src/components/stage/content/` para renderizar o novo tipo de conteúdo:

```typescript
// src/components/stage/content/CustomContent.tsx
import { StageContent } from '@/types';

interface CustomContentProps {
  content: StageContent;
}

export function CustomContent({ content }: CustomContentProps) {
  // Desestruture os parâmetros específicos do seu conteúdo
  const { title, customParam1, customParam2 } = content.content;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {/* Renderize seu conteúdo personalizado aqui */}
      <div className="my-4">
        <p>Parâmetro 1: {customParam1}</p>
        <p>Parâmetro 2: {customParam2}</p>
      </div>
    </div>
  );
}
```

### 2. Atualizar o Componente StageContent

Adicione o novo tipo de conteúdo ao componente `StageContent.tsx`:

```typescript
// src/components/stage/StageContent.tsx
import { CustomContent } from './content/CustomContent';

// ... código existente ...

// Dentro da função de switch/case:
switch (content.type) {
  // ... outros casos existentes ...
  case 'custom':
    return <CustomContent content={content} />;
  default:
    // ... código existente ...
}
```

### 3. Atualizar a Lógica de Execução de Funções

Adicione o handler para a nova função no store do chat (`src/store/chat.ts`):

```typescript
// src/store/chat.ts
// Na função executeStageFunction:
function executeStageFunction(name: string, parameters: Record<string, any>) {
  const stageStore = useStageStore.getState();
  
  switch (name) {
    // ... casos existentes ...
    
    case 'showCustomContent':
      stageStore.setContent({
        id: Date.now().toString(),
        type: 'custom',  // Este deve coincidir com o case no StageContent.tsx
        title: parameters.title || 'Conteúdo Personalizado',
        content: {
          title: parameters.title || '',
          customParam1: parameters.customParam1 || '',
          customParam2: parameters.customParam2 || '',
          // Adicione mais parâmetros conforme necessário
        },
      });
      break;
      
    // ... default case ...
  }
}
```

### 4. Atualizar a Documentação

Adicione a nova função à documentação no `DOCUMENTACAO_CENTRAL.md`:

```typescript
// Nova entrada na seção "Funções Suportadas"
{
  "name": "showCustomContent",
  "parameters": {
    "title": "Título do conteúdo personalizado",
    "customParam1": "Valor do parâmetro 1",
    "customParam2": "Valor do parâmetro 2"
  }
}
```

### 5. Testes e Validação

- Teste a nova função enviando uma mensagem que acione o webhook
- Verifique se o webhook retorna a função correta
- Confirme que o conteúdo é renderizado adequadamente no Stage

### Melhores Práticas

1. **Tipagem**: Mantenha todas as propriedades tipadas corretamente
2. **Validação**: Adicione validação de parâmetros e tratamento de casos em que parâmetros obrigatórios estão ausentes
3. **Design Consistente**: Mantenha a aparência visual consistente com outros componentes do Stage
4. **Responsividade**: Garanta que o novo componente seja responsivo e funcione bem em diferentes tamanhos de tela
5. **Documentação**: Documente bem a função, incluindo exemplos de uso e descrições de parâmetros

## Desafios Superados

### 1. Problema de Layout Dinâmico

**Desafio**: Criar um layout que se adapte harmoniosamente aos diferentes estados dos painéis laterais.

**Solução**: Implementamos um sistema dinâmico de padding para o Chat que se ajusta automaticamente com base nos estados da Sidebar e do Stage. Utilizamos quatro configurações distintas para cada combinação possível de estados.

### 2. Animações Consistentes

**Desafio**: Garantir que todas as transições entre estados sejam suaves e consistentes.

**Solução**: Aplicamos transições uniformes com duração de 300ms e curva de easing `ease-in-out` em todos os componentes. Utilizamos `transform` para animações de posicionamento, evitando reflows desnecessários.

### 3. Posicionamento de Elementos

**Desafio**: Posicionar corretamente os botões de toggle e garantir a visibilidade adequada em todos os estados.

**Solução**: Utilizamos posicionamento absoluto para os botões de toggle, com z-index adequados para garantir sua acessibilidade. Implementamos lógica condicional para mostrar/ocultar elementos com base no estado de expansão dos painéis.

### 4. Integração com Webhook

**Desafio**: Implementar a comunicação com o webhook n8n e executar funções no Stage.

**Solução**: Criamos um serviço de API dedicado para comunicação com o webhook e funções específicas para processar as respostas. Implementamos um sistema de renderização condicional no Stage para exibir diferentes tipos de conteúdo.

## Resultados Alcançados

A implementação final agora atende a todos os requisitos:

1. **Layout Responsivo**: Interface que se adapta dinamicamente às mudanças de estado dos painéis
2. **Transições Suaves**: Todas as animações são fluidas e consistentes (300ms)
3. **Comportamento Intuitivo**: Os painéis interagem de forma harmoniosa e previsível
4. **Design Profissional**: Estética clean e moderna, seguindo princípios de UI/UX contemporâneos
5. **Funcionalidade Completa**: Integração com webhook para processamento de mensagens e exibição de conteúdo dinâmico

## Próximos Passos

1. **Resolver Erros de Linter**: Corrigir problemas relacionados à configuração de TypeScript e paths
2. **Implementar Persistência de Conversas**: Salvar o histórico de conversas em banco de dados
3. **Expandir Tipos de Conteúdo no Stage**: Adicionar suporte para vídeos, código, mapas, etc.
4. **Melhorar Tratamento de Erros**: Implementar retry e feedback visual para falhas de comunicação
5. **Implementar Testes**: Adicionar testes automatizados para garantir o funcionamento correto das interações 