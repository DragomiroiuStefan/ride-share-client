import { apiClient } from '@/services/ApiClient'

export const RideService = {
  findById(id) {
    return apiClient.get('/rides/' + id)
  },
  findAll() {
    return apiClient.get('/rides')
  },
  create(ride) {
    return apiClient.post('/rides', ride)
  },
  update(ride) {
    return apiClient.put('/rides/' + ride.rideId, {
      name: ride.name,
      description: ride.description,
      owner: ride.owner
    })
  },
  delete(rideId) {
    return apiClient.delete('/rides/' + rideId)
  },
}
