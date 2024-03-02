<script setup>
defineProps({
  errors: Array
})
</script>

<template>
  <small class="p-error" v-for="error of errors" :key="error.$uid">{{ error.$message }}</small>
</template>
