i<script setup lang="ts">
import { defineProps } from 'vue'
import type { Users, Icolumns } from '@/types/users'
import Dravver from '../drawer/_draver.vue';

defineProps<{
  data: Users[]
  columns: Icolumns[]
  handleDelete: (id: string) => void
}>()
</script>

<template>
  <div>
    <DataTable :value="data" :responsiveLayout="'scroll'">
      <template v-for="(col, index) in columns" :key="index">
        <Column v-if="!col.slot" :field="col.field" :header="col.header" />
        <Column v-else :header="col.header">
          <template #body="slotProps">
            <div v-if="col.field === 'status'">
              <span
                :class="{
                  activeStatus: slotProps.data[col.field] === 'active',
                  noActiveStatus: slotProps.data[col.field] !== 'active',
                }"
              >

                {{ slotProps.data[col.field] }}
              </span>
            </div>
            <div v-else-if="col.field === 'actions'" class="actions">
              <Dravver title="update" :datas="slotProps.data"/>
              <Button severity="danger" @click="() => handleDelete(slotProps.data.id)">
                <i class="pi pi-trash"></i>
              </Button>
            </div>
          </template>
        </Column>
      </template>
    </DataTable>
  </div>
</template>

<style lang="scss" src="./_style.scss"></style>
