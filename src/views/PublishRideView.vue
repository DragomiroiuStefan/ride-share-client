<script setup>
import {ref} from "vue";

import AppLayout from "@/components/AppLayout/AppLayout.vue";
import SelectRoute from "@/components/publish-ride-steps/SelectRoute.vue";
import SelectDateAndSeats from "@/components/publish-ride-steps/SelectDateAndSeats.vue";
import SelectSchedule from "@/components/publish-ride-steps/SelectSchedule.vue";
import SelectPrice from "@/components/publish-ride-steps/SelectPrice.vue";
import SelectVehicle from "@/components/publish-ride-steps/SelectVehicle.vue";

const active = ref(0);

const steps = ref([
  {
    label: 'Route'
  },
  {
    label: 'Date & Seats'
  },
  {
    label: 'Schedule'
  },
  {
    label: 'Price'
  },
  {
    label: 'Vehicle'
  }
]);

function incrementStep() {
  // Check active step < steps - 1 to prevent double click going out of bounds
  if (active.value < steps.value.length - 1) {
    active.value++;
  }
}

function decrementStep() {
  // Check active step > 0 to prevent double click going out of bounds
  if (active.value > 0) {
    active.value--;
  }
}

</script>

<template>
  <AppLayout>
    <div class="flex flex-column align-items-center my-4">
      <div class="panel flex flex-column gap-3 w-8">
        <h1 class="font-bold">Publish Ride</h1>
        <Steps v-model:activeStep="active" :model="steps"/>
        <SelectRoute v-if="active === 0"/>
        <SelectDateAndSeats v-if="active === 1"/>
        <SelectSchedule v-if="active === 2"/>
        <SelectPrice v-if="active === 3"/>
        <SelectVehicle v-if="active === 4"/>
        <div class="flex justify-content-between">
          <Button label="Previous" @click="decrementStep" :class="{ invisible: active === 0 }"/>
          <Button label="Next" @click="incrementStep" :class="{ invisible: active === 4 }"/>
        </div>
      </div>
    </div>

  </AppLayout>
</template>

<style scoped>

</style>
