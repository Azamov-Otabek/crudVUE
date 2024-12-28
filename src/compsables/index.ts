import { useQuery } from '@tanstack/vue-query'
import { httpClient } from '@/config/axios.config'
import type { Users } from '@/types/users'

const changeMethods = async (method: string, URL:string, obj?:Users) => {
  switch(method) {
    case 'GET':
      return await httpClient.get(URL)
    case 'POST':
      return await httpClient.post(URL, obj)
    case 'PUT':
      return await httpClient.put(URL, obj)
    case 'DELETE':
      return await httpClient.delete(URL)
    default:
      throw new Error('Invalid HTTP method')
  }
}


export const useFetching = (key:string, method: string, URL:string,  obj?:Users) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: key ? [key] : ['GET'],
    queryFn: async () => changeMethods(method, URL, obj),
  })
  return {
    isPending,
    isError,
    data,
    error,
  }
}
