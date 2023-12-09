<script setup>
import {ref} from "vue";
import AutoComplete from 'primevue/autocomplete';
import Calendar from 'primevue/calendar';
import InputNumber from "primevue/inputnumber";

const form = ref({
  departure: "",
  destination: "",
  date: "",
  seats: 1
})

const locationOptions = ref([])

const search = (event) => {
  locationOptions.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
}

</script>

<template>
  <div class="card formgroup-inline">
    <div class="field">
      <label for="departure" class="p-sr-only">Departure</label>
      <AutoComplete
          id="departure"
          v-model="form.departure"
          :suggestions="locationOptions"
          @complete="search"
          force-selection
          placeholder="Departure"
      />
    </div>
    <div class="field">
      <label for="destination" class="p-sr-only">Destination</label>
      <AutoComplete
          id="destination"
          v-model="form.destination"
          :suggestions="locationOptions"
          @complete="search"
          force-selection
          placeholder="Departure"
      />
    </div>
    <div class="field">
      <label for="date" class="p-sr-only">Destination</label>
      <Calendar
          id="date"
          v-model="form.date"
          dateFormat="dd/mm/yy"
          :minDate="new Date()"
          showIcon
          placeholder="Date"
      />
    </div>
    <div class="field">
      <label for="seats" class="p-sr-only">Seats</label>
      <InputNumber
          id="seats"
          v-model="form.seats"
          mode="decimal"
          :min="1"
          :max="10"
          showButtons
      />
    </div>
    <Button label="Submit"></Button>
  </div>
</template>

<style scoped>
.card {
  max-width: 60%;
  padding-top: 2rem;
  padding-bottom: 1rem;
}
</style>
