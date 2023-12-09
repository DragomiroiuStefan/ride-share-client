<script setup>
import {RouterLink} from "vue-router";
import Button from "primevue/button";
</script>

<template>
  <header>
    <div
        class="header-bar flex justify-content-between align-items-center w-full h-4rem px-8 surface-ground shadow-5 fixed z-5">
      <RouterLink to="/">
        <img alt="RideShare Logo" class="logo" src="@/assets/logo.svg" width="200" height="200"/>
      </RouterLink>
      <div class="flex align-items-center">
        <RouterLink to="/auth/login">
          <Button label="Login"
                  class="p-button-text p-button-rounded border-none font-bold line-height-2 text-blue-500"/>
        </RouterLink>
        <RouterLink to="/auth/register">
          <Button label="Register"
                  class="p-button-rounded border-none ml-5 font-bold text-white line-height-2 bg-blue-500"/>
        </RouterLink>
      </div>
    </div>
  </header>
</template>
