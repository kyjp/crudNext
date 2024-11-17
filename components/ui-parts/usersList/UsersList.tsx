'use client'
import Pagination from '@/components/ui-elements/pagination/Pagination'
import { UserDataType, useSearchHook } from '@/hooks/useSearchHooks'
import { useUsersHook } from '@/hooks/useUsersHooks'
import React, { ComponentPropsWithoutRef, FC } from 'react'

type UsersListType = ComponentPropsWithoutRef<'ul'>

type UsersListItemType = ComponentPropsWithoutRef<'li'>

type UsersListTitleType =  ComponentPropsWithoutRef<'h2'>

type UsersListIconType =  ComponentPropsWithoutRef<'div'>

const UsersList: FC<UsersListType> & {
    Item: FC<UsersListItemType>
    Title: FC<UsersListTitleType>
    Icon: FC<UsersListIconType>
} = (props) => {
    const { isLoading, error } = useUsersHook()
    const { usersData, handleOnClick, currentPage, LIMIT } = useSearchHook()
    if (isLoading) {
      return <div>Loading...</div>
    }
    if (error) {
      return <div>Error: {error.message}</div>
    }
    const {className} = props
    if (usersData.length === 0) return <p>件数は0件です。</p>
    return (
        <>
            <ul className={`grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4${className ? ` ${className}` : ''}`}>
                {
                    usersData.slice((currentPage - 1) * LIMIT, currentPage * LIMIT).map((item: UserDataType, index: number) => 
                        <UsersList.Item key={`usersList-item-${index}`}>
                            <article className="flex gap-4">
                                <div className="size-20">
                                    <UsersList.Icon />
                                </div>
                                <div className="flex items-center">
                                    <UsersList.Title>{item.name}</UsersList.Title>
                                </div>
                            </article>
                        </UsersList.Item>
                    )
                }
            </ul>
            <div className="m-8">
                <Pagination         
                    currentPage={currentPage}
                    limit={LIMIT}
                    count={usersData.length}
                    onClick={handleOnClick}
                />
            </div>
        </>
    )
}

UsersList.Item = (({children}) => {
    return (
        <li className="rounded-lg p-4 shadow-lg">
            {children}
        </li>
    )
}) as FC<UsersListItemType>

UsersList.Title = (({children}) => {
    return (
        <h2 className="font-bold text-base">
            {children}
        </h2>
    )
}) as FC<UsersListTitleType>

UsersList.Icon = (() => {
    return (
        <div className="bg-gray-400 rounded-full w-full aspect-square" />
    )
}) as FC<UsersListIconType>

export default UsersList