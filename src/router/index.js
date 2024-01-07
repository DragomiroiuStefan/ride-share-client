import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/rides',
      name: 'rides',
      component: () => import('../views/RidesView.vue')
    },
    {
      path: '/ride/:rideId',
      name: 'ride',
      props: true,
      component: () => import('../views/RideView.vue')
    },
    {
      path: '/ride/publish',
      name: 'publishRide',
      props: true,
      component: () => import('../views/PublishRideView.vue')
    },
    {
      path: '/user/profile',
      name: 'userProfile',
      props: true,
      component: () => import('../views/UserProfileView.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/auth/access-denied',
      name: 'accessDenied',
      component: () => import('../views/auth/AccessDenied.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('../views/error/ErrorView.vue')
    },
    {
      path: '/not-found',
      name: 'notFound',
      component: () => import('../views/error/NotFound.vue')
    }

  ]
})

export default router
