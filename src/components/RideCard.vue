<script setup>
import router from "@/router/index.js";

import RideDepartureArrival from "@/components/RideDepartureArrivalInfo.vue";
import DriverInfo from "@/components/DriverInfo.vue";


defineProps({
  ride: Object
})

function onClick() {
  router.push({name: "ride", params: {rideId: 1}})
}
</script>

<template>
  <div @click="onClick" class="card flex flex-column gap-4 w-6 hover:shadow-8">
    <div class="flex justify-content-between">
      <RideDepartureArrival :ride="ride"/>
      <p class="text-xl font-medium mt-2 mr-4"> 58 RON</p>
    </div>
    <DriverInfo :driver="ride.driver"/>
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
