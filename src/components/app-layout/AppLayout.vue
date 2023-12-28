<script setup>

import HeaderBar from "@/components/app-layout/HeaderBar.vue";
import FooterBar from "@/components/app-layout/FooterBar.vue";
</script>

<template>
  <HeaderBar/>
  <main>
    <div class="content surface-100 py-6">
      <slot/>
    </div>
  </main>
  <FooterBar/>
</template>

<style scoped>

</style>
