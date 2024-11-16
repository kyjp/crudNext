'use client'
import Button from '@/components/ui-elements/button/Button'
import InputText from '@/components/ui-elements/input/InputText'
import { useSearchHook } from '@/hooks/useSearchHooks'
import React from 'react'

const SearchForm = () => {
    const {searchQuery, handleOnChange, handleOnSubmit} = useSearchHook()
    return (
        <form className="flex gap-2">
            <div>
                <InputText
                    onChange={handleOnChange}
                    value={searchQuery}
                    placeholder="キーワード：名前"
                />
            </div>
            <div>
                <Button
                    onClick={handleOnSubmit}
                >
                    検索
                </Button>
            </div>
        </form>
    )
}

export default SearchForm