<script setup lang="ts">
import GlobalTable from '../../components/table/_table.vue'
import type { Icolumns } from '@/types/users'
import { useUsersStore } from '@/stores/users';
import { onMounted } from 'vue';
import Drawer from '../../components/drawer/_draver.vue'
import ChartJS from '../../components/analitika/_analitiks.vue'

const sampleColumns: Icolumns[] = [
  { field: 'id', header: 'ID' },
  { field: 'first_name', header: 'First Name' },
  { field: 'last_name', header: 'Last Name' },
  { field: 'email', header: 'Email' },
  { field: 'age', header: 'Age' },
  {
    field: 'status',
    header: 'Status',
    slot: {
      functional: true,
      template: `<p :class="data.status === 'active' ? 'activeStatus' : 'noActiveStatus'">{{ data.status }}</p>`,
    },
  },
  {
    field: 'actions',
    header: 'Actions',
    slot: {
      functional: true,
      template: `
         <div class="actions">
          <Button class="update-btn"> <i class="pi pi-pencil"></i> </Button>
          <Button class="delete" @click="() => handleDelete(data.id)"> <i class="pi pi-trash"></i> </Button>
          </div>
      `,
    },
  },
]

const { users, getUsers, deleteUser } = useUsersStore()

onMounted(() => {
  getUsers()
})



const handleDelete = async (id: string) => {
  await deleteUser(id)
}
</script>

<template>
  <div>
    <div class="container">
      <div class="add-users">
        <h1>User List</h1>
        <Drawer title="Add"/>
      </div>
      <GlobalTable :columns="sampleColumns" :data="users" :handleDelete="handleDelete" />

      <div class="chart">
        <ChartJS/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  max-width: 1440px;
  margin: 0 auto;
}

.add-users{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
}

.chart{
  margin-top: 80px;
}
</style>
