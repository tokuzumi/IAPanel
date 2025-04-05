export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant' | 'system'
  createdAt: Date
}

export interface Conversation {
  id: string
  title: string
  createdAt: Date
}

export interface MenuItem {
  id: string
  title: string
  icon: React.ComponentType<any>
}

export interface StageContent {
  id: string
  type: string
  title: string
  content: any
}

export interface WebhookResponse {
  message: {
    content: string
    role: string
  }
  function?: {
    name: string
    parameters: Record<string, any>
  }
}

export interface WebhookRequest {
  content: string
  conversation_id?: string
  user_id?: string
} 