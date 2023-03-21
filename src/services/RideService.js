import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

export const RideService = {
    getRides() {
        return apiClient.get('/trips', {
            params: {
                departureLocation: 1,
                arrivalLocation: 3,
                departureTime: '2023-04-23T06:00:00',
                seats: 3
            }
        })
    }
}
