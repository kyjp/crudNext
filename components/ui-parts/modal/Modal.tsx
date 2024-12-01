'use client'
import Button from '@/components/ui-elements/button/Button'
import { useModalHook } from '@/hooks/useModalHook'
import React, { ComponentPropsWithoutRef, FC } from 'react'

type ModalType = ComponentPropsWithoutRef<'div'>

const Modal: FC<ModalType> = ({
    children
}) => {
    const {modalFlg, handleOnClick} = useModalHook()
    return (
        <>
            <Button
                className="bg-green-600 hover:bg-green-800 font-bold"
                onClick={handleOnClick}
            >
                追加する
            </Button>
            <div
                tabIndex={-1}
                className={`${!modalFlg ? 'hidden ' : '' } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full flex`}
            >
                <div
                    className="fixed top-0 left-0 w-screen h-screen bg-black/70 hover:cursor-pointer"
                    onClick={handleOnClick}
                />
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <button
                            type="button"
                            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" 
                            onClick={handleOnClick}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal