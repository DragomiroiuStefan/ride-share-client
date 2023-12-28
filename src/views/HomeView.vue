<script setup>
import FindRideForm from "@/components/FindRideForm.vue";
import RideStats from "@/components/RideStats.vue";
import Feature from "@/components/Feature.vue";
import HeaderBar from "@/components/app-layout/HeaderBar.vue";
import FooterBar from "@/components/app-layout/FooterBar.vue";
</script>

<template>
  <HeaderBar/>
  <main>
    <div class="content">
      <h1>Find a Ride</h1>
      <FindRideForm class="find-ride-form"/>
      <Feature/>
      <RideStats class="ride-stats"/>
    </div>
  </main>
  <FooterBar/>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(/images/car-background.jpg);
  background-attachment: fixed;
  background-size: cover;
  opacity: 100%;
}

h1 {
  color: white;
  font-weight: 500;
  font-size: 3rem;
  margin-bottom: 2rem;
  margin-top: 16rem;
}

.find-ride-form {
  margin-bottom: 8rem;
}

.ride-stats {
  margin-top: 12rem;
  margin-bottom: 12rem;
}
</style>
