import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'
import Button from "./Button"

describe('Test group of Button component', () => {
    const text = "This is Button"
    // snapshot test
    test("Snapshot Test > renders Button component", () => {
        const { asFragment } = render(
            <Button>
                {text}
            </Button>
        )
        expect(asFragment()).toMatchSnapshot()
    })
    
    test("renders Button component", () => {
        render(
            <Button>
                {text}
            </Button>
        )
        expect(screen.getByRole('button')).toBeInTheDocument()   
    })
    
    test("when clicked, 'mockFn' is called once", async () => {
        const mockFn = vi.fn()
        render(
            <Button          
                onClick={() => {mockFn()}}
            >
                {text}
            </Button>
        )
        const ButtonComponent = screen.getByRole('button')
        expect(ButtonComponent).toBeInTheDocument()
        await waitFor(() => userEvent.click(ButtonComponent))
        expect(mockFn).toBeCalled()
        expect(mockFn).toBeCalledTimes(1)
    })
})