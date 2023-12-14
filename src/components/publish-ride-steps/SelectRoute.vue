<script setup>
import {ref} from "vue";
import AutoComplete from "primevue/autocomplete";

const ride = ref({})

const locationOptions = ref([])

const search = (event) => {
  locationOptions.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
}
</script>

<template>
  <div class="flex flex-column align-items-center gap-4 mt-6">
    <AutoComplete
        id="departure"
        v-model="ride.departure"
        :suggestions="locationOptions"
        @complete="search"
        forceSelection
        placeholder="Choose location">
      <template #option="slotProps">
        <div class="flex align-options-center">
          <i class="pi pi-map-marker text-primary mr-3 mt-1"></i>
          <div>{{ slotProps.option }}</div>
        </div>
      </template>
    </AutoComplete>
    <AutoComplete
        id="arrival"
        v-model="ride.arrival"
        :suggestions="locationOptions"
        @complete="search"
        forceSelection
        placeholder="Choose location">
      <template #option="slotProps">
        <div class="flex align-options-center">
          <i class="pi pi-map-marker text-primary mr-3 mt-1"></i>
          <div>{{ slotProps.option }}</div>
        </div>
      </template>
    </AutoComplete>
    <Button label="Add location"  text/>
  </div>
</template>

<style scoped>

</style>
