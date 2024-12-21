'use client'
import Button from '@/components/ui-elements/button/Button'
import InputText from '@/components/ui-elements/input/InputText'
import { useSearchHook } from '@/hooks/useSearchHook'
import React, { ComponentPropsWithoutRef, FC } from 'react'

type SearchFormType = ComponentPropsWithoutRef<'form'>
type SearchFormSelectType = ComponentPropsWithoutRef<'select'>

const SearchForm: FC<SearchFormType> & {
    Select: FC<SearchFormSelectType>
} = () => {
    const {searchQuery, handleOnChange, handleOnSubmit, handleOnSelect} = useSearchHook()
    return (
        <form data-testid="search-form">
            <div className="flex gap-3">
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
                <div>
                    <SearchForm.Select
                        onChange={handleOnSelect}
                    />
                </div>
            </div>
        </form>
    )
}

SearchForm.Select = (({
    onChange
}) => {
    return (
        <select
            onChange={onChange}
            defaultValue="initial"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
            <option disabled value="initial">並び順</option>
            <option value="new">新着順</option>
            <option value="old">古い順</option>
            <option value="name">名前順</option>
        </select>
    )
}) as FC<SearchFormSelectType>

export default SearchForm