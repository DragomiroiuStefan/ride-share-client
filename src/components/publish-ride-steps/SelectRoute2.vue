<script setup>
import {onMounted, ref} from "vue";
import AutoComplete from 'primevue/autocomplete';

const waypointsNo = ref(0);
const directionsRequest = ref({
  departure: null,
  arrival: null,
  waypoints: []
})

const locationOptions = ref([])

const search = (event) => {
  let request = {
    input: event.query,
    componentRestrictions: {country: "ro"}
  };
  autocompleteService.getPredictions(request, function (predictions, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK || !predictions) {
      console.log(status);  // TODO throw error
      return;
    }

    locationOptions.value = predictions.map(prediction => prediction.description)
  });
}

let map, directionsService, directionsRenderer, autocompleteService;

onMounted(() => {
  async function initMap() {
    const {Map} = await google.maps.importLibrary("maps");
    await google.maps.importLibrary("places");
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    autocompleteService = new google.maps.places.AutocompleteService();

    map = new Map(document.getElementById("map"), {
      zoom: 7,
      center: {lat: 45.944, lng: 25.009},
    });
    directionsRenderer.setMap(map);
  }

  initMap();
})

function findRoute() {
  if (directionsRequest.value.departure && directionsRequest.value.arrival) {
    calcRoute();
  }
}

function calcRoute() {
  const request = {
    origin: directionsRequest.value.departure,
    destination: directionsRequest.value.arrival,
    waypoints: [],
    provideRouteAlternatives: false,
    travelMode: 'DRIVING',
    drivingOptions: {
      departureTime: new Date(/* now, or future date */),
    },
    unitSystem: google.maps.UnitSystem.METRIC,
    region: 'ro'
  }
  for (const waypoint of directionsRequest.value.waypoints) {
    request.waypoints.push({
      location: waypoint,
      stopover: true
    })
  }

  directionsService.route(request, function (result, status) {
    if (status === 'OK') {
      directionsRenderer.setDirections(result);
      console.log(result)
    }
  });
}

function addStop() {
  waypointsNo.value++;
}

function removeStop(index) {
  waypointsNo.value--;
  directionsRequest.value.waypoints.splice(index, index);
}


</script>

<template>
  <div class="flex justify-content-between">
    <div class="flex flex-column align-items-start gap-3">
      <AutoComplete
          id="departure"
          v-model="directionsRequest.departure"
          :suggestions="locationOptions"
          @complete="search"
          @item-select="findRoute"
          forceSelection
          placeholder="Choose location">
        <template #option="slotProps">
          <div class="flex align-options-center">
            <i class="pi pi-map-marker text-primary mr-3 mt-1"></i>
            <div>{{ slotProps.option }}</div>
          </div>
        </template>
      </AutoComplete>
      <div v-for="n in waypointsNo" :key="n">
        <AutoComplete
            id="departure"
            v-model="directionsRequest.waypoints[n-1]"
            :suggestions="locationOptions"
            @complete="search"
            @item-select="findRoute"
            forceSelection
            placeholder="Choose location">
          <template #option="slotProps">
            <div class="flex align-options-center">
              <i class="pi pi-map-marker text-primary mr-3 mt-1"></i>
              <div>{{ slotProps.option }}</div>
            </div>
          </template>
        </AutoComplete>
        <Button @click="removeStop(n-1)" class="ml-2" icon="pi pi-times" severity="secondary" text rounded aria-label="Cancel" />
      </div>
      <AutoComplete
          id="arrival"
          v-model="directionsRequest.arrival"
          :suggestions="locationOptions"
          @complete="search"
          @item-select="findRoute"
          forceSelection
          placeholder="Choose location">
        <template #option="slotProps">
          <div class="flex align-options-center">
            <i class="pi pi-map-marker text-primary mr-3 mt-1"></i>
            <div>{{ slotProps.option }}</div>
          </div>
        </template>
      </AutoComplete>
      <Button @click="addStop" label="Add Stop" text/>
    </div>
    <div id="map"/>
  </div>
</template>

<style scoped>
#map {
  width: 70%;
  height: 600px;
}
</style>
