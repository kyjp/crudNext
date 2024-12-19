import { act, fireEvent, render, screen } from "@testing-library/react"
import AddUserForm from "./AddUserForm"
import { useUserHook } from "@/hooks/useUserHook"
import { Mock } from "vitest"
import '@testing-library/jest-dom'

vi.mock('../../../hooks/useUserHook')

const mockUseUserHook = useUserHook as unknown as Mock

describe('Test group of AddUserForm Component', () => {
    const handleOnChange = vi.fn()
    const handleOnSubmit = vi.fn()
    const mockName = "John Doe"

    beforeEach(() => {
        mockUseUserHook.mockImplementation(() => ({
            name: mockName,
            handleOnChange,
            handleOnSubmit
        }))
    })
    
    afterEach(() => {
        mockUseUserHook.mockClear()
    })

    test('should render input and button correctly', () => {
        render(
          <AddUserForm />  
        )
        expect(screen.getByPlaceholderText('ユーザー名')).toBeInTheDocument()
        expect(screen.getByText('追加する')).toBeInTheDocument()
    })

    test('should call handleOnChange when input value changes', async () => {
        render(<AddUserForm />)
        const input = screen.getByPlaceholderText('ユーザー名')
        await act(async () => {
            fireEvent.change(input, {target: {value: 'New User'}})
        })
        expect(handleOnChange).toHaveBeenCalledTimes(1)
    })

    test('should call handleOnSubmit when form is submitted form is submitted', async () => {
        render(<AddUserForm />)
        const button = screen.getByText('追加する')
        await act(async () => {
            fireEvent.click(button)
        })
        expect(handleOnSubmit).toHaveBeenCalledTimes(1)
    })

    test('should display the initial name in the input field', () => {
        render(<AddUserForm />)
        const input = screen.getByPlaceholderText('ユーザー名')
        expect(input).toHaveValue(mockName)
    })
})