<script setup>

import {useUserStore} from "@/stores/user.js";
import {apiClient} from "@/services/ApiClient.js";

const userStore = useUserStore();

const loggedUser = localStorage.getItem("loggedUser");
if(loggedUser) {
  userStore.user = JSON.parse(loggedUser);
  userStore.user.birthDate = new Date(userStore.user.birthDate);

  const jwt = localStorage.getItem("jwt");
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
}
</script>

<template>
  <RouterView/>
</template>
