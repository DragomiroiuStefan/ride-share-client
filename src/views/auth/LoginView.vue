<script setup>
import {ref} from 'vue';

import Password from "primevue/password";
import {useUserStore} from "@/stores/user.js";
import {userService} from "@/services/UserService.js";
import {apiClient} from "@/services/ApiClient.js";
import router from "@/router/index.js";
import {useRoute} from "vue-router";

let userStore = useUserStore();
const route = useRoute()

const email = ref('');
const password = ref('');

function login() {
  userService.login(email.value, password.value)
      .then((response) => {
        response.data.birthDate = new Date(response.data.birthDate);
        userStore.user = response.data;
        localStorage.setItem('loggedUser', JSON.stringify(response.data));
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.headers.getAuthorization()}`;
        localStorage.setItem('jwt', response.headers.getAuthorization());
        router.push(route.query.redirect || '/');
      })
      .catch(err => {
        if (err?.response?.status === 401) {
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
            <span class="text-600 font-medium">Login to continue</span>
          </div>

          <form @submit.prevent="login">
            <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
            <InputText id="email" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5"
                       style="padding: 1rem" v-model="email"/>

            <label for="password" class="block text-900 font-medium text-xl mb-2">Password</label>
            <Password id="password" v-model="password" placeholder="Password" :feedback="false" :toggleMask="true" class="w-full mb-6"
                      inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

            <Button type="submit" label="Login" class="w-full p-3 text-xl"></Button>

            <router-link to="/auth/register" class="text-blue-500">Don't have an account. Register</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
