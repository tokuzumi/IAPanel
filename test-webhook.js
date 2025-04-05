// Teste de integração com o webhook n8n
async function testWebhook() {
  const WEBHOOK_URL = 'https://webhook.neversleep.com.br/webhook/IAPnel';
  
  // Exemplo de requisição
  const requestData = {
    content: "Olá, por favor me mostre um exemplo de página sobre tecnologia.",
    conversation_id: "test-" + Date.now(),
    user_id: "test-user"
  };
  
  console.log("Enviando requisição para o webhook...");
  console.log("Dados:", JSON.stringify(requestData, null, 2));
  
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    
    if (!response.ok) {
      throw new Error(`Erro na chamada ao webhook: ${response.status}`);
    }
    
    const rawResponse = await response.json();
    console.log("\nResposta bruta recebida:");
    console.log(JSON.stringify(rawResponse, null, 2));
    
    // Processa a resposta para lidar com diferentes formatos
    let responseData;
    
    // Verifica se é o formato do AgenteIA
    if (Array.isArray(rawResponse) && rawResponse.length > 0 && rawResponse[0].output) {
      console.log("\n✅ Detectado formato AgenteIA");
      responseData = rawResponse[0].output;
    } else if (rawResponse.message) {
      console.log("\n✅ Detectado formato padrão");
      responseData = rawResponse;
    } else {
      console.log("\n❌ Formato de resposta desconhecido");
      console.log("Não foi possível processar a resposta");
      return;
    }
    
    console.log("\nResposta processada:");
    console.log(JSON.stringify(responseData, null, 2));
    
    // Validação da resposta
    if (responseData.message) {
      console.log("\n✅ Resposta contém mensagem");
      console.log("Conteúdo:", responseData.message.content);
      console.log("Papel:", responseData.message.role);
    } else {
      console.log("\n❌ Resposta não contém mensagem");
    }
    
    if (responseData.function) {
      console.log("\n✅ Resposta contém função:", responseData.function.name);
      console.log("Parâmetros:", JSON.stringify(responseData.function.parameters, null, 2));
    } else {
      console.log("\nℹ️ Resposta não contém função (apenas texto)");
    }
    
  } catch (error) {
    console.error("\n❌ Erro ao comunicar com webhook:", error);
  }
}

// Executar o teste
testWebhook();

/* 
Para executar este teste:
1. No terminal, navegue até o diretório do projeto
2. Execute: node test-webhook.js
*/ 