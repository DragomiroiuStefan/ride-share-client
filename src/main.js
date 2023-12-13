import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import PrimeVue from "primevue/config";
import Autocomplete from "primevue/autocomplete";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import Checkbox from "primevue/checkbox";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Rating from "primevue/rating";
import Timeline from "primevue/timeline";


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {ripple: true});
app.component('Autocomplete', Autocomplete)
app.component('Avatar', Avatar)
app.component('Button', Button);
app.component('Calendar', Calendar)
app.component('Card', Card)
app.component('Checkbox', Checkbox)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Rating', Rating)
app.component('Timeline', Timeline)


app.mount('#app')
