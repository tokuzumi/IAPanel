import { Message } from '@/types'
import { create } from 'zustand'

interface ChatStore {
  messages: Message[]
  isLoading: boolean
  title: string
  addMessage: (message: Message) => void
  setLoading: (isLoading: boolean) => void
  setTitle: (title: string) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  title: 'Nova Conversa',
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setTitle: (title) => set({ title }),
})) 