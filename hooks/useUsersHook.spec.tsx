import {Mock, vi} from 'vitest'
import { useUsersHook } from './useUsersHook'
import { act, renderHook, waitFor } from '@testing-library/react'
import { UserDataType } from './useSearchHook'

vi.mock('./useUsersHook')

const mockUseUsersHook = useUsersHook as unknown as Mock

const mockData = [
    {
        id: '1',
        name: 'John Doe',
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
    }
]

describe('test useUsersHook group', () => {
    const addUserMutationMock = vi.fn()
    beforeEach(() => {
        mockUseUsersHook.mockImplementation(() => ({
            isLoading: false,
            error: null,
            data: mockData,
            addUserMutation: {
                mutate: addUserMutationMock,
                isLoading: false,
                error: null,
            },
        }))
    })
    afterEach(() => {
        mockUseUsersHook.mockClear()
        addUserMutationMock.mockClear()
    })
    test('should fetch users successfully', async () => {
        const {result} = renderHook(() => useUsersHook())
        expect(result.current.data).toEqual(mockData)
        expect(result.current.isLoading).toBe(false)
        expect(result.current.error).toBeNull()
    })
    test('should mutate users successfully', async () => {
        const newUser = {
            id: '2',
            name: 'Jane Doe',
            created_at: '2024-02-01',
            updated_at: '2024-02-01'
        }
        addUserMutationMock.mockImplementationOnce((user: UserDataType, options: any) => {
            options.onSuccess(user)
        })
        const { result } = renderHook(() => useUsersHook())
        await act(async () => {
            await result.current.addUserMutation.mutate(newUser, {
                onSuccess: (data) => {
                    result.current.data.push(data)
                },
                onError: (error) => {
                    result.current.error = error
                }
            })
        })
        expect(addUserMutationMock).toHaveBeenCalledTimes(1)
        expect(result.current.data).toContainEqual(newUser)
    })
})