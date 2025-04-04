'use client'

import { useChatStore } from '@/store'
import { useStageStore, useSidebarStore } from '@/store'
import { Message } from '@/types'
import { Send, Pencil } from 'lucide-react'
import { useState, FormEvent } from 'react'

export function Chat() {
  const { messages, isLoading, title, addMessage, setTitle } = useChatStore()
  const { isExpanded: isStageExpanded } = useStageStore()
  const { isExpanded: isSidebarExpanded } = useSidebarStore()
  const [input, setInput] = useState('')
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [titleInput, setTitleInput] = useState(title)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      createdAt: new Date(),
    }

    addMessage(message)
    setInput('')
  }

  const handleTitleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (titleInput.trim()) {
      setTitle(titleInput)
    } else {
      setTitleInput(title)
    }
    setIsEditingTitle(false)
  }

  // Função para determinar as classes de padding
  const getPaddingClasses = () => {
    // Ambos expandidos
    if (isSidebarExpanded && isStageExpanded) {
      return 'pl-4 pr-[40vw]'
    }
    // Apenas sidebar expandido
    if (isSidebarExpanded && !isStageExpanded) {
      return 'px-[10%]'
    }
    // Ambos recolhidos
    if (!isSidebarExpanded && !isStageExpanded) {
      return 'px-[20%]'
    }
    // Apenas stage expandido (sidebar recolhido)
    return 'pl-6 pr-[40vw]'
  }

  return (
    <main className={`h-full flex flex-col bg-background 
      transition-all duration-300 ease-in-out
      ${getPaddingClasses()}`}>
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b">
        <div className="flex items-center gap-2">
          {isEditingTitle ? (
            <form onSubmit={handleTitleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="bg-secondary p-1 rounded-md"
                autoFocus
                onBlur={handleTitleSubmit}
              />
            </form>
          ) : (
            <>
              <h1 className="text-lg font-semibold">{title}</h1>
              <button 
                onClick={() => {
                  setIsEditingTitle(true)
                  setTitleInput(title)
                }}
                className="p-1 hover:bg-primary/10 rounded-md"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Chat content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message: Message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted animate-pulse">
                Digitando...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 p-2 rounded-md bg-secondary"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  )
} 