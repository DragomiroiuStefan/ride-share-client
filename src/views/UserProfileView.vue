<script setup>
import FileUpload from 'primevue/fileupload';
import Image from 'primevue/image';
import AppLayout from "@/components/app-layout/AppLayout.vue";
import {useUserStore} from "@/stores/user.js";

const userStore = useUserStore();

const onUpload = (event) => {
  let filename = event.files[0].name;
  userStore.user.profilePicture = filename;
  console.log(userStore.user.profilePicture)

};
</script>

<template>
  <AppLayout>
    <div class="flex flex-column align-items-center mt-4">
      <div class="panel flex flex-column gap-3 w-8">
        <h1 class="font-bold">Profile</h1>
        <div class="flex justify-content-start">
          <Image :src="'http://localhost:8080/user-upload/1/' + userStore.user.profilePicture" alt="Profile Picture" width="250" preview/>
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
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
</style>
