<script setup>
import RideDepartureArrival from "@/components/RideDepartureArrivalInfo.vue";

import Avatar from "primevue/avatar";
import Rating from "primevue/rating";

defineProps({
  ride: Object
})
</script>

<template>
  <div class="card flex flex-column gap-4 w-6 hover:shadow-8">
    <div class="flex justify-content-between">
      <RideDepartureArrival :ride="ride"/>
      <p class="text-xl mt-2 mr-3"> 58 RON</p>
    </div>
    <div class="flex justify-content-between align-items-center">
      <div class="flex align-items-center gap-2">
        <Avatar image="/images/generic-user-image.jpg" class="mr-2" size="xlarge" shape="circle"/>
        <div>
          <p class="text-2xl">{{ ride.driver.name }}</p>
          <p>VW Polo</p>
        </div>
      </div>
      <div class="flex flex-column align-items-center">
        <p class="text-lg">{{ ride.driver.rating }} out of 5</p>
        <Rating v-model="ride.driver.rating" readonly :cancel="false"/>
        <p>{{ ride.driver.reviews }} reviews</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  min-width: 30rem;
}
.card:hover {
  cursor: pointer;
  transform: scale(1.05, 1.05);
  transition: all .2s ease-in-out;
}
</style>
