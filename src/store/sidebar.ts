import { create } from 'zustand'
import { Settings, Wrench, HelpCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Conversation {
  id: string
  title: string
  createdAt: Date
}

interface MenuItem {
  id: string
  title: string
  icon: LucideIcon
}

interface SidebarStore {
  isExpanded: boolean
  selectedConversationId: string | null
  selectedMenuItem: string | null
  conversations: Conversation[]
  menuItems: MenuItem[]
  setExpanded: (isExpanded: boolean) => void
  addConversation: (conversation: Conversation) => void
  selectConversation: (id: string) => void
  selectMenuItem: (id: string) => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isExpanded: true,
  selectedConversationId: null,
  selectedMenuItem: null,
  conversations: [],
  menuItems: [
    { id: 'settings', title: 'Configurações', icon: Settings },
    { id: 'tools', title: 'Ferramentas', icon: Wrench },
    { id: 'help', title: 'Ajuda', icon: HelpCircle },
  ],
  setExpanded: (isExpanded) => set({ isExpanded }),
  addConversation: (conversation) =>
    set((state) => ({
      conversations: [...state.conversations, conversation],
    })),
  selectConversation: (id) => set({ selectedConversationId: id }),
  selectMenuItem: (id) => set({ selectedMenuItem: id }),
})) 