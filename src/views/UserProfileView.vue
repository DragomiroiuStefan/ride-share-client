<script setup>
import FileUpload from 'primevue/fileupload';
import Image from 'primevue/image';
import AppLayout from "@/components/app-layout/AppLayout.vue";
import {useUserStore} from "@/stores/user.js";
import {ref} from "vue";
import {userService} from "@/services/UserService.js";
import {apiClient} from "@/services/ApiClient.js";
import router from "@/router/index.js";
import {useToast} from "primevue/usetoast";
import Toast from 'primevue/toast';

const toast = useToast();
const userStore = useUserStore();

const formUser = ref({
  userId: userStore.user.userId,
  firstName: userStore.user.firstName,
  lastName: userStore.user.lastName,
  birthDate: userStore.user.birthDate,
  email: userStore.user.email,
  phoneNumber: userStore.user.phoneNumber
})
const userInfoChanged = ref(false)

const onUpload = (event) => {
  let filename = event.files[0].name;
  userStore.user.profilePicture = filename;
  console.log(userStore.user.profilePicture)
};

function updateUser() {
  userService.update(formUser.value)
      .then((response) => {
        userStore.user.firstName = formUser.value.firstName;
        userStore.user.lastName = formUser.value.lastName;
        userStore.user.birthDate = formUser.value.birthDate;
        userStore.user.email = formUser.value.email;
        userStore.user.phoneNumber = formUser.value.phoneNumber;
        localStorage.setItem('loggedUser', JSON.stringify(userStore.user));
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.headers.getAuthorization()}`;
        localStorage.setItem('jwt', response.headers.getAuthorization());

        userInfoChanged.value = false;

        toast.add({ severity: 'success', summary: 'Successful', detail: 'Profile Updated', life: 3000 });
      })
      .catch(err => {
        if (err?.response?.status === 404) {
          console.log(err.response.data.message);
        } else {
          router.push({name: 'error'});
        }
      })
}

function getAge(dateString) {
  let today = new Date();
  let birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
</script>

<template>
  <AppLayout>
    <div class="flex flex-column align-items-center mt-4">
      <div class="panel flex flex-column gap-3 w-8">
        <h1 class="font-bold">Profile</h1>
        <h2>{{ userStore.user.firstName }}</h2>
        <p>{{ getAge(userStore.user.birthDate) }} years</p>

        <div class="flex justify-content-start">
          <Image :src="'http://localhost:8080/user-upload/1/' + userStore.user.profilePicture" alt="Profile Picture"
                 width="250" preview/>
        </div>
        <FileUpload mode="basic" name="profilePicture" url="http://localhost:8080/users/uploadProfilePicture"
                    accept="image/*" :maxFileSize="10000000"
                    @upload="onUpload" :auto="true" chooseLabel="Change"/>
        <!--      <FileUpload name="userPhoto" url="http://localhost:8080/users/uploadPhoto" @upload="onUpload($event)" accept="image/*" :maxFileSize="5000000">-->
        <!--        <template #empty>-->
        <!--          <div class="flex align-items-center justify-content-center flex-column">-->
        <!--            <i class="pi pi-cloud-upload border-2 border-circle p-5 text-7xl text-400 border-400" />-->
        <!--            <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>-->
        <!--          </div>-->
        <!--        </template>-->
        <!--      </FileUpload>-->

        <h2>Personal Info</h2>
        <div class="p-fluid w-24rem">
          <div class="field">
            <label for="firstname">Firstname</label>
            <InputText id="firstname" type="text" v-model="formUser.firstName"
                       @update:modelValue="userInfoChanged = true"/>
          </div>
          <div class="field">
            <label for="lastname">Lastname</label>
            <InputText id="lastname" type="text" v-model="formUser.lastName"
                       @update:modelValue="userInfoChanged = true"/>
          </div>
          <div class="field">
            <label for="birthDate">Birth Date</label>
            <Calendar :showIcon="true" :showButtonBar="true" v-model="formUser.birthDate" dateFormat="dd/mm/yy"
                      @update:modelValue="userInfoChanged = true"></Calendar>
          </div>
        </div>

        <h2>Contact Info</h2>
        <div class="p-fluid w-24rem">
          <div class="field">
            <label for="email">E-mail</label>
            <InputText id="email" type="text" v-model="formUser.email" @update:modelValue="userInfoChanged = true"/>
          </div>
          <div class="field">
            <label for="lastname">Phone Number</label>
            <InputMask v-model="formUser.phoneNumber" mask="9999 999 999" placeholder="+40"
                       @update:modelValue="userInfoChanged = true"/>
          </div>
        </div>

        <Button label="Save" icon="pi pi-check" class="w-max" :disabled="!userInfoChanged" @click="updateUser"/>

        <Toast/>
      </div>
    </div>
  </AppLayout>
</template>
