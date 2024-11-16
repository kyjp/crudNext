import React, { ComponentPropsWithoutRef, FC } from 'react'

type InputTextType = ComponentPropsWithoutRef<'input'>

const InputText: FC<InputTextType> = (props) => {
    const { className, value, onChange, placeholder } = props
    return (
        <input
            className={`text-base px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5${className && ` ${className}`}`}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

export default InputText