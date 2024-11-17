import { ChangeEvent, useState } from "react"

export const useUserHook = () => {
    const [name, setName] = useState("")
    
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value)
    }

    const handleOnSubmit = (event: ChangeEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return {
        name,
        handleOnChange,
        handleOnSubmit
    }
}