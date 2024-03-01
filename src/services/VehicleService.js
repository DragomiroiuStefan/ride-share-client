import {apiClient} from "@/services/ApiClient.js";

export const vehicleService = {
  findById(plateNumber) {
    return apiClient.get('/vehicles/' + plateNumber)
  },
  findByOwner(userId) {
    return apiClient.get('/vehicles', {
      params: {
        userId
      }
    })
  },
  create(vehicle) {
    return apiClient.post('/vehicles', vehicle, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  update(vehicle) {
    return apiClient.put('/vehicles/' + vehicle.plateNumber, vehicle)
  },
  delete(plateNumber) {
    return apiClient.delete('/vehicles/' + plateNumber)
  },

}
