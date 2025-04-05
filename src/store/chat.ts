import { Message, WebhookResponse } from '@/types'
import { create } from 'zustand'
import { webhookService } from '@/lib/api'
import { useStageStore } from './stage'

interface ChatStore {
  messages: Message[]
  isLoading: boolean
  title: string
  conversationId?: string
  addMessage: (message: Message) => void
  sendMessage: (content: string) => Promise<void>
  setLoading: (isLoading: boolean) => void
  setTitle: (title: string) => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,
  title: 'Nova Conversa',
  conversationId: undefined,

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
    
  sendMessage: async (content: string) => {
    try {
      // Adiciona a mensagem do usuário ao chat
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        role: 'user',
        createdAt: new Date(),
      };
      
      get().addMessage(userMessage);
      set({ isLoading: true });
      
      // Envia a mensagem para o webhook
      const response = await webhookService.sendMessage(
        content, 
        get().conversationId
      );
      
      // Processa a resposta
      processWebhookResponse(response);
      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      // Adiciona mensagem de erro
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        role: 'system',
        createdAt: new Date(),
      };
      
      get().addMessage(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
  
  setLoading: (isLoading) => set({ isLoading }),
  setTitle: (title) => set({ title }),
}))

// Processa a resposta do webhook
function processWebhookResponse(response: WebhookResponse) {
  const { messages, addMessage } = useChatStore.getState();
  const stageStore = useStageStore.getState();
  
  // Adiciona a mensagem de resposta
  if (response.message) {
    const assistantMessage: Message = {
      id: Date.now().toString(),
      content: response.message.content,
      role: response.message.role as 'assistant' | 'system',
      createdAt: new Date(),
    };
    
    addMessage(assistantMessage);
    
    // Atualiza o título da conversa se for a primeira mensagem
    if (messages.length <= 1) {
      // Gera um título baseado no conteúdo da primeira mensagem (primeiros 30 caracteres)
      const newTitle = messages[0].content.substring(0, 30) + (messages[0].content.length > 30 ? '...' : '');
      useChatStore.getState().setTitle(newTitle);
    }
  }
  
  // Executa a função no Stage, se houver
  if (response.function) {
    const { name, parameters } = response.function;
    
    // Expande o Stage se estiver fechado
    if (!stageStore.isExpanded) {
      stageStore.setExpanded(true);
    }
    
    // Executa a função baseada no nome
    executeStageFunction(name, parameters);
  }
}

// Executa uma função no Stage
function executeStageFunction(name: string, parameters: Record<string, any>) {
  const stageStore = useStageStore.getState();
  
  // Define o conteúdo do Stage baseado na função
  switch (name) {
    case 'showForm':
      stageStore.setContent({
        id: Date.now().toString(),
        type: 'form',
        title: parameters.title || 'Formulário',
        content: parameters.fields || [],
      });
      break;
      
    case 'showImage':
      stageStore.setContent({
        id: Date.now().toString(),
        type: 'image',
        title: parameters.title || 'Imagem',
        content: parameters.url,
      });
      break;
      
    case 'showList':
      stageStore.setContent({
        id: Date.now().toString(),
        type: 'list',
        title: parameters.title || 'Lista',
        content: parameters.items || [],
      });
      break;
      
    case 'showPage':
      stageStore.setContent({
        id: Date.now().toString(),
        type: 'page',
        title: parameters.title || 'Página',
        content: {
          title: parameters.title || '',
          image_url: parameters.image_url || '',
          description: parameters.description || '',
        },
      });
      break;
      
    default:
      console.warn(`Função "${name}" não implementada.`);
      break;
  }
} 