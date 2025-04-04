import { create } from 'zustand'

interface StageContent {
  id: string
  type: string
  title: string
  content: any
}

interface StageStore {
  isExpanded: boolean
  selectedContent: StageContent | null
  setExpanded: (isExpanded: boolean) => void
  setContent: (content: StageContent | null) => void
}

export const useStageStore = create<StageStore>((set) => ({
  isExpanded: false,
  selectedContent: null,
  setExpanded: (isExpanded) => set({ isExpanded }),
  setContent: (content) => set({ selectedContent: content }),
})) 