<script setup>
import {ref} from "vue";

import Calendar from "primevue/calendar";
import InputNumber from "primevue/inputnumber";
import Textarea from 'primevue/textarea';

const ride = ref({})

</script>

<template>
  <div class="flex justify-content-center">
  <div class="flex flex-column  align-items-start gap-4 mt-6">
    <label for="date" class="p-sr-only">Date</label>
    <Calendar
        id="date"
        v-model="ride.date"
        dateFormat="dd/mm/yy"
        :minDate="new Date()"
        showIcon
        placeholder="Date"
    />
    <label for="seats" class="p-sr-only">Seats</label>
    <InputNumber
        id="seats"
        v-model="ride.seats"
        mode="decimal"
        :min="1"
        :max="10"
        showButtons
        placeholder="Seats"
    />
    <label for="comment" class="p-sr-only">Comment</label>
    <Textarea id="comment" v-model="ride.comment" rows="5" cols="30" placeholder="Comment"/>
  </div>
  </div>
</template>

<style scoped>

</style>
