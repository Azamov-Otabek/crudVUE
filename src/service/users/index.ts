import { httpClient } from "@/config/axios.config";
import type { IusersService, Users } from "@/types/users";




export const serviceParams:IusersService = {
  getUsers: () => httpClient.get('/users'),
  addUser: (data: Users) => httpClient.post('/users', data),
  updateUser: (id: string, data: Users) => httpClient.put(`/users/${id}`, data),
  deleteUser: (id: string) => httpClient.delete(`/users/${id}`)
}
