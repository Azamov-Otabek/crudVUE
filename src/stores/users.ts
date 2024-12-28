import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { serviceParams } from '@/service/users'
import type { Users } from '@/types/users'
import { toast } from 'vue3-toastify'

export const useUsersStore = defineStore('users', () => {
  const users:Users[] = reactive([])
  const getUsers = async () => {
    try {
      const response = await serviceParams.getUsers()
      users.splice(0, users.length, ...response.data);
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  const addUser = async (data: Users) => {
    try {
      const response = await serviceParams.addUser(data)
      if(response.status == 201){
        toast.success('User added successfully', {autoClose: 1500})
        users.push(response.data)
      }
    } catch (err:any) {
      toast.error('Error adding user:', err)
    }
  }
  const updateUser = async (id: string, data: Users) => {
    try {
      const response = await serviceParams.updateUser(id, data)
      if(response.status == 200){
        toast.success('User updated successfully', {autoClose: 1500})
        users.splice(users.findIndex(user => user.id === data.id), 1, data)
      }else{
        toast.error('Failed to update user', {autoClose: 1500})
      }
    } catch (err:any) {
      toast.error('Error updating user:', err)
    }
  }
  const deleteUser = async (id: string) => {
    try {
      const response = await serviceParams.deleteUser(id)
      console.log(response)
      if(response.status == 200){
          toast.success('User deleted successfully', {autoClose: 1500})
          users.splice(users.findIndex(user => user.id === id), 1)
      }else{
        toast.error('Failed to delete user', {autoClose: 1500})
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return { users, getUsers, addUser, updateUser, deleteUser }
})
