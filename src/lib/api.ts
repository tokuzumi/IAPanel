import { WebhookRequest, WebhookResponse } from '@/types';

const WEBHOOK_URL = 'https://webhook.neversleep.com.br/webhook/IAPnel';

/**
 * Serviço para comunicação com o webhook n8n
 */
export const webhookService = {
  /**
   * Envia uma mensagem para o webhook e recebe uma resposta
   * @param message Conteúdo da mensagem
   * @param conversationId ID opcional da conversa
   * @param userId ID opcional do usuário
   * @returns WebhookResponse contendo a resposta e possíveis funções a serem executadas
   */
  async sendMessage(
    message: string,
    conversationId?: string,
    userId?: string
  ): Promise<WebhookResponse> {
    try {
      const request: WebhookRequest = {
        content: message,
        conversation_id: conversationId,
        user_id: userId,
      };

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Erro na chamada ao webhook: ${response.status}`);
      }

      // Processa a resposta no formato específico do AgenteIA
      const rawResponse = await response.json();
      
      // Formato esperado: [{ "output": { "message": { ... }, "function": { ... } } }]
      if (Array.isArray(rawResponse) && rawResponse.length > 0 && rawResponse[0].output) {
        // Extrai a resposta do formato do AgenteIA
        return rawResponse[0].output as WebhookResponse;
      }
      
      // Caso já esteja no formato esperado pelo nosso sistema
      if (rawResponse.message) {
        return rawResponse as WebhookResponse;
      }

      // Resposta em formato desconhecido
      console.error('Formato de resposta desconhecido:', rawResponse);
      return {
        message: {
          content: 'Desculpe, recebi uma resposta em formato inesperado. Por favor, tente novamente.',
          role: 'system',
        },
      };
    } catch (error) {
      console.error('Erro ao comunicar com webhook:', error);
      // Resposta de fallback em caso de erro
      return {
        message: {
          content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.',
          role: 'system',
        },
      };
    }
  },
}; 