<script setup>
import {ref} from "vue";
import FindRideForm from "@/components/FindRideForm.vue";
import RideInfo from "@/components/RideCard.vue";
import AppLayout from "@/components/AppLayout/AppLayout.vue";

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

</script>

<template>
  <AppLayout>
    <div class="flex flex-column align-items-center">
      <FindRideForm/>
      <h1 class="mt-4"> 3 Rides available </h1>
      <p class="mb-4">Bucuresti → Iasi, 5 Dec 2023</p>
      <RideInfo :ride="ride"/>
      <RideInfo :ride="ride"/>
      <RideInfo :ride="ride"/>
    </div>
  </AppLayout>
</template>
