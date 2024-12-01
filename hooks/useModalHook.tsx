import { MouseEvent, useState } from "react"

export const useModalHook = () => {
    const [modalFlg, setModalFlg] = useState(false)

    const handleOnClick = (event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        setModalFlg(prev => !prev)
        return modalFlg
    }

    return {
        modalFlg,
        handleOnClick
    }
}