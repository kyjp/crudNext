'use client'
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
    const { usersData } = useSearchHook()
    if (isLoading) {
      return <div>Loading...</div>
    }
    if (error) {
      return <div>Error: {error.message}</div>
    }
    const {className} = props
    return (
        <ul className={`grid grid-cols-4 gap-4 col-span-3 md:grid-cols-1${className && ` ${className}`}`}>
            {
                usersData.map((item: UserDataType, index: number) => 
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