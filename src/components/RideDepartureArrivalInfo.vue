<script setup>
defineProps({
  ride: Object
})
</script>

<template>
  <div class="flex flex-column relative gap-2">
    <div class="flex flex-row align-items-center gap-3">
      <p class="text-lg font-medium">{{ ride.departureTime }}</p>
      <div class="flex flex-row align-items-center gap-3">
        <i class="pi pi-map-marker text-2xl text-primary"></i>
        <div>
          <p class="text-xl font-medium">{{ ride.departure }}</p>
          <p class="p-text-secondary">{{ ride.departureAddress }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-row align-items-center gap-3">
      <p class="text-lg font-medium">{{ ride.arrivalTime }}</p>
      <div class="flex flex-row align-items-center gap-3">
        <i class="pi pi-map-marker text-2xl text-primary"></i>
        <div>
          <p class="text-xl font-medium">{{ ride.arrival }}</p>
          <p class="p-text-secondary">{{ ride.arrivalAddress }}</p>
        </div>
      </div>
    </div>
<!--    <p class="absolute bottom-50 p-text-secondary ml-1">4h30</p>-->
    <p class="duration p-text-secondary ml-1">4h30</p>
  </div>
</template>

<style scoped>
.duration {
  position: absolute;
  top: 3rem;
}
</style>
