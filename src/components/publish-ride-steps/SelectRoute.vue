<script setup>
import {onMounted, ref} from "vue";
import AutoComplete from 'primevue/autocomplete';
import {useRideStore} from "@/stores/ride.js";

const rideStore = useRideStore()

const directionsRequest = ref({
  departure: null,
  arrival: null,
  waypoints: []
})

const locationOptions = ref([])

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

function findRoute() {
  let waypointsNotEmpty = true;
  for (let waypoint of directionsRequest.value.waypoints) {
    if (!waypoint) {
      waypointsNotEmpty = false;
    }
  }
  if (directionsRequest.value.departure && directionsRequest.value.arrival && waypointsNotEmpty) {
    sendDirectionsRequest();
  }
}

function sendDirectionsRequest() {
  const request = {
    origin: directionsRequest.value.departure,
    destination: directionsRequest.value.arrival,
    waypoints: [],
    provideRouteAlternatives: false,
    travelMode: 'DRIVING',
    drivingOptions: {
      departureTime: rideStore.ride.date,
    },
    unitSystem: google.maps.UnitSystem.METRIC,
    region: 'ro'
  }
  // Add waypoints if any
  if (directionsRequest.value.waypoints.length > 0) {
    request.waypoints = [];
    for (const waypoint of directionsRequest.value.waypoints) {
      request.waypoints.push({
        location: waypoint,
        stopover: true
      })
    }
  }

  directionsService.route(request, function (result, status) {
    if (status === 'OK') {
      directionsRenderer.setDirections(result);
      console.log(result);
      setRide(result);
    }
  });
}

function setRide(result) {
  let departureTime = rideStore.ride.date;
  for (const leg of result.routes[0].legs) {
    rideStore.ride.connections.push({
      startAddress: leg.start_address,
      endAddress: leg.end_address,
      departureTime: departureTime,
      arrivalTime: new Date(departureTime.getTime() + leg.duration.value * 1000),
      duration: leg.duration
    });
    departureTime += departureTime + leg.duration;
  }
}

function addStop() {
  directionsRequest.value.waypoints.push("");
}

function removeStop(waypoint) {
  directionsRequest.value.waypoints = directionsRequest.value.waypoints.filter((w) => w !== waypoint);
  findRoute();
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
          placeholder="Choose departure">
        <template #option="slotProps">
          <div class="flex align-options-center">
            <i class="pi pi-map-marker text-primary mr-3 mt-1"></i>
            <div>{{ slotProps.option }}</div>
          </div>
        </template>
      </AutoComplete>
      <div v-for="(waypoint, index) in directionsRequest.waypoints" :key="index">
        <AutoComplete
            id="departure"
            v-model="directionsRequest.waypoints[index]"
            :suggestions="locationOptions"
            @complete="search"
            @item-select="findRoute"
            forceSelection
            placeholder="Choose stop">
          <template #option="slotProps">
            <div class="flex align-options-center">
              <i class="pi pi-map-marker text-primary mr-3 mt-1"></i>
              <div>{{ slotProps.option }}</div>
            </div>
          </template>
        </AutoComplete>
        <Button @click="removeStop(waypoint)" class="ml-2" icon="pi pi-times" severity="secondary" text rounded aria-label="Cancel" />
      </div>
      <AutoComplete
          id="arrival"
          v-model="directionsRequest.arrival"
          :suggestions="locationOptions"
          @complete="search"
          @item-select="findRoute"
          forceSelection
          placeholder="Choose arrival">
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
