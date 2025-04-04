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
├── lib/                      # Utilitários e helpers
│   └── auth/                 # Configuração de autenticação
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
    {/* Conteúdo do stage */}
  </aside>
</div>
```

### 3. Chat

**Configurações Ideais**:
- Padding dinâmico baseado nos estados do Sidebar e Stage
- Centralização automática do conteúdo
- Transições suaves entre estados

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

## Resultados Alcançados

A implementação final agora atende a todos os requisitos de design:

1. **Layout Responsivo**: Interface que se adapta dinamicamente às mudanças de estado dos painéis
2. **Transições Suaves**: Todas as animações são fluidas e consistentes (300ms)
3. **Comportamento Intuitivo**: Os painéis interagem de forma harmoniosa e previsível
4. **Design Profissional**: Estética clean e moderna, seguindo princípios de UI/UX contemporâneos
5. **Funcionamento Correto**: Todas as interações funcionam conforme esperado em diferentes cenários

## Próximos Passos

1. **Resolver Erros de Linter**: Corrigir problemas relacionados à configuração de TypeScript e paths
2. **Implementar Testes**: Adicionar testes automatizados para garantir o funcionamento correto das interações
3. **Breakpoints Responsivos**: Ajustar o layout para diferentes tamanhos de tela
4. **Persistência de Estado**: Salvar preferências de layout do usuário entre sessões
5. **Acessibilidade**: Implementar navegação por teclado e atributos ARIA 