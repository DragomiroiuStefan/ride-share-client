<script setup>
import {onMounted, ref} from "vue";

let map, directionsService, directionsRenderer;
let autocompleteOptions = {
  componentRestrictions: {country: "ro"},
  fields: ["address_components", "geometry", "name"],
};

const waypointsNo = ref(0);
const waypoints = ref([]);

onMounted(() => {
  async function initMap() {
    const {Map} = await google.maps.importLibrary("maps");
    const {Autocomplete} = await google.maps.importLibrary("places");
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    map = new Map(document.getElementById("map"), {
      zoom: 7,
      center: {lat: 45.944, lng: 25.009},
    });
    directionsRenderer.setMap(map);


    const departure = new google.maps.places.Autocomplete(document.getElementById("departure"), autocompleteOptions);
    const arrival = new google.maps.places.Autocomplete(document.getElementById("arrival"), autocompleteOptions);

    // for (let i = 1; i <= waypointsNo.value; i++) {
    //   const waypoint = new google.maps.places.Autocomplete(document.getElementById("waypoint-" + i), autocompleteOptions);
    //   waypoints.value.push(waypoint);
    // }

    departure.addListener('place_changed', function () {
      const place = departure.getPlace();
      if (place.geometry) {
        console.log(place)
      }
    });

    arrival.addListener('place_changed', function () {
      const place = arrival.getPlace();
      if (place.geometry) {
        console.log(place)
      }
    });
  }

  initMap();
})

function calcRoute() {
  const directionRequest = {
    origin: document.getElementById("departure").value,
    destination: document.getElementById("arrival").value,
    waypoints: [
      {
        location: 'ParkLake Shopping Center',
        stopover: true
      }],
    provideRouteAlternatives: false,
    travelMode: 'DRIVING',
    drivingOptions: {
      departureTime: new Date(/* now, or future date */),
    },
    // unitSystem: google.maps.UnitSystem.METRIC,
    region: 'ro'
  }
  directionsService.route(directionRequest, function (result, status) {
    if (status === 'OK') {
      directionsRenderer.setDirections(result);
      console.log(result)
    }
  });
}

function addStop() {
  waypointsNo.value++;
  const waypoint = new google.maps.places.Autocomplete(document.getElementById("waypoint-" + waypointsNo.value), autocompleteOptions);
  waypoints.value.push(waypoint);
}


</script>

<template>
  <div class="flex justify-content-between">
    <div class="flex flex-column align-items-center gap-3">
      <input id="departure" type="text"/>
      <input v-for="i in waypointsNo" v-bind:key="i" :id="'waypoint-' + i" type="text"/>
      <input id="arrival" type="text"/>
      <Button @click="addStop" label="Add Stop" text/>
      <button @click="calcRoute">Find Route</button>
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


<!--
const ride = ref({})

const locationOptions = ref([])

const search = (event) => {
  locationOptions.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
}

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

-->
