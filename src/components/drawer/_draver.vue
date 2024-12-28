<script setup lang="ts">
import { ref, computed } from "vue";
import { toast } from "vue3-toastify";
import { useUsersStore } from "@/stores/users";
import { defineProps } from "vue";
import type { Users } from "@/types/users";

const visible = ref(false);
const {addUser, updateUser} = useUsersStore()

const props = defineProps<{
  title: string,
  datas?: Users,
}>()



const formData = ref({
  first_name: props.datas?.first_name || '',
  last_name:  props.datas?.last_name || '',
  age: props.datas?.age ||  0,
  id: props.datas?.id || '',
  email: props.datas?.email || '',
  status: props.datas?.status || ''
});

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' }
];

// Validation computed properties
const firstNameValid = computed(() => formData.value.first_name.trim() !== '');
const lastNameValid = computed(() => formData.value.last_name.trim() !== '');
const ageValid = computed(() => formData.value.age !== null && formData.value.age > 0);
const emailValid = computed(() => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.value.email));
const statusValid = computed(() => formData.value.status !== '');

const submitForm = async() => {
  if (firstNameValid.value && lastNameValid.value && ageValid.value && emailValid.value && statusValid.value) {
      if(props.title == 'Add'){
        formData.value.id = String(Math.floor(Date.now()) + 1);
        await addUser(formData.value);

        formData.value = {
        first_name: '',
        last_name: '',
        age: 0,
        id: '',
        email: '',
        status: ''
  }
      }else{
        await updateUser(formData.value.id , formData.value);
      }
  } else {
    toast.error('Please enter a fill in the form')
  }
  visible.value = false;

};
</script>

<template>
  <div class="card flex justify-center">
      <Drawer class="add-user" position="right" v-model:visible="visible">
        <form @submit.prevent="submitForm">
          <div class="p-field" :class="{ 'p-invalid': !firstNameValid }">
            <label for="first_name">First Name</label>
            <InputText id="first_name" v-model="formData.first_name" placeholder="Enter first name" />
            <span v-if="!firstNameValid" class="p-error">First name is required.</span>
          </div>
          <div class="p-field" :class="{ 'p-invalid': !lastNameValid }">
            <label for="last_name">Last Name</label>
            <InputText id="last_name" v-model="formData.last_name" placeholder="Enter last name" />
            <span v-if="!lastNameValid" class="p-error">Last name is required.</span>
          </div>
          <div class="p-field" :class="{ 'p-invalid': !ageValid }">
            <label for="age">Age</label>
            <InputNumber class="age-input" id="age" v-model="formData.age" :min="1" placeholder="Enter age" />
            <span v-if="!ageValid" class="p-error">Age is required and must be greater than 0.</span>
          </div>
          <div class="p-field" :class="{ 'p-invalid': !emailValid }">
            <label for="email">Email</label>
            <InputText id="email" v-model="formData.email" placeholder="Enter email" />
            <span v-if="!emailValid" class="p-error">Please enter a valid email.</span>
          </div>
          <div class="p-field" :class="{ 'p-invalid': !statusValid }">
            <label for="status">Status</label>
            <Dropdown class="status" id="status" v-model="formData.status" :options="statusOptions" optionLabel="label" optionValue="value" placeholder="Select status" />
            <span v-if="!statusValid" class="p-error">Status is required.</span>
          </div>
          <div class="p-d-flex p-jc-center">
            <Button type="submit" style="width: 100%;">Submit</Button>
          </div>
        </form>
      </Drawer>
      <Button @click="visible = true">
        {{ props.title }} User
      </Button>
  </div>
</template>

<style lang="scss">
.add-user {
  width: 350px !important;
}

.p-field {
  margin-bottom: 20px;

  &.p-invalid input,
  &.p-invalid select {
    border-color: red;
  }

  label {
    display: block;
    margin-bottom: 2px;
    font-size: 13px;
  }

  input {
    width: 100%;
    margin-bottom: 10px;
  }

  .age-input {
    width: 100%;
  }

  .status {
    width: 100%;
  }

  .p-error {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }
}
</style>
