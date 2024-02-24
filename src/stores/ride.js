import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useRideStore = defineStore('ride', () => {
  const ride = ref({
    seats: 1,
    connections: []
  })

  return {ride}
})
