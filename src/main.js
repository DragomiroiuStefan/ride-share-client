import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

import 'primevue/resources/themes/aura-light-blue/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import PrimeVue from "primevue/config";
import Autocomplete from "primevue/autocomplete";
import Avatar from "primevue/avatar";
import BadgeDirective from 'primevue/badgedirective';
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import Checkbox from "primevue/checkbox";
import Column from "primevue/column";
import Datatable from "primevue/datatable";
import Dialog from "primevue/dialog";
import FileUpload from "primevue/fileupload";
import Image from "primevue/image";
import InputMask from 'primevue/inputmask';
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Menu from "primevue/menu";
import Password from "primevue/password";
import Rating from "primevue/rating";
import Steps from "primevue/steps";
import Textarea from "primevue/textarea";
import Timeline from "primevue/timeline";
import ToastService from 'primevue/toastservice';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastService);
app.use(PrimeVue, {ripple: true});

app.component('Autocomplete', Autocomplete)
app.component('Avatar', Avatar)
app.component('Button', Button);
app.component('Calendar', Calendar)
app.component('Card', Card)
app.component('Checkbox', Checkbox)
app.component('Column', Column)
app.component('Datatable', Datatable)
app.component('Dialog', Dialog)
app.component('FileUpload', FileUpload)
app.component('Image', Image)
app.component('InputMask', InputMask)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('Menu', Menu)
app.component('Password', Password)
app.component('Rating', Rating)
app.component('Steps', Steps)
app.component('Textarea', Textarea)
app.component('Timeline', Timeline)

app.directive('badge', BadgeDirective);

app.mount('#app')
