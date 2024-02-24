<script setup>
import {useRideStore} from "@/stores/ride.js";
import {ref} from "vue";

const rideStore = useRideStore()

const value1 = ref();

</script>

<template>
  <div class="flex justify-content-center align-items-center h-24rem">
    <div>
      <div class="field grid" v-for="(connection, index) in rideStore.ride.connections" :key="index">
        <label class="col-fixed w-14rem">{{ connection.startLocation }} - {{ connection.endLocation }}</label>
        <div class="col">
          <InputNumber v-model="connection.price" inputId="currency-us" mode="currency" currency="LEU" locale="ro-RO" />
        </div>
      </div>
      <div class="field grid">
        <label class="col-fixed w-14rem font-bold">Total</label>
        <div class="col">
          <InputNumber v-model="rideStore.ride.totalPrice" inputId="currency-us" mode="currency" currency="LEU" locale="ro-RO" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
