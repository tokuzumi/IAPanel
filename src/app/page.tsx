'use client'

import { Sidebar } from '@/components/sidebar/Sidebar'
import { Chat } from '@/components/chat/Chat'
import { Stage } from '@/components/stage/Stage'

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 relative">
        <Chat />
        <Stage />
      </div>
    </div>
  )
} 