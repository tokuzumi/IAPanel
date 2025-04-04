export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
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
  icon: string
}

export interface StageContent {
  id: string
  type: string
  title: string
  content: any
} 