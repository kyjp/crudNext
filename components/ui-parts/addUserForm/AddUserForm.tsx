"use client"
import Button from '@/components/ui-elements/button/Button'
import InputText from '@/components/ui-elements/input/InputText'
import { useUserHook } from '@/hooks/useUserHook'
import { FC } from 'react'

const AddUserForm: FC = () => {
    const {name, handleOnChange, handleOnSubmit} = useUserHook()
    return (
        <form>
            <div className="mt-8">
                <InputText
                    placeholder="ユーザー名"
                    value={name}
                    onChange={handleOnChange}
                />
            </div>
            <div className="mt-4">
                <Button
                    onClick={handleOnSubmit}
                >
                    追加する
                </Button>
            </div>
        </form>
    )
}

export default AddUserForm