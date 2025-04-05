import { create } from 'zustand'
import { StageContent } from '@/types'

interface StageStore {
  isExpanded: boolean
  content: StageContent | null
  setExpanded: (isExpanded: boolean) => void
  setContent: (content: StageContent | null) => void
}

export const useStageStore = create<StageStore>((set) => ({
  isExpanded: false,
  content: null,
  setExpanded: (isExpanded) => set({ isExpanded }),
  setContent: (content) => set({ content }),
})) 