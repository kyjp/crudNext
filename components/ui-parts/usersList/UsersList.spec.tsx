import { useSearchHook } from "@/hooks/useSearchHook"
import { useUsersHook } from "@/hooks/useUsersHook"
import { Mock } from "vitest"
import UsersList from "./UsersList"
import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'

vi.mock('../../../hooks/useSearchHook')
vi.mock('../../../hooks/useUsersHook')

const mockUseUsersHook = useUsersHook as unknown as Mock
const mockUseSearchHook = useSearchHook as unknown as Mock

describe('Test group of UsersList Component', () => {
    const mockHandleClick = vi.fn()

    beforeEach(() => {
        mockUseUsersHook.mockImplementation(() => ({
            isLoading: false,
            error: null
        }))
        mockUseSearchHook.mockImplementation(() => ({
            usersData: [],
            currentPage: 1,
            LIMIT: 5,
            handleOnClick: mockHandleClick
        }))
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    test('renders loading state', () => {
        mockUseUsersHook.mockImplementation(() => ({
            isLoading: true,
            error: null
        }))
        render(<UsersList />)
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    test('renders error state', () => {
        mockUseUsersHook.mockImplementation(() => ({
            isLoading: false,
            error: {message: 'Something went wrong'}
        }))
        render(<UsersList />)
        expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument()
    })

    test('renders no data message', () => {
        render(<UsersList />)
        expect(screen.getByText('件数は0件です。')).toBeInTheDocument()
    })

    test('renders users list', () => {
        const mockUsersData = [
            {
                id: 1,
                name: 'User One'
            },
            {
                id: 2,
                name: 'User Two'
            }
        ]
        mockUseSearchHook.mockImplementation(() => ({
            usersData: mockUsersData,
            currentPage: 1,
            LIMIT: 5,
            handleOnClick: mockHandleClick
        }))
        render(<UsersList />)
        expect(screen.getByText('User One')).toBeInTheDocument()
        expect(screen.getByText('User Two')).toBeInTheDocument()
    })

    test('handlers pagination click', () => {
        const mockUsersData = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            name: `User ${i + 1}`,
        }))
        mockUseSearchHook.mockImplementation(() => ({
            usersData: mockUsersData,
            currentPage: 1,
            LIMIT: 5,
            handleOnClick: mockHandleClick
        }))
        render(<UsersList />)
        const nextButton = screen.getByText('Next')
        fireEvent.click(nextButton)
        expect(mockHandleClick).toHaveBeenCalledTimes(1)
    })
})