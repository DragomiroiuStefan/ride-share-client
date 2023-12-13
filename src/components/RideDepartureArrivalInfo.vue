<script setup>
defineProps({
  ride: Object
})
</script>

<template>
  <div class="flex flex-column relative gap-2">
    <div class="flex flex-row align-items-center gap-5">
      <p class="text-lg">{{ ride.departureTime }}</p>
      <div class="flex flex-row align-items-center gap-3">
        <i class="pi pi-map-marker text-2xl text-primary"></i>
        <div>
          <p class="text-xl">{{ ride.departure }}</p>
          <p class="p-text-secondary">{{ ride.departureAddress }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-row align-items-center gap-5">
      <p class="text-lg">{{ ride.arrivalTime }}</p>
      <div class="flex flex-row align-items-center gap-3">
        <i class="pi pi-map-marker text-2xl text-primary"></i>
        <div>
          <p class="text-xl">{{ ride.arrival }}</p>
          <p class="p-text-secondary">{{ ride.arrivalAddress }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
