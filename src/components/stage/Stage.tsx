'use client'

import { useStageStore } from '@/store'
import { ChevronLeft, X } from 'lucide-react'
import { StageContent } from './StageContent'

export function Stage() {
  const { content, isExpanded, setExpanded } = useStageStore()

  return (
    <div className="fixed top-0 right-0 h-full">
      {!isExpanded && (
        <button
          onClick={() => setExpanded(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2
            w-6 h-12 flex items-center justify-center 
            bg-secondary border-l border-y rounded-l-md 
            hover:bg-primary/10 
            transition-all duration-300 ease-in-out
            z-50">
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      
      <aside className={`w-[40vw] h-full flex flex-col bg-secondary border-l 
        transform transition-transform duration-300 ease-in-out
        ${isExpanded ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-14 flex items-center justify-between px-4 border-b">
          <span className="font-semibold text-lg">{content?.title || 'Stage'}</span>
          <button
            onClick={() => setExpanded(false)}
            className="p-1.5 hover:bg-destructive/10 rounded-md">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <StageContent content={content} />
        </div>
      </aside>
    </div>
  )
} 