
import { Mock, vi } from 'vitest'
import { useSearchHook } from './useSearchHook'
import { useUsersDataStore } from '@/features/useUsersDataStore'
import { useUsersHook } from './useUsersHook'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { usePageStore } from '@/features/usePageStore'
import { renderHook } from '@testing-library/react'

vi.mock('../features/usePageStore')
vi.mock('../features/useUsersDataStore')
vi.mock('./useUsersHook')

const mockUsePageStore = usePageStore as unknown as Mock
const mockUseUsersDataStore = useUsersDataStore as unknown as Mock
const mockUseUsersHook = useUsersHook as unknown as Mock

describe('test useSearchHookStore group', () => {
    const setCurrentPageMock = vi.fn()
    const setUsersDataMock = vi.fn()
    beforeEach(() => {
        // useUsersDataStore のモックを設定
        mockUseUsersDataStore.mockImplementationOnce(() => [
            {
                id: '1',
                name: 'John Doe',
                created_at: '2019-02-02T00:00:00.000Z',
                updated_at: '2019-02-02T00:00:00.000Z',
            }
        ]).mockImplementationOnce(() => setUsersDataMock)

        // mockUsePageStore のモック
        mockUsePageStore.mockImplementationOnce(() => 0).mockImplementationOnce(() => setCurrentPageMock)

        // mockUseUsersHook のモック
        mockUseUsersHook.mockImplementation(() => ({
            isLoading: false,
            error: null,
            data: []
        }))
    })

    afterEach(() => {
        mockUsePageStore.mockClear()
        mockUseUsersDataStore.mockClear()
        mockUseUsersHook.mockClear()
        setCurrentPageMock.mockClear()
        setUsersDataMock.mockClear()
    })

    test('should call setCurrentPage when page is changed', () => {
        const { result } = renderHook(() => useSearchHook())
        // クリックイベントを模倣
        result.current.handleOnClick({ currentTarget: { innerText: 'Next' }, preventDefault: vi.fn() } as unknown as MouseEvent<HTMLButtonElement>)
        expect(setCurrentPageMock).toHaveBeenCalledWith(1)
    })

    test('should call setUsersData when button clicked', () => {
        const { result } = renderHook(() => useSearchHook())
        result.current.handleOnSubmit({ currentTarget: { innerText: '検索' }, preventDefault: vi.fn() } as unknown as MouseEvent<HTMLButtonElement>)
        expect(setCurrentPageMock).toHaveBeenCalledWith(1)
        expect(setUsersDataMock).toHaveBeenCalledTimes(2)
        expect(setUsersDataMock).toHaveBeenCalledWith([])
    })

    test('should call setSearchQuery when inputText changed', async () => {
        vi.mock(import("react"), async (importOriginal) => {
            const actual = await importOriginal()
            return {
              ...actual,
              useState: vi.fn().mockReturnValue(['', vi.fn()]),
            }
        })
        const mockFn = vi.fn()
        vi.mocked(useState).mockReturnValue(['', mockFn])

        const { result } = renderHook(() => useSearchHook())

        // handleOnChangeを呼び出し
        const event = { currentTarget: { value: '新しいテスト' } } as unknown as ChangeEvent<HTMLInputElement>
        result.current.handleOnChange(event)

        // 期待値の確認
        expect(mockFn).toBeCalledTimes(1)
        expect(result.current.handleOnChange(event)).toBe('新しいテスト')
    })

    test('should call handleSelect when select changed', async () => {
        const { result } = renderHook(() => useSearchHook())
        result.current.handleOnSelect({ currentTarget: { value: 'old' }, preventDefault: vi.fn() } as unknown as ChangeEvent<HTMLSelectElement>)
        expect(setCurrentPageMock).toHaveBeenCalledWith(1)
        expect(setUsersDataMock).toHaveBeenCalledTimes(2)
        expect(setUsersDataMock).toHaveBeenCalledWith([])
    })

    test('verifying the operation of quicksort', async () => {
        const { result } = renderHook(() => useSearchHook())
        const arr = [
            {
                id: '1',
                name: 'John Doe',
                created_at: '2019-02-02T00:00:00.000Z',
                updated_at: '2019-02-02T00:00:00.000Z',
            },
            {
                id: "2",
                name: "Hays Workman",
                created_at: "2014-08-08T03:14:44 -09:00",
                updated_at: "2016-02-24T04:06:54 -09:00"
            },
            {
                id: "3",
                name: "Kerry Shannon",
                created_at: "2014-02-07T08:20:49 -09:00",
                updated_at: "2020-06-11T01:45:58 -09:00"
            },
        ]
        const quickSort = result.current.quickSort
        const oldSortArr = await quickSort(arr, 'old')
        const newSortArr = await quickSort(arr, 'new')
        const nameSortArr = await quickSort(arr, 'name')
        expect(oldSortArr).toEqual(
            [
                {
                    id: "3",
                    name: "Kerry Shannon",
                    created_at: "2014-02-07T08:20:49 -09:00",
                    updated_at: "2020-06-11T01:45:58 -09:00"
                },
                {
                    id: "2",
                    name: "Hays Workman",
                    created_at: "2014-08-08T03:14:44 -09:00",
                    updated_at: "2016-02-24T04:06:54 -09:00"
                },
                {
                    id: '1',
                    name: 'John Doe',
                    created_at: '2019-02-02T00:00:00.000Z',
                    updated_at: '2019-02-02T00:00:00.000Z',
                },
            ],
        )
        expect(newSortArr).toEqual(
            [
                {
                    id: '1',
                    name: 'John Doe',
                    created_at: '2019-02-02T00:00:00.000Z',
                    updated_at: '2019-02-02T00:00:00.000Z',
                },
                {
                    id: "2",
                    name: "Hays Workman",
                    created_at: "2014-08-08T03:14:44 -09:00",
                    updated_at: "2016-02-24T04:06:54 -09:00"
                },
                {
                    id: "3",
                    name: "Kerry Shannon",
                    created_at: "2014-02-07T08:20:49 -09:00",
                    updated_at: "2020-06-11T01:45:58 -09:00"
                },
            ],
        )
        expect(nameSortArr).toEqual(
            [
                {
                    id: "2",
                    name: "Hays Workman",
                    created_at: "2014-08-08T03:14:44 -09:00",
                    updated_at: "2016-02-24T04:06:54 -09:00"
                },
                {
                    id: '1',
                    name: 'John Doe',
                    created_at: '2019-02-02T00:00:00.000Z',
                    updated_at: '2019-02-02T00:00:00.000Z',
                },
                {
                    id: "3",
                    name: "Kerry Shannon",
                    created_at: "2014-02-07T08:20:49 -09:00",
                    updated_at: "2020-06-11T01:45:58 -09:00"
                },
            ],
        )
    })
})