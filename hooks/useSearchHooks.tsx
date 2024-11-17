import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { useUsersHook } from "./useUsersHooks"
import { useUsersDataStore } from "@/features/useUsersDataStore"
import { usePageStore } from "@/features/usePageStore"

export type UserDataType = {
    address: string
    company: string
    email: string
    gender: string
    name: string
    phone: string
    tags: string[]
    id: string
}

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

    return {
        searchQuery,
        handleOnChange,
        handleOnSubmit,
        usersData,
        currentPage,
        handleOnClick,
        LIMIT
    }
}