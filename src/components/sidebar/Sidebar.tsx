'use client'

import { useSidebarStore } from '@/store'
import { useStageStore } from '@/store'
import { signOut, useSession } from 'next-auth/react'
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  History,
  Settings,
  Wrench,
  HelpCircle,
  LogOut,
  MessageSquare,
} from 'lucide-react'
import { MenuItem, Conversation } from '@/types'

export function Sidebar() {
  const {
    conversations,
    isExpanded,
    selectedConversationId,
    selectedMenuItem,
    menuItems,
    addConversation,
    selectConversation,
    selectMenuItem,
    setExpanded,
  } = useSidebarStore()

  const { setContent, setExpanded: setStageExpanded } = useStageStore()
  const { data: session } = useSession()

  const handleNewChat = () => {
    const conversation: Conversation = {
      id: Date.now().toString(),
      title: 'Nova conversa',
      createdAt: new Date(),
    }

    addConversation(conversation)
    selectConversation(conversation.id)
  }

  const handleMenuClick = (id: string) => {
    selectMenuItem(id)
    setStageExpanded(true)
    setContent({
      id,
      type: id,
      title: menuItems.find((item: MenuItem) => item.id === id)?.title || '',
      content: null,
    })
  }

  const handleLogout = () => {
    signOut()
  }

  const getUserInitials = () => {
    if (!session?.user?.name) return '?'
    const [firstName, lastName] = session.user.name.split(' ')
    return `${firstName[0]}${lastName ? lastName[0] : ''}`.toUpperCase()
  }

  const getFormattedName = () => {
    if (!session?.user?.name) return ''
    const [firstName, ...rest] = session.user.name.split(' ')
    const lastName = rest[rest.length - 1]
    return `${firstName} ${lastName ? lastName[0] + '.' : ''}`
  }

  return (
    <aside
      className={`h-full flex flex-col bg-secondary border-r 
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-16'}`}
    >
      {/* Header com logo e botão de toggle */}
      <div className="h-14 flex items-center gap-3 px-4 border-b">
        <button
          onClick={() => setExpanded(!isExpanded)}
          className="p-1.5 hover:bg-primary/10 rounded-md"
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform duration-300
              ${isExpanded ? '' : 'rotate-180'}`}
          />
        </button>
        {isExpanded && (
          <span className="font-semibold text-lg">IA Panel</span>
        )}
      </div>

      {/* Menu principal */}
      <nav className="flex-1 overflow-y-auto py-2">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center gap-3 px-2 py-2 rounded-md
                ${isExpanded ? 'justify-start' : 'justify-center'}
                ${selectedMenuItem === item.id 
                  ? 'bg-primary/10 hover:bg-primary/20' 
                  : 'hover:bg-primary/10'}`}
            >
              <item.icon className={`h-5 w-5 flex-shrink-0 
                ${selectedMenuItem === item.id ? 'text-foreground' : 'text-muted-foreground'}`} />
              {isExpanded && (
                <span className={`text-sm ${selectedMenuItem === item.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {item.title}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Seção de conversas */}
        <div className="mt-4 px-3">
          <div className={`flex items-center gap-3 px-2 py-2
            ${isExpanded ? 'justify-start' : 'justify-center'}`}>
            <History className="h-5 w-5" />
            {isExpanded && (
              <span className="text-sm font-medium">Histórico de Conversas</span>
            )}
          </div>
          
          {isExpanded && conversations.length > 0 && (
            <div className="mt-1 space-y-1">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => selectConversation(conv.id)}
                  className={`w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm
                    ${selectedConversationId === conv.id ? 'bg-primary/10 text-primary' : 'hover:bg-primary/10'}`}
                >
                  <MessageSquare className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{conv.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Footer com perfil e logout */}
      <div className="h-14 flex items-center justify-between px-4 border-t">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-background">
            {getUserInitials()}
          </div>
          {isExpanded && (
            <div className="flex-1">
              <div className="text-sm font-medium">{getFormattedName()}</div>
            </div>
          )}
        </div>
        {isExpanded && (
          <button
            onClick={handleLogout}
            className="p-1.5 hover:bg-destructive/10 rounded-md"
          >
            <LogOut className="h-5 w-5" />
          </button>
        )}
      </div>
    </aside>
  )
} 