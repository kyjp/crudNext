import { ChangeEvent, MouseEvent, useState } from "react"
import { useUsersHook } from "./useUsersHook"

export const useUserHook = () => {
    const [name, setName] = useState("")
    const {addUserMutation} = useUsersHook()
    
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value)
    }

    const handleOnSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const date = new Date()
        const year = date.getUTCFullYear()
        const month = String(date.getUTCMonth() + 1).padStart(2, "0")
        const day = String(date.getUTCDate()).padStart(2, "0")
        const hours = String(date.getUTCHours()).padStart(2, "0")
        const minutes = String(date.getUTCMinutes()).padStart(2, "0")
        const seconds = String(date.getUTCSeconds()).padStart(2, "0")
        const offset = -9
        const timezoneSign = offset < 0 ? "-" : "+"
        const timezoneHours = String(Math.abs(offset)).padStart(2, "0")
        const timezoneMinutes = "00"
        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds} ${timezoneSign}${timezoneHours}:${timezoneMinutes}`
        await addUserMutation.mutate(
            {
                id: crypto.randomUUID(),
                name: name,
                created_at: formattedDate,
                updated_at: formattedDate
            }
        )
        window.location.reload()
    }

    return {
        name,
        handleOnChange,
        handleOnSubmit
    }
}