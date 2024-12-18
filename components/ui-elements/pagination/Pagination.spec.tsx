import { fireEvent, render, screen } from "@testing-library/react"
import Pagination from "./Pagination"
import '@testing-library/jest-dom'

describe('Test group of Pagenation component', () => {
    const onClickMock = vi.fn()
    afterEach(() => {
        onClickMock.mockClear()
    })
    test('Snapshot Test > renders Pagination component', () => {
        const {asFragment} = render(
            <Pagination
                currentPage={3}
                limit={10}
                count={50}
                onClick={onClickMock}
            />
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("should highlight the current page", async () => {
        render(
            <Pagination
                currentPage={3}
                limit={10}
                count={50}
                onClick={onClickMock}
            />
        )
        const currentPageButton = screen.getByText('3')
        expect(currentPageButton).toHaveClass('font-bold')
    })

    test('should call onClick when a page number is clicked', () => {
        render(
            <Pagination
                currentPage={3}
                limit={10}
                count={50}
                onClick={onClickMock}
            />
        )
        const pageButton = screen.getByText('3')
        fireEvent.click(pageButton)
        expect(onClickMock).toHaveBeenCalledTimes(1)
    })

    test('should call onClick when the next button is clicked', () => {
        render(
            <Pagination
                currentPage={3}
                limit={10}
                count={50}
                onClick={onClickMock}
            />
        )
        const prevButton = screen.getByText('Previous').closest('button') as HTMLButtonElement
        fireEvent.click(prevButton)
        expect(onClickMock).toHaveBeenCalledTimes(1)
    })

    test('should call onClick when the next button is called', () => {
        render(
            <Pagination
                currentPage={3}
                limit={10}
                count={50}
                onClick={onClickMock}
            />
        )
        const nextButton = screen.getByText('Next').closest('button') as HTMLButtonElement
        fireEvent.click(nextButton)
        expect(onClickMock).toHaveBeenCalledTimes(1)
    })

    test('shold render previous and next buttons', () => {
        render(
            <Pagination
                currentPage={3}
                limit={10}
                count={50}
                onClick={onClickMock}
            />
        )
        expect(screen.getByText('Previous').closest('button') as HTMLButtonElement).toBeInTheDocument()
        expect(screen.getByText('Next').closest('button') as HTMLButtonElement).toBeInTheDocument()
    })

    test('should adjust page numbers when at the beginning of the list', () => {
        render(
            <Pagination
                currentPage={1}
                limit={10}
                count={50}
                onClick={onClickMock}
            />
        )
        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('3')).toBeInTheDocument()
        expect(screen.getByText('4')).toBeInTheDocument()
        expect(screen.getByText('5')).toBeInTheDocument()
    })

    test('should adjust page numbers when at the end of the list', () => {
        render(
            <Pagination
                currentPage={5}
                limit={10}
                count={50}
                onClick={onClickMock}
            />
        )
        expect(screen.getByText('3')).toBeInTheDocument()
        expect(screen.getByText('4')).toBeInTheDocument()
        expect(screen.getByText('5')).toBeInTheDocument()
    })
})