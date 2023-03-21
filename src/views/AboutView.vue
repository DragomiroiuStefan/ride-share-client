<script setup>
import RideDataView from '@/components/RideDataView.vue'
</script>


<template>
  <div class="about">
    <RideDataView/>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
