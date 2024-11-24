import { render, screen } from "@testing-library/react"
import InputText from "./InputText"
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'


describe('Test group of InputText component', () => {
    const text = "This is InputText"
    // snapshot test
    test("Snapshot Test > renders InputText component", () => {
        const {asFragment} = render(
            <InputText/>
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("renders InputText component", async () => {
        render(
            <InputText
                placeholder={text}
            />
        )
        expect(await screen.getByPlaceholderText(text)).toBeInTheDocument()
    })

    test("are the characters you entered correct", async () => {
        render(
            <InputText
                placeholder={text}
            />
        )
        const inputElement: HTMLInputElement = screen.getByPlaceholderText(text)
        await userEvent.type(inputElement, text)
        expect(inputElement.value).toBe(text)
    })

    test("when typed, 'mockFn' is called once", async () => {
        const mockFn = vi.fn()
        render(
            <InputText
                placeholder={text}
                defaultValue={""}
                onChange={() => mockFn()}
            />
        )
        const inputElement: HTMLInputElement = screen.getByPlaceholderText(text)
        await userEvent.type(inputElement, "a")
        expect(mockFn).toBeCalled()
        expect(mockFn).toBeCalledTimes(1)
    })
})