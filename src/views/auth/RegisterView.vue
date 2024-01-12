<script setup>
import {ref} from 'vue';

import Password from "primevue/password";
import Calendar from 'primevue/calendar';
import {userService} from "@/services/UserService.js";
import {useUserStore} from "@/stores/user.js";
import router from "@/router/index.js";
import {apiClient} from "@/services/ApiClient.js";

let userStore = useUserStore();

const user = ref({});

function register() {
  userService.register(user.value)
      .then((response) => {
        userStore.user = response.data;
        localStorage.setItem('loggedUser', JSON.stringify(response.data));
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.headers.getAuthorization()}`
        router.push({name: 'home'});
      })
      .catch(err => {
        if (err?.response?.status === 409) {
          console.log(err.response.data.message);
        } else {
          router.push({name: 'error'});
        }
      })
}

</script>

<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <img src="@/assets/logo.svg" alt="RideShare logo" class="mb-5 w-4 flex-shrink-0"/>
      <div
          style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Welcome</div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>

          <form @submit.prevent="register">
            <label for="firstName" class="block text-900 text-xl font-medium mb-2">First Name</label>
            <InputText id="firstName" type="text" placeholder="First Name" class="w-full md:w-30rem mb-5 p-3"
                       v-model="user.firstName"/>

            <label for="lastName" class="block text-900 text-xl font-medium mb-2">Last Name</label>
            <InputText id="lastName" type="text" placeholder="Last Name" class="w-full md:w-30rem mb-5 p-3"
                       v-model="user.lastName"/>

            <label for="birthDate" class="block text-900 text-xl font-medium mb-2">Birth Date</label>
            <Calendar id="birthDate" dateFormat="dd/mm/yy" placeholder="Date" :maxDate="new Date()" showIcon
                      class="w-full md:w-30rem mb-5" :inputStyle="{ padding: '1rem' }"
                      v-model="user.birthDate"/>

            <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
            <InputText id="email" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5 p-3"
                       v-model="user.email"/>

            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
            <Password id="password1" placeholder="Password" :toggleMask="true" class="w-full mb-6"
                      inputClass="w-full" :inputStyle="{ padding: '1rem' }"
                      v-model="user.password">
            </Password>

            <Button type="submit" label="Register" class="w-full p-3 text-xl"></Button>

            <router-link to="/auth/login" class="text-blue-500">Already have an account. Login</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
