import { usePageStore } from "@/features/usePageStore"
import { useUsersDataStore } from "@/features/useUsersDataStore"
import { renderHook } from "@testing-library/react"
import { UserDataType, useSearchHook } from "./useSearchHooks"
import { act, ChangeEvent, MouseEvent } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

vi.mock('@/features/useUsersDataStore', () => ({
    useUsersDataStore: vi.fn(() => ({
        usersData: [
            { id: '1', name: 'Alice', created_at: '2003-12-07T04:19:16 -09:00', updated_at: '2003-12-07T04:19:16 -09:00' },
            { id: '2', name: 'Bob', created_at: '2003-12-08T04:19:16 -09:00', updated_at: '2003-12-08T04:19:16 -09:00' },
        ],
        setUsersData: vi.fn()
    }))
}))


vi.mock('@/features/usePageStore', () => ({
    usePageStore: vi.fn(() => ({
        currentPage: 1,
        setCurrentPage: vi.fn(),
    }))
}))

beforeEach(() => {
})

describe('test useSearchHook group', () => {
    test('should update searchQuery correctly', () => {
        const { result } = renderHook(() => useSearchHook(), {
            wrapper: ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            )
        })
        expect(result.current.searchQuery).toBe('')
        act(() => {
            result.current.handleOnChange({preventDefault: vi.fn(), currentTarget: {value: 'test'}}  as unknown as ChangeEvent<HTMLInputElement>)
        })
        expect(result.current.searchQuery).toBe('test')
    })
    
    test('should change page on button click', () => {
        const { result } = renderHook(() => useSearchHook(), {
            wrapper: ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            )
        })
        expect(result.current.currentPage).toBe(1)
        act(() => {
            result.current.handleOnClick({ preventDefault: vi.fn(), currentTarget: { innerText: 'Next' } } as unknown as MouseEvent<HTMLButtonElement>)
        })
        expect(usePageStore.getState().setCurrentPage).toHaveBeenCalledWith(2)
        act(() => {
            result.current.handleOnClick({preventDefault: vi.fn(), currentTarget: {innerText: 'Previous'}} as unknown as MouseEvent<HTMLButtonElement>)
        })
        expect(usePageStore.getState().setCurrentPage).toHaveBeenCalledWith(1)
    })

    test('should filter users by search query', async () => {
        const mockData = [
            { id: '1', name: 'Alice', created_at: '2003-12-07T04:19:16 -09:00', updated_at: '2003-12-07T04:19:16 -09:00' },
            { id: '2', name: 'Bob', created_at: '2003-12-08T04:19:16 -09:00', updated_at: '2003-12-08T04:19:16 -09:00' },
        ]
        const { result } = renderHook(() => useSearchHook(), {
            wrapper: ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            )
        })
        act(() => {
            result.current.handleOnChange({preventDefault: vi.fn(), currentTarget: {value: 'Alice'}} as unknown as ChangeEvent<HTMLInputElement>)
        })
        await act(async () => {
            await result.current.handleOnSubmit({ preventDefault: vi.fn(), currentTarget: { innerText: 'Submit' } } as unknown as MouseEvent<HTMLButtonElement>)
        })
        expect(useUsersDataStore.getState().setUsersData).toHaveBeenCalledWith([mockData[0]])
    })

    test('should sort users data by name correctly', async () => {
        const { result } = renderHook(() => useSearchHook(), {
            wrapper: ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            )
        })
        act(() => {
            result.current.handleOnSelect({preventDefault: vi.fn(), currentTarget: {value: 'name'}} as unknown as ChangeEvent<HTMLSelectElement>)
        })
        expect(result.current.usersData[0].name).toBe('Alice')
        expect(result.current.usersData[1].name).toBe('Bob')
    })
    
    test('should sort users data by new correctly', async () => {
        const { result } = renderHook(() => useSearchHook(), {
            wrapper: ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            )
        })
        act(() => {
            result.current.handleOnSelect({preventDefault: vi.fn(), currentTarget: {value: 'new'}} as unknown as ChangeEvent<HTMLSelectElement>)
        })
        expect(result.current.usersData[0].name).toBe('Bob')
        expect(result.current.usersData[1].name).toBe('Alice')
    })
    
    test('should sort users data by old correctly', async () => {
        const { result } = renderHook(() => useSearchHook(), {
            wrapper: ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            )
        })
        act(() => {
            result.current.handleOnSelect({preventDefault: vi.fn(), currentTarget: {value: 'old'}} as unknown as ChangeEvent<HTMLSelectElement>)
        })
        expect(result.current.usersData[0].name).toBe('Alice')
        expect(result.current.usersData[1].name).toBe('Bob')
    })
})