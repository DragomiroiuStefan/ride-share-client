<script setup>
import Avatar from "primevue/avatar";
import Rating from "primevue/rating";

defineProps({
  driver: Object
})
</script>

<template>
  <div class="flex justify-content-between align-items-center">
    <div class="flex align-items-center gap-2">
      <Avatar image="/images/generic-user-image.jpg" class="mr-2" size="xlarge" shape="circle"/>
      <div>
        <p class="text-2xl font-medium">{{ driver.name }}</p>
        <p>VW Polo</p>
      </div>
    </div>
    <div class="flex flex-column align-items-center">
      <p class="text-lg ">{{ driver.rating }} out of 5</p>
      <Rating v-model="driver.rating" readonly :cancel="false"/>
      <p>{{ driver.reviews }} reviews</p>
    </div>
  </div>
</template>

<style scoped>

</style>
