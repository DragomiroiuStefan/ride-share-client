<script setup>
import {onMounted} from "vue";

import { useRidesStore } from '@/stores/rides'

const ridesStore = useRidesStore()

onMounted(() => {
  ridesStore.getRides()
      .catch(error => {
        console.log(error)
      })
});
</script>

<template>
  <DataView :value="ridesStore.rides">
    <template #list="slotProps">
      <div class="col-12">
        <p>{{ slotProps.data.departureAddress }}</p>
        <p>{{ slotProps.data.arrivalAddress }}</p>
        <p>{{ slotProps.data.departureTime }}</p>
        <p>{{ slotProps.data.arrivalTime }}</p>
        <p>{{ slotProps.data.price }}</p>
        <p>{{ slotProps.data.seats }}</p>
      </div>
    </template>
  </DataView>
</template>

<style scoped>

</style>