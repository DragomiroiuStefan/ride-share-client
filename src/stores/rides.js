import {ref} from 'vue'
import {defineStore} from 'pinia'
import {RideService} from "@/services/RideService";
export const useRidesStore = defineStore('counter', () => {
    const rides = ref();

    function getRides() {
        return RideService.getRides()
            .then((response) => {
                rides.value = response.data
            })
            .catch((error) => {
                throw error
            })
    }

    return {rides, getRides}
})
