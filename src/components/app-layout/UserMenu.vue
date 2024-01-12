<script setup>
import {baseURL} from "@/services/ApiClient.js";
import {useUserStore} from "@/stores/user.js";
import {ref} from "vue";
import router from "@/router/index.js";

const userStore = useUserStore();
const userInitial = userStore.user.firstName[0].toUpperCase();

const menu = ref();
const items = ref([
  {
    label: 'Profile',
    icon: 'pi pi-user',
    route: '/user/profile'
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => {
      localStorage.removeItem("loggedUser");
      router.push({name: 'home'});
      location.reload();
    }
  }
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div class="flex align-items-center gap-3" @click="toggle">
    <Avatar v-if="userStore.user.profilePicture" v-badge.danger="4" class="p-overlay-badge"
            :image="baseURL + '/user-upload/1/Screenshot.jpg'" size="large" shape="circle"/>
    <Avatar v-else v-badge.danger="4" class="p-overlay-badge" :label="userInitial" size="large" shape="circle"/>
    <p class="font-bold">{{ userStore.user.firstName }}</p>
  </div>
  <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon"/>
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
  </Menu>
</template>

<style scoped>

</style>
