<script setup>
import {useRideStore} from "@/stores/ride.js";

const rideStore = useRideStore()

</script>

<template>
  <div class="flex justify-content-center align-items-center h-24rem">
    <div>
      <div class="field grid" v-for="(connection, index) in rideStore.ride.connections" :key="index">
        <label class="col-fixed w-14rem">{{ connection.startLocation }} - {{ connection.endLocation }}</label>
        <div class="col">
          <Calendar v-model="connection.departureTime" timeOnly class="w-8rem"/> -
          <Calendar v-model="connection.arrivalTime" timeOnly class="w-8rem"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
