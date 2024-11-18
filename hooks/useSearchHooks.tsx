import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { useUsersHook } from "./useUsersHooks"
import { useUsersDataStore } from "@/features/useUsersDataStore"
import { usePageStore } from "@/features/usePageStore"

export type UserDataType = {
    id: string
    name: string
    created_at: string
    updated_at: string
}

export type SortType = 'new' | 'old' | 'name'

export const useSearchHook = () => {
    const usersData = useUsersDataStore(store => store.usersData)
    const setUsersData = useUsersDataStore(store => store.setUsersData)
    
    const currentPage = usePageStore(store => store.currentPage)
    const setCurrentPage = usePageStore(store => store.setCurrentPage)
    const [searchQuery, setSearchQuery] = useState('')
    const { isLoading, error, data } = useUsersHook()
    const LIMIT: number = 20

    useEffect(() => {
        if(!isLoading && !error) {
            setUsersData(data as UserDataType[])
        }
    }, [isLoading, error, data])

    const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const targetText = event.currentTarget.innerText
        let temp: number = currentPage
        switch (targetText) {
            case 'Previous':
                temp -= 1
                break
            case 'Next':
                temp += 1
                break
            default:
                temp = Number(targetText)
                break
        }
        if(0 < temp && temp <= Math.ceil(usersData.length / LIMIT)) {
            setCurrentPage(temp)
            return temp
        }
        return currentPage
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.currentTarget.value
        setSearchQuery(text)
        return text
    }

    const handleOnSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setCurrentPage(1)
        if(searchQuery === null || searchQuery === undefined || searchQuery === "") {
            setUsersData(data)
            return data
        }
        const tempData = await data.filter((item: UserDataType) => {
            return ~item.name.indexOf(searchQuery)
        })
        setUsersData(tempData)
        return tempData
    }
    
    const quickSort = (arr: UserDataType[], type: SortType): UserDataType[] => {
        if(arr.length <= 1) return arr
        if(type === 'new') {
            const pivot = arr[arr.length - 1]
            const left = arr.filter(e => new Date(e.created_at) < new Date(pivot.created_at))
            const right = arr.filter(e => new Date(pivot.created_at) < new Date(e.created_at))
            return [...quickSort(left, 'new'), pivot, ...quickSort(right, 'new')]
        }
        if(type === 'old') {
            const pivot = arr[arr.length - 1]
            const left = arr.filter(e => new Date(pivot.created_at) < new Date(e.created_at))
            const right = arr.filter(e => new Date(e.created_at) < new Date(pivot.created_at))
            return [...quickSort(left, 'old'), pivot, ...quickSort(right, 'old')]
        }
        if(type === 'name') {
            const pivot = arr[arr.length - 1]
            const left = arr.filter(e => pivot.name < e.name)
            const right = arr.filter(e => e.name < pivot.name)
            return [...quickSort(left, 'name'), pivot, ...quickSort(right, 'name')]
        }
        return arr
    }

    return {
        searchQuery,
        handleOnChange,
        handleOnSubmit,
        usersData,
        currentPage,
        handleOnClick,
        LIMIT,
        quickSort
    }
}