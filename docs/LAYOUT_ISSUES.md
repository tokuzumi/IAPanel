# Problemas de Layout e Soluções - IA Panel

## Visão Geral

O dashboard do IA Panel é composto por três componentes principais que precisam interagir harmoniosamente:
- Sidebar (esquerda)
- Chat (centro)
- Stage (direita)

## Problemas Identificados

### 1. Sidebar

#### Problema
- Quando a sidebar está colapsada (w-16), o botão de logout ainda está visível
- O espaço para ícones não está consistente
- A transição entre estados expandido/colapsado não está totalmente suave

#### Solução Implementada
```typescript
// Sidebar.tsx
<aside className={`h-full flex flex-col bg-secondary border-r 
  transition-all duration-300 ease-in-out
  ${isExpanded ? 'w-1/5' : 'w-16'}`}>
  
  {/* Footer com logout condicional */}
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

#### Problema
- A animação de entrada/saída está incorreta (deve ser da direita para a esquerda)
- O componente não fica totalmente oculto quando fechado
- O botão de toggle não está posicionado corretamente
- A transição não está suave

#### Solução Implementada
```typescript
// Stage.tsx
<div className="relative">
  {!isExpanded && (
    <button onClick={() => setExpanded(true)}
      className="absolute right-0 top-1/2 -translate-y-1/2 
        w-6 h-12 flex items-center justify-center 
        bg-secondary border-l border-y rounded-l-md 
        hover:bg-primary/10 
        transition-all duration-300 ease-in-out">
      <ChevronLeft className="h-5 w-5" />
    </button>
  )}
  <aside className={`w-[40%] h-full flex flex-col bg-secondary border-l 
    transition-all duration-300 ease-in-out transform
    ${isExpanded ? 'translate-x-0' : 'translate-x-full'}`}>
    {/* ... conteúdo ... */}
  </aside>
</div>
```

### 3. Chat

#### Problema
- O componente não se ajusta corretamente quando o Stage expande
- As transições não são suaves
- O layout quebra em algumas resoluções

#### Solução Implementada
```typescript
// Chat.tsx
<div className={`flex-1 h-full flex flex-col bg-background 
  transition-all duration-300 ease-in-out
  ${isStageExpanded ? 'mr-[40%]' : ''}`}>
  {/* ... conteúdo ... */}
</div>
```

## Considerações de Layout

### Responsividade
- A sidebar ocupa 20% da tela quando expandida (w-1/5)
- O stage ocupa 40% da tela quando expandido (w-[40%])
- O chat se ajusta dinamicamente ao espaço restante (flex-1)

### Animações
- Todas as transições usam `duration-300` e `ease-in-out`
- Transform é usado para animações de posicionamento
- As transições são sincronizadas entre componentes

### Z-Index
- Sidebar: z-index base
- Chat: z-index base
- Stage: z-index elevado quando expandido
- Botões de toggle: z-index máximo

## Melhorias Futuras

1. **Responsividade**
   - Implementar breakpoints para telas menores
   - Ajustar proporções em dispositivos móveis
   - Adicionar modo de visualização compacto

2. **Animações**
   - Refinar timing das transições
   - Adicionar efeitos de entrada/saída mais suaves
   - Implementar gestos touch para dispositivos móveis

3. **Layout**
   - Permitir redimensionamento manual dos painéis
   - Adicionar modo de tela cheia para o chat
   - Implementar layout persistente entre sessões

4. **Acessibilidade**
   - Adicionar suporte a navegação por teclado
   - Implementar ARIA labels
   - Melhorar contraste e legibilidade

## Notas de Implementação

1. **TailwindCSS**
   - Usar classes utilitárias consistentemente
   - Manter ordem lógica nas classes
   - Extrair padrões comuns para componentes

2. **TypeScript**
   - Manter tipos atualizados para props
   - Documentar interfaces de componentes
   - Usar tipos estritos para estados

3. **React**
   - Usar hooks de forma eficiente
   - Implementar memo quando necessário
   - Manter componentes puros 