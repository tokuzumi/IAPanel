# IA Panel

IA Panel é uma aplicação web moderna para interações de chat com IA, construída com Next.js, React e TypeScript. O sistema possui uma interface responsiva e elegante com três componentes principais: Sidebar, Chat e Stage.

## Características Principais

- **Layout Responsivo**: Interface que se adapta dinamicamente às mudanças de estado dos painéis
- **Sistema de Chat**: Conversa em tempo real com título editável
- **Sidebar Expansível**: Menu de navegação que pode ser recolhido para maximizar o espaço de trabalho
- **Painel Stage Dinâmico**: Área lateral para exibir informações contextuais relacionadas às opções do menu
- **Transições Suaves**: Animações fluidas entre os diferentes estados da interface
- **Padding Dinâmico**: Sistema avançado de padding que se adapta a cada combinação de estados dos painéis
- **Processamento Robusto de Webhooks**: Sistema inteligente que detecta automaticamente diferentes formatos de resposta

## Layout Aprimorado

O projeto implementa uma solução sofisticada de layout dinâmico que:

- Ajusta automaticamente o padding do Chat com base nos estados do Sidebar e Stage
- Utiliza unidades relativas (percentagens) para garantir consistência em diferentes dispositivos
- Implementa transições suaves (300ms) entre todos os estados
- Garante que os componentes interajam de forma harmoniosa
- Preserva a funcionalidade de edição de título no Chat

Para mais detalhes sobre a implementação do layout, consulte a [documentação detalhada](/docs/LAYOUT_FINAL.md).

## Integração com Webhook

O sistema implementa uma conexão robusta com webhooks externos para processamento de mensagens, com:

- Detecção automática de múltiplos formatos de resposta
- Processamento inteligente de mensagens e funções
- Busca recursiva por objetos de mensagem válidos
- Tratamento abrangente de erros em todos os níveis

Para detalhes técnicos completos sobre o processamento de respostas do webhook, consulte a [documentação específica](/docs/WEBHOOK_PROCESSING.md).

## Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Next-Auth](https://next-auth.js.org/) para autenticação
- [Zustand](https://zustand-demo.pmnd.rs/) para gerenciamento de estado

## Estrutura do Projeto

```
src/
├── app/                      # Rotas e layouts do Next.js
├── components/               # Componentes React
│   ├── chat/                 # Componente de chat
│   ├── sidebar/              # Barra lateral de navegação
│   └── stage/                # Painel lateral direito
├── lib/                      # Utilitários e helpers
│   ├── auth/                 # Configuração de autenticação
│   └── api.ts                # Serviços de API e webhook
├── store/                    # Gerenciamento de estado global
│   ├── chat.ts               # Estado do chat
│   ├── sidebar.ts            # Estado da sidebar
│   └── stage.ts              # Estado do stage
└── types/                    # Definições de tipos TypeScript
```

## Instalação

Siga estas etapas para configurar o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/tokuzumi/ia-panel.git
   cd ia-panel
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```
   Ou se preferir npm:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env.local` baseado no `.env.example` e configure as variáveis de ambiente necessárias:
   ```
   NEXTAUTH_SECRET=seu_segredo_aqui
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```
   Ou se preferir npm:
   ```bash
   npm run dev
   ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Documentação Adicional

Para informações mais detalhadas sobre a implementação e arquitetura, consulte os arquivos na pasta `/docs`:

- [DOCUMENTACAO_CENTRAL.md](/docs/DOCUMENTACAO_CENTRAL.md) - Documentação principal do projeto
- [WEBHOOK_PROCESSING.md](/docs/WEBHOOK_PROCESSING.md) - Detalhes sobre processamento de respostas do webhook
- [LAYOUT_FINAL.md](/docs/LAYOUT_FINAL.md) - Documentação da solução final de layout
- [DESENVOLVIMENTO.md](/docs/DESENVOLVIMENTO.md) - Visão geral da estrutura e componentes
- [PADDING_CHALLENGE.md](/docs/PADDING_CHALLENGE.md) - Explicação da solução de padding responsivo

## Contribuição

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes. 