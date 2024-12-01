
import { vi } from 'vitest'
import { useSearchHook } from './useSearchHook'
import { create } from 'zustand'
import { MouseEvent } from 'react'

const mockUsePageStore = create(() => ({
    currentPage: 0,
    setCurrentPage: vi.fn()
}))

vi.mock('../features/usePageStore', () => ({
    usePageStore: mockUsePageStore
}))

describe('test useSearchHookStore group', () => {
    const setCurrentPageMock = vi.fn()
    
    beforeEach(() => {
        // モックのsetCurrentPageを設定
        mockUsePageStore.setState({
          currentPage: 0,
          setCurrentPage: setCurrentPageMock
        })
    })

    test('should call setCurrentPage when page is changed', () => {
        const { handleOnClick } = useSearchHook()
        // クリックイベントを模倣
        handleOnClick({ currentTarget: { innerText: 'Next' }, preventDefault: vi.fn() } as unknown as MouseEvent<HTMLButtonElement>)
        expect(setCurrentPageMock).toHaveBeenCalledWith(1)
    })
})