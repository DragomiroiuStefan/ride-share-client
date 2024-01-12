import {computed, ref} from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({})
  let userLoggedIn = computed(() => !!user.value.userId);

  return { user, userLoggedIn }
})
