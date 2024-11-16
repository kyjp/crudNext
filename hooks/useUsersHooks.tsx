import { useQuery } from '@tanstack/react-query'

export const useUsersHook = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['fetchUsers'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`)
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            return res.json()
        }
    })

    return {
        isLoading,
        error,
        data
    }
}