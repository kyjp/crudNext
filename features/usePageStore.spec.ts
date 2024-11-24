import { act } from "react"
import { usePageStore } from "./usePageStore"


describe('test usePageStore group', () => {
    test('should have an initial currentPage value of 1', () => {
        const {currentPage} = usePageStore.getState()
        expect(currentPage).toBe(1)
    })

    test('should update currentPage correctly', () => {
        act(() => {
            usePageStore.getState().setCurrentPage(5)
        })
        const {currentPage} = usePageStore.getState()
        expect(currentPage).toBe(5)
    })    
})