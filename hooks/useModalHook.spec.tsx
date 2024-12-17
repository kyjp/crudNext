import { renderHook } from '@testing-library/react'
import { MouseEvent, useState } from 'react'
import { vi } from 'vitest'
import { useModalHook } from './useModalHook'

describe('test useModalHook group', () => {
    test('should call setModalFlg when handleOnClick', () => {
        vi.mock(import("react"), async (importOriginal) => {
            const actual = await importOriginal()
            return {
                ...actual,
                useState: vi.fn().mockReturnValue(['', vi.fn()])
            }
        })
        const mockFn = vi.fn()
        vi.mocked(useState).mockReturnValue([false, mockFn])
        const { result } = renderHook(() => useModalHook())
        const event = {preventDefault: vi.fn()} as unknown as MouseEvent<HTMLButtonElement>
        result.current.handleOnClick(event)
        expect(mockFn).toHaveBeenCalledTimes(1)
    })
})