# Documentação de Desenvolvimento - IA Panel

## Estrutura do Projeto

O projeto IA Panel é uma aplicação web moderna construída com Next.js, React, TypeScript e TailwindCSS. A estrutura principal do projeto está organizada da seguinte forma:

```
src/
├── app/
│   └── page.tsx                 # Página principal do dashboard
├── components/
│   ├── chat/
│   │   └── Chat.tsx            # Componente de chat
│   ├── sidebar/
│   │   └── Sidebar.tsx         # Barra lateral de navegação
│   └── stage/
│       └── Stage.tsx           # Painel lateral direito
├── store/
│   ├── chat.ts                 # Estado global do chat
│   ├── sidebar.ts              # Estado global da sidebar
│   └── stage.ts                # Estado global do stage
└── types/
    └── index.ts                # Definições de tipos
```

## Componentes Principais

### 1. Sidebar (`src/components/sidebar/Sidebar.tsx`)

O componente Sidebar é responsável pela navegação principal e gerenciamento de conversas.

**Características principais:**
- Menu expansível/retrátil (largura de 64px quando recolhido, 256px quando expandido)
- Lista de conversas
- Menu de configurações
- Perfil do usuário com logout
- Integração com NextAuth para autenticação

**Estados:**
- `isExpanded`: Controla a expansão/retração da sidebar
- `selectedConversationId`: Conversa atual selecionada
- `selectedMenuItem`: Item do menu selecionado
- `conversations`: Lista de conversas do usuário

**Melhorias recentes:**
- Ícones com cor apropriada quando selecionados
- Botão de toggle com animação de rotação
- Logout apenas visível quando expandido
- Espaçamentos consistentes com a referência do Claude AI

### 2. Chat (`src/components/chat/Chat.tsx`)

Componente central para interação com o usuário através de mensagens.

**Características principais:**
- Interface de chat em tempo real
- Campo de entrada de mensagem
- Histórico de mensagens
- Padding dinâmico baseado nos estados do Sidebar e Stage

**Estados:**
- `messages`: Array de mensagens
- `isLoading`: Estado de carregamento
- `title`: Título da conversa atual
- `input`: Valor do campo de entrada

**Melhorias recentes:**
- Implementação de função `getPaddingClasses()` para determinar o padding correto
- Quatro estados de padding diferentes para cada combinação de Sidebar e Stage
- Transições suaves entre os estados
- Centralização do conteúdo conforme necessário

### 3. Stage (`src/components/stage/Stage.tsx`)

Painel lateral direito para exibição de conteúdo contextual.

**Características principais:**
- Painel expansível/retrátil (largura de 40vw quando expandido, 0 quando recolhido)
- Conteúdo dinâmico baseado na seleção do menu
- Animações de transição
- Botão de toggle visível quando recolhido

**Estados:**
- `isExpanded`: Controla a expansão/retração do stage
- `content`: Conteúdo atual selecionado

**Melhorias recentes:**
- Botão de toggle na posição correta (direita centralizada)
- Botão de fechamento com ícone X
- Animação correta (direita para esquerda)
- Integração com o sistema de padding do Chat

## Desafios de Layout Resolvidos

### 1. Padding Responsivo do Chat

Implementamos uma solução elegante para o padding do Chat que se adapta dinamicamente:

```typescript
// Função para determinar as classes de padding
const getPaddingClasses = () => {
  // Ambos expandidos
  if (isSidebarExpanded && isStageExpanded) {
    return 'pl-4 pr-[40vw]'
  }
  // Apenas sidebar expandido
  if (isSidebarExpanded && !isStageExpanded) {
    return 'px-16'
  }
  // Ambos recolhidos
  if (!isSidebarExpanded && !isStageExpanded) {
    return 'px-24'
  }
  // Apenas stage expandido (sidebar recolhido)
  return 'pl-6 pr-[40vw]'
}
```

Esta solução garante que o conteúdo do Chat esteja sempre bem posicionado, independentemente do estado dos painéis laterais.

### 2. Animação do Stage

O Stage agora tem a animação correta, abrindo-se da direita para a esquerda:

```typescript
<aside className={`w-[40vw] h-full flex flex-col bg-secondary border-l 
  transform transition-transform duration-300 ease-in-out
  ${isExpanded ? 'translate-x-0' : 'translate-x-full'}`}>
```

O botão de toggle também foi ajustado para ficar na posição correta:

```typescript
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
```

### 3. Sidebar Responsiva

A Sidebar agora comporta-se corretamente em todos os estados:

```typescript
<aside className={`h-full flex flex-col bg-secondary border-r 
  transition-all duration-300 ease-in-out
  ${isExpanded ? 'w-64' : 'w-16'}`}>
```

Quando um item de menu é selecionado, ele mantém sua visibilidade:

```typescript
<item.icon className={`h-5 w-5 flex-shrink-0 
  ${selectedMenuItem === item.id ? 'text-foreground' : 'text-muted-foreground'}`} />
```

## Próximos Passos

1. Resolver os erros de linter relacionados aos imports do store
2. Implementar testes para garantir o funcionamento correto das animações
3. Adicionar documentação de tipos para melhorar a manutenibilidade
4. Revisar a responsividade em diferentes tamanhos de tela
5. Implementar persistência dos estados de layout
6. Adicionar suporte à acessibilidade (ARIA, navegação por teclado)

## Notas Técnicas

- Os erros de linter atuais estão relacionados à configuração do TypeScript e paths
- As animações utilizam classes do TailwindCSS para transições suaves
- O estado global é gerenciado através de stores customizadas
- A autenticação é implementada usando NextAuth.js

Consulte o arquivo `PADDING_CHALLENGE.md` para uma documentação detalhada sobre a solução do desafio de padding responsivo. 