import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useUsersHook = () => {
    const queryClient = useQueryClient()
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

    const addUserMutation = useMutation({
        mutationFn: async (user) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user
                })
            })
            if(!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`)
            }
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetchUsers'] })
        }
    })

    return {
        isLoading,
        error,
        data,
        addUserMutation
    }
}