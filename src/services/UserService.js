import {apiClient} from '@/services/ApiClient'

export const userService = {
  findById(id) {
    return apiClient.get('/users/' + id)
  },
  findAll() {
    return apiClient.get('/users')
  },
  create(user) {
    return apiClient.post('/users', user)
  },
  update(user) {
    return apiClient.put('/users/' + user.userId, user)
  },
  delete(userId) {
    return apiClient.delete('/users/' + userId)
  },
  login(email, password) {
    return apiClient.post('/users/login', {
      email,
      password
    })
  },
  register(user) {
    return apiClient.post('/users/register', user)
  },
}
