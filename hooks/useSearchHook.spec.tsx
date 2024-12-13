
import { Mock, vi } from 'vitest'
import { useSearchHook } from './useSearchHook'
import { useUsersDataStore } from '@/features/useUsersDataStore'
import { useUsersHook } from './useUsersHook'
import { MouseEvent } from 'react'
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
    const setSearchQueryMock = vi.fn()
    const setUsersDataMock = vi.fn()
    beforeAll(() => {
        // useUsersDataStore のモックを設定
        mockUseUsersDataStore.mockImplementationOnce(() => [
            {
                id: '1',
                name: 'John Doe',
                created_at: '2019-02-02T00:00:00.000Z',
                updated_at: '2019-02-02T00:00:00.000Z',
            }
        ]).mockImplementationOnce(() => vi.fn()) // 次回の呼び出し時には関数としてモックする
        
        // mockUsePageStore のモック
        mockUsePageStore.mockImplementationOnce(() => 0).mockImplementationOnce(() => setCurrentPageMock)

        // mockUseUsersHook のモック
        mockUseUsersHook.mockImplementation(() => ({
            isLoading: false,
            error: null,
            data: []
        }))
    })

    beforeEach(() => {
        mockUsePageStore.mockClear()
        mockUseUsersDataStore.mockClear()
        mockUseUsersHook.mockClear()
    })

    test('should call setCurrentPage when page is changed', () => {
        const { result } = renderHook(() => useSearchHook())
        // クリックイベントを模倣
        result.current.handleOnClick({ currentTarget: { innerText: 'Next' }, preventDefault: vi.fn() } as unknown as MouseEvent<HTMLButtonElement>)
        expect(setCurrentPageMock).toHaveBeenCalledWith(1)
    })

    test('should call setSearchQuery when button clicked', () => {
        const { result } = renderHook(() => useSearchHook())

        // setUsersDataが呼び出されたことを確認
        expect(setUsersDataMock).toHaveBeenCalled()

        // setUsersDataに渡されたデータの内容を確認
        expect(mockUseUsersDataStore()).toEqual([
            {
                id: '1',
                name: 'John Doe',
                created_at: '2019-02-02T00:00:00.000Z',
                updated_at: '2019-02-02T00:00:00.000Z',
            }
        ])

        result.current.handleOnSubmit({ currentTarget: { innerText: '検索' }, preventDefault: vi.fn() } as unknown as MouseEvent<HTMLButtonElement>)
        expect(setUsersDataMock).toHaveBeenCalledWith(mockUseUsersDataStore())
        expect(setSearchQueryMock).toHaveBeenCalledWith(1)
    })

})