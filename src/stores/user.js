import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    userId: 1,
    firstName: "Stefan",
    lastName: "Dragomir",
    profilePicture: ""
  })

  return { user }
})
