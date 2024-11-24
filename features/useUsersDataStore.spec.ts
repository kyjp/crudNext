import { UserDataType } from "@/hooks/useSearchHooks"
import { useUsersDataStore } from "./useUsersDataStore"
import { act } from "react"

describe('test useUsersDataStore group', () => {
    const initialUserData: UserDataType[] = [
        {
            id: "1234",
            name: "test",
            created_at: "2022-10-09T04:40:18 -09:00",
            updated_at: "2016-04-13T03:00:51 -09:00"
        }
    ]

    test('should have an initial useUsersData', () => {
        const {usersData} = useUsersDataStore.getState()
        console.log('test', usersData)
        expect(usersData).toStrictEqual([])
    })

    test('should update usersData correctly', () => {
        act(() => {
            useUsersDataStore.getState().setUsersData(initialUserData)
        })
        const {usersData} = useUsersDataStore.getState()
        expect(usersData).toStrictEqual(initialUserData)
    })    
})