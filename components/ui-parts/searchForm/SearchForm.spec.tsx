import { fireEvent, render, screen } from "@testing-library/react"
import SearchForm from "./SearchForm"
import { useSearchHook } from "@/hooks/useSearchHook"
import { Mock } from "vitest"
import '@testing-library/jest-dom'

vi.mock('../../../hooks/useSearchHook')
const mockUseSearchHook = useSearchHook as unknown as Mock

describe('Test group of serchForm Component', () => {
    const mockHandleOnChange = vi.fn()
    const mockHandleOnSubmit = vi.fn()
    const mockHandleOnSelect = vi.fn()

    beforeEach(() => {
        mockUseSearchHook.mockImplementation(() => ({
            searchQuery: '',
            handleOnChange: mockHandleOnChange,
            handleOnSubmit: mockHandleOnSubmit,
            handleOnSelect: mockHandleOnSelect
        }))
    })

    afterEach(() => {
        mockHandleOnChange.mockClear()
        mockHandleOnSubmit.mockClear()
        mockHandleOnSelect.mockClear()
    })
    test('renders input, button, and select elements', () => {
        render(<SearchForm />)
        expect(screen.getByPlaceholderText('キーワード：名前')).toBeInTheDocument()
        expect(screen.getByText('検索')).toBeInTheDocument()
        expect(screen.getByText('並び順')).toBeInTheDocument()
    })
    test('handles input change', async () => {
        render(<SearchForm />)
        const input = screen.getByPlaceholderText('キーワード：名前')
        await fireEvent.change(input, {target: {value: 'test query'}})
        expect(mockHandleOnChange).toHaveBeenCalledTimes(1)
    })
    test('handles button click', () => {
        render(<SearchForm />)
        const button = screen.getByText('検索')
        button.setAttribute('type', 'button')
        fireEvent.click(button)
        expect(mockHandleOnSubmit).toHaveBeenCalledTimes(1)
    })
    test('handles select change', () => {
        render(<SearchForm />)
        const select = screen.getByText('並び順').closest('select') as HTMLSelectElement
        fireEvent.change(select, {target: {value: 'new'}})
        expect(mockHandleOnSelect).toHaveBeenCalledTimes(1)
    })
})