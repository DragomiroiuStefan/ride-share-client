<script setup>
import Calendar from "primevue/calendar";
import InputNumber from "primevue/inputnumber";
import Textarea from 'primevue/textarea';
import {useRideStore} from "@/stores/ride.js";

const rideStore = useRideStore()

</script>

<template>
  <div class="flex justify-content-center align-items-center h-24rem">
    <div class="p-fluid w-20rem">
      <div class="field">
        <label for="date" class="p-sr-only">Date</label>
        <Calendar
            id="date"
            v-model="rideStore.ride.date"
            dateFormat="dd/mm/yy"
            :minDate="new Date()"
            showTime hourFormat="24"
            showIcon
            placeholder="Date"
        />
      </div>
      <div class="field">

        <label for="seats" class="p-sr-only">Seats</label>
        <InputNumber
            id="seats"
            v-model="rideStore.ride.seats"
            mode="decimal"
            :min="1"
            :max="10"
            showButtons
            placeholder="Seats"
        />
      </div>
      <div class="field">

        <label for="comment" class="p-sr-only">Comment</label>
        <Textarea
            id="comment"
            v-model="rideStore.ride.comment"
            rows="5"
            cols="30"
            placeholder="Comment"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
