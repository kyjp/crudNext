import { Mock, vi } from 'vitest'
import { useUserHook } from './useUserHook'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { renderHook } from '@testing-library/react'
import { useUsersHook } from './useUsersHook'

vi.mock('./useUsersHook')

const mockUseUsersHook = useUsersHook as unknown as Mock

describe('test useUserHook group', () => {
    const addUserMutationMock = vi.fn()
    beforeEach(() => {
        mockUseUsersHook.mockImplementation(() => ({
            isLoading: false,
            error: null,
            data: [],
            addUserMutation: {
                mutate: addUserMutationMock,
                isLoading: false,
                error: null,
            },
        }))

        // window.location.reload() をモック
        Object.defineProperty(window, 'location', {
            value: {
                ...window.location,
                reload: vi.fn(),  // reload をモック
            },
            writable: true,
        })
    })
    afterEach(() => {
        mockUseUsersHook.mockClear()
        addUserMutationMock.mockClear()
    })
    test('should call setName when handleOnChanged', async () => {
        vi.mock(import("react"), async (importOriginal) => {
            const actual = await importOriginal()
            return {
                ...actual,
                useState: vi.fn().mockReturnValue(['', vi.fn()])
            }
        })
        const mockFn = vi.fn()
        vi.mocked(useState).mockReturnValue(['', mockFn])
        const { result } = renderHook(() => useUserHook())
        const event = {currentTarget: { value: 'John' }} as unknown as ChangeEvent<HTMLInputElement>
        result.current.handleOnChange(event)
        expect(mockFn).toBeCalledTimes(1)
        expect(result.current.handleOnChange(event)).toBe('John')
    })

    test('should call addUserMutation when handleOnSubmit', () => {
        vi.mock(import("react"), async (importOriginal) => {
            const actual = await importOriginal()
            return {
                ...actual,
                useState: vi.fn().mockReturnValue(['test', vi.fn()])
            }
        })
        const mockFn = vi.fn()
        vi.mocked(useState).mockReturnValue(['test', mockFn])

        const { result } = renderHook(() => useUserHook())
        const event = {preventDefault: vi.fn()} as unknown as MouseEvent<HTMLButtonElement>
        result.current.handleOnSubmit(event)
        expect(addUserMutationMock).toBeCalledTimes(1)
        expect(addUserMutationMock).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'test',
            })
        )
    })
})