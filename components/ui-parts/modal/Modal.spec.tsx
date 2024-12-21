import { useModalHook } from "@/hooks/useModalHook"
import { fireEvent, render, screen } from "@testing-library/react"
import { Mock } from "vitest"
import Modal from "./Modal"
import '@testing-library/jest-dom'

vi.mock('../../../hooks/useModalHook')

const mockUseModalHook = useModalHook as unknown as Mock

describe('Test group od Modal Component', () => {
    const mockHandleOnClick = vi.fn()
    const mockModalFlg = false
    beforeEach(() => {
        mockUseModalHook.mockImplementation(() => ({
            modalFlg: mockModalFlg,
            handleOnClick: mockHandleOnClick
        }))
    })
    afterEach(() => {
        mockUseModalHook.mockClear()
        mockHandleOnClick.mockClear()
    })
    test('should render the button', () => {
        render(
            <Modal>Test modal content</Modal>
        )
        expect(screen.getByRole('button', { name: '追加する' })).toBeInTheDocument()
    })
    test('should toggle modal visibility when button is clicked', () => {
        render(
            <Modal>Test modal content</Modal>
        )
        const button = screen.getByRole('button', { name: '追加する' })
        expect(button).toBeInTheDocument()
        fireEvent.click(button)
        expect(mockHandleOnClick).toBeCalledTimes(1)
        mockUseModalHook.mockImplementation(() => ({
            modalFlg: !mockModalFlg,
            handleOnClick: mockHandleOnClick
        }))
        render(<Modal>Test Modal Content</Modal>)
        expect(screen.getByText('Test Modal Content')).toBeInTheDocument()
    })
    test('should close modal when clicking background overlay', () => {
        mockUseModalHook.mockImplementation(() => ({
            modalFlg: !mockModalFlg,
            handleOnClick: mockHandleOnClick
        }))
        render(<Modal>Test Modal Content</Modal>)
        const background = screen.getByTestId('modal-overlay')
        fireEvent.click(background)
        expect(mockHandleOnClick).toHaveBeenCalledTimes(1)
        expect(screen.getByText('Test Modal Content')).toBeInTheDocument()
    })
    test('should close modal when clicking close button', () => {
        mockUseModalHook.mockImplementation(() => ({
            modalFlg: !mockModalFlg,
            handleOnClick: mockHandleOnClick
        }))
        render(<Modal>Test Modal Content</Modal>)
        const closeButton = screen.getByRole('button', { name: /Close modal/i })
        fireEvent.click(closeButton)
        expect(mockHandleOnClick).toHaveBeenCalledTimes(1)
    })
})