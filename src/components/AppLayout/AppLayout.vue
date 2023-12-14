<script setup>

import HeaderBar from "@/components/AppLayout/HeaderBar.vue";
import FooterBar from "@/components/AppLayout/FooterBar.vue";
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
