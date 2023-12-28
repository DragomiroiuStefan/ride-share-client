<script setup>
import {onMounted, ref} from "vue";

import AppLayout from "@/components/app-layout/AppLayout.vue";
import RideDepartureArrivalInfo from "@/components/RideDepartureArrivalInfo.vue";
import DriverInfo from "@/components/DriverInfo.vue";
import PassangersInfo from "@/components/PassangersInfo.vue";

defineProps({
  rideId: String
})

const ride = ref({
  departure: "Bucuresti",
  arrival: "Iasi",
  departureAddress: "String ...",
  arrivalAddress: "String ........",
  departureTime: "14:30",
  arrivalTime: "17:00",
  driver: {
    name: "Marius",
    rating: 4.5,
    reviews: 28,
    car: "VW Polo"
  }
});

onMounted(() => {
  // TODO Get ride from rideId
})
</script>

<template>
  <AppLayout>
    <div class="flex flex-column align-items-center mt-4">
      <div class="panel flex flex-column gap-3 w-8">
        <h1 class="font-bold">Bucuresti → Iasi, 5 Dec 2023</h1>
        <RideDepartureArrivalInfo :ride="ride"/>
        <DriverInfo :driver="ride.driver"/>
        <div class="comment">
          <p class="text-xl font-medium mt-4"> Comment:</p>
          <p> Placeholder: The driver doesn't have any additional request</p>
        </div>
        <div class="flex justify-content-between">
          <p class="text-xl font-medium mt-4"> Available seats: </p>
          <p class="text-2xl font-medium mt-4"> 4 </p>
        </div>
        <div class="flex justify-content-between">
          <p class="text-xl font-medium mt-4"> Total price for 2 seats:</p>
          <p class="text-2xl font-medium mt-4"> 58 RON </p>
        </div>
        <div class="mt-4">
          <PassangersInfo/>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
.panel {
  min-width: 40rem;
}
</style>
