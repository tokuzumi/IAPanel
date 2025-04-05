# Processamento de Respostas do Webhook

Este documento técnico descreve em detalhes como o sistema processa as respostas recebidas do webhook n8n, com foco na robustez e adaptabilidade a diferentes formatos.

## Visão Geral

O IA Panel utiliza um webhook externo para processar mensagens e gerar respostas. Durante o desenvolvimento, identificamos que o webhook pode retornar respostas em diferentes formatos, dependendo da implementação específica. Para lidar com essa variabilidade, implementamos um processador robusto que detecta automaticamente o formato e extrai as informações relevantes.

## Fluxo de Processamento

O fluxo de processamento das respostas segue estas etapas:

1. Envio da mensagem para o webhook
2. Recebimento da resposta como texto
3. Conversão do texto para objeto JavaScript
4. Detecção do formato da resposta
5. Extração da mensagem e função (se presente)
6. Normalização para o formato padrão
7. Processamento da mensagem e execução da função

## Algoritmo de Detecção de Formato

O algoritmo de detecção de formato implementado no arquivo `src/lib/api.ts` segue esta ordem de prioridade:

1. **Busca por estrutura aninhada com propriedade "n"**:
   - Itera por todas as propriedades de primeiro nível
   - Verifica se alguma propriedade contém um objeto com a propriedade "n" como array
   - Extrai o objeto "output" do primeiro item do array "n"

2. **Busca por propriedade "n" direta**:
   - Verifica se o objeto raiz tem uma propriedade "n" como array
   - Extrai o objeto "output" do primeiro item do array "n"

3. **Busca por formato de array**:
   - Verifica se a resposta é um array
   - Extrai o objeto "output" do primeiro item do array

4. **Busca por formato padrão**:
   - Verifica se o objeto raiz tem uma propriedade "message"
   - Utiliza o objeto raiz como resposta

5. **Busca recursiva por objetos de mensagem**:
   - Percorre recursivamente toda a estrutura do objeto
   - Procura por qualquer objeto que tenha uma propriedade "message" com "content" e "role"
   - Retorna o primeiro objeto válido encontrado

## Implementação Técnica

A implementação do processador está no arquivo `src/lib/api.ts`, no método `sendMessage` do `webhookService`. Segue um trecho simplificado do código que realiza a detecção de formato:

```typescript
// Formato específico visto no console: {"object Object": {"n":[{"output":...}]}}
for (const key in rawResponse) {
  const value = rawResponse[key];
  
  // Verifica se há uma propriedade "n" em algum nível
  if (value && typeof value === 'object' && value.n && Array.isArray(value.n)) {
    const firstItem = value.n[0];
    if (firstItem && firstItem.output && firstItem.output.message) {
      console.log("Formato especial (n array) detectado:", firstItem.output);
      return firstItem.output as WebhookResponse;
    }
  }
}

// Caso específico do formato simples com "n" array:
if (rawResponse && rawResponse.n && Array.isArray(rawResponse.n)) {
  const firstItem = rawResponse.n[0];
  if (firstItem && firstItem.output && firstItem.output.message) {
    console.log("Formato com n array detectado:", firstItem.output);
    return firstItem.output as WebhookResponse;
  }
}

// Formato do AgenteIA: [{"output":{"message":{"content":"...","role":"..."}}}]
if (Array.isArray(rawResponse) && rawResponse.length > 0 && rawResponse[0].output) {
  console.log("Formato AgenteIA array detectado:", rawResponse[0].output);
  return rawResponse[0].output as WebhookResponse;
}

// Formato padrão: {"message":{"content":"...","role":"..."}}
if (rawResponse.message) {
  console.log("Formato padrão detectado:", rawResponse);
  return rawResponse as WebhookResponse;
}

// Tentativa extra: busca recursiva
const findMessageObject = (obj: any): WebhookResponse | null => {
  if (!obj || typeof obj !== 'object') return null;
  
  if (obj.message && obj.message.content && obj.message.role) {
    return obj as WebhookResponse;
  }
  
  for (const key in obj) {
    const result = findMessageObject(obj[key]);
    if (result) return result;
  }
  
  return null;
};

const messageObject = findMessageObject(rawResponse);
if (messageObject) {
  console.log("Encontrado objeto de mensagem em análise profunda:", messageObject);
  return messageObject;
}
```

## Logs de Depuração

O sistema registra diversos logs no console do navegador para facilitar a depuração:

- `Resposta original do webhook (texto)`: a resposta bruta recebida do webhook
- `Resposta parseada`: a resposta após conversão para objeto JavaScript
- Logs de detecção de formato: indica qual formato foi detectado
- Logs de objetos extraídos: mostra o objeto extraído após a detecção

Para acessar estes logs, abra as ferramentas de desenvolvedor do navegador (F12) e vá para a aba "Console".

## Tratamento de Erros

O sistema implementa tratamento de erros em múltiplos níveis:

1. **Erros de Comunicação**: captura e registra erros de comunicação com o webhook
2. **Erros de Parse**: trata falhas ao converter a resposta para objeto JavaScript
3. **Erros de Formato**: lida com formatos desconhecidos ou inválidos
4. **Respostas de Fallback**: fornece mensagens de erro amigáveis ao usuário em caso de falha

## Formatos Compatíveis

O sistema é compatível com os seguintes formatos de resposta:

### 1. Formato Padrão
```json
{
  "message": {
    "content": "Texto da resposta",
    "role": "assistant"
  },
  "function": {
    "name": "showImage",
    "parameters": {
      "url": "https://example.com/image.jpg"
    }
  }
}
```

### 2. Formato AgenteIA (Array)
```json
[
  {
    "output": {
      "message": {
        "content": "Texto da resposta",
        "role": "assistant"
      }
    }
  }
]
```

### 3. Formato AgenteIA (com propriedade "n")
```json
{
  "n": [
    {
      "output": {
        "message": {
          "content": "Texto da resposta",
          "role": "assistant"
        }
      }
    }
  ]
}
```

### 4. Formato AgenteIA (com chave especial)
```json
{
  "object Object": {
    "n": [
      {
        "output": {
          "message": {
            "content": "Texto da resposta",
            "role": "assistant"
          }
        }
      }
    ]
  }
}
```

## Considerações Futuras

Para manter a robustez do sistema, considere as seguintes melhorias futuras:

1. **Configuração de Formato**: permitir configurar o formato esperado para evitar detecção automática
2. **Cache de Formato**: memorizar o formato detectado para evitar redetecção a cada mensagem
3. **Análise de Padrões**: implementar análise estatística para identificar padrões na resposta
4. **Validação de Schema**: utilizar Zod ou outra biblioteca para validação formal de schema
5. **Testes de Integração**: criar testes automatizados para diferentes formatos de resposta 