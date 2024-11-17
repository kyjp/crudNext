import {create} from 'zustand'

export const usePageStore = create<{
    currentPage: number,
    setCurrentPage: (current: number) => void
}>((set) => ({
    currentPage: 1,
    setCurrentPage: current => set(() => ({currentPage: current}))
}))