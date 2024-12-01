import { UserDataType } from '@/hooks/useSearchHook'
import {create} from 'zustand'

export const useUsersDataStore = create<{
    usersData: UserDataType[],
    setUsersData: (data: UserDataType[]) => void
}>((set) => ({
    usersData: [],
    setUsersData: data => set(() => ({usersData: data}))
}))