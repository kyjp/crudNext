import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { useUsersHook } from "./useUsersHooks"
import { useUsersDataStore } from "@/features/useUsersDataStore"

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
    const [searchQuery, setSearchQuery] = useState('')
    const { isLoading, error, data } = useUsersHook()

    useEffect(() => {
        if(!isLoading && !error) {
            setUsersData(data as UserDataType[])
        }
    }, [isLoading, error, data])

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.currentTarget.value
        setSearchQuery(text)
        return text
    }

    const handleOnSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
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
        usersData
    }
}