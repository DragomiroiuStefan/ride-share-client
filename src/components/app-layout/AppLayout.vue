<script setup>

import HeaderBar from "@/components/app-layout/HeaderBar.vue";
import FooterBar from "@/components/app-layout/FooterBar.vue";
</script>

<template>
  <HeaderBar/>
  <main>
    <div class="py-8">
      <slot/>
    </div>
  </main>
  <FooterBar/>
</template>

<style scoped>

</style>
