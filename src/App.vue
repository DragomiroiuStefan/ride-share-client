<script setup>

import {useUserStore} from "@/stores/user.js";

const userStore = useUserStore();

const loggedUser = localStorage.getItem("loggedUser");
if(loggedUser) {
  userStore.user = JSON.parse(loggedUser);
}
</script>

<template>
  <RouterView/>
</template>
