<script setup>
import {RouterLink} from "vue-router";
import Button from "primevue/button";
import {useUserStore} from "@/stores/user.js";
import UserMenu from "@/components/app-layout/UserMenu.vue";

const userStore = useUserStore();

</script>

<template>
  <header>
    <div class="header-bar flex justify-content-between align-items-center w-full h-5rem px-8 surface-card shadow-5 fixed z-5">
      <RouterLink to="/">
        <img alt="RideShare Logo" class="logo" src="../../assets/logo.svg" width="200"/>
      </RouterLink>
      <div class="flex align-items-center" v-if="!userStore.userLoggedIn">
        <RouterLink to="/auth/login">
          <Button label="Login"
                  class="p-button-text p-button-rounded border-none font-bold line-height-2 text-blue-500"/>
        </RouterLink>
        <RouterLink to="/auth/register">
          <Button label="Register"
                  class="p-button-rounded border-none ml-5 font-bold text-white line-height-2 bg-blue-500"/>
        </RouterLink>
      </div>
      <UserMenu v-else/>
    </div>
    <div class="space-bar h-5rem"/>
  </header>
</template>
