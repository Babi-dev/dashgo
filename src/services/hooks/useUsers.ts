import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "../api";

type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

type GetUserResponse = {
  users: User[]
  totalCount: number
}

export async function getUsers(page: number): Promise<GetUserResponse> {
  const { data, headers } = await api.get('/users', {
    params: {
      page,
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map(user => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }))

  return { users, totalCount }
}

export function useUsers(page: number, options: UseQueryOptions) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  })
}