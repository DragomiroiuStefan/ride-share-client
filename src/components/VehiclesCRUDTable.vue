<script setup>
import {computed, onMounted, ref} from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {vehicleService} from "@/services/VehicleService.js";
import {useUserStore} from "@/stores/user.js";
import {useToast} from "primevue/usetoast";
import InputNumber from "primevue/inputnumber";
import router from "@/router/index.js";
import {userVehicleURL} from "@/services/ApiClient.js";
import {maxLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import ValidationErrors from "@/components/base/ValidationErrors.vue";

const toast = useToast();
const userStore = useUserStore();

const vehicles = ref(null);
const vehicleDialog = ref(false);
const deleteVehicleDialog = ref(false);
const vehicle = ref({});
const selectedVehicle = ref({});
const edit = ref();

const vehicleRules = computed(() => ({
  plateNumber: {required, maxLength: maxLength(20)},
  brand: {required, maxLength: maxLength(50)},
  model: {required, maxLength: maxLength(50)},
  color: {required, maxLength: maxLength(50)},
  registrationYear: {required},
  seats: {required},
}))
const v = useVuelidate(vehicleRules, vehicle, {$autoDirty: true})

onMounted(() => {
  getVehicles();
});

function getVehicles() {
  vehicleService.findByOwner(userStore.user.userId)
      .then(response => {
        vehicles.value = response.data
        vehicles.value.sort((a, b) => a.plateNumber.localeCompare(b.plateNumber));
      })
      .catch(error => {
        console.log(error)
        router.push({name: 'error'})
      });
}

const openNew = () => {
  edit.value = false;
  vehicle.value = {};
  v.value.$reset();
  vehicleDialog.value = true;
};

const hideDialog = () => {
  vehicleDialog.value = false;
  v.value.$reset();
};

const editVehicle = (editVehicle) => {
  edit.value = true;
  vehicle.value = {...editVehicle};
  vehicleDialog.value = true;
};

const confirmDeleteVehicle = (editVehicle) => {
  vehicle.value = editVehicle;
  deleteVehicleDialog.value = true;
};

const saveVehicle = async () => {
  const isFormCorrect = await v.value.$validate()
  if (!isFormCorrect) return

  vehicle.value.owner = userStore.user.userId;

  if (edit.value) {
    vehicleService.update(vehicle.value)
        .then(() => {
          getVehicles()
          toast.add({severity: 'success', summary: 'Successful', detail: 'Vehicle Updated', life: 3000});
        })
        .catch((error) => {
          console.log(error);
          router.push({name: 'error'});
        })
  } else {
    vehicleService.create(vehicle.value)
        .then(() => {
          getVehicles()
          toast.add({severity: 'success', summary: 'Successful', detail: 'Vehicle Created', life: 3000});
        })
        .catch((error) => {
          console.log(error);
          router.push({name: 'error'});
        })
  }
  vehicleDialog.value = false;
  vehicle.value = {};

}

const deleteVehicle = () => {
  vehicleService.delete(vehicle.value.plateNumber)
      .then(() => {
        vehicles.value = vehicles.value.filter((val) => val.plateNumber !== vehicle.value.plateNumber);
        deleteVehicleDialog.value = false;
        vehicle.value = {};
        toast.add({severity: 'success', summary: 'Successful', detail: 'Vehicle Deleted', life: 3000});
      })
      .catch(error => {
        console.log(error);
        router.push({name: 'error'});
      })

};

function selectFile(event) {
  vehicle.value.image = event.files[0];
}

const vehicleImageSrc = (image) => {
  return userVehicleURL(userStore.user.userId, image)
}

</script>

<template>
  <DataTable
      :value="vehicles"
      tableStyle="min-width: 50rem"
      selectionMode="single"
      dataKey="plateNumber"
      v-model:selection="selectedVehicle"
  >
    <template #header>
      <h2 class="text-2xl text-900 font-bold">Vehicles</h2>
    </template>
    <template #empty> No vehicles found.</template>
    <template #loading> Loading vehicles data. Please wait.</template>
    <Column header="Image">
      <template #body="slotProps">
        <img v-if="slotProps.data.image" :src="vehicleImageSrc(slotProps.data.image)" alt="Vehicle Image" class="w-6rem border-round" />
        <i v-else class="pi pi-file-excel"></i>
      </template>
    </Column>
    <Column field="plateNumber" header="Plate Number"></Column>
    <Column field="brand" header="Brand"></Column>
    <Column field="model" header="Model"></Column>
    <Column field="color" header="Color"></Column>
    <Column field="registrationYear" header="Year"></Column>
    <Column field="seats" header="Seats"></Column>
    <Column>
      <template #body="slotProps">
        <Button icon="pi pi-pencil" text rounded outlined class="mr-2" @click="editVehicle(slotProps.data)"/>
        <Button icon="pi pi-trash" text rounded outlined severity="danger" class="mt-2"
                @click="confirmDeleteVehicle(slotProps.data)"/>
      </template>
    </Column>
  </DataTable>

  <Button label="Add Vehicle" icon="pi pi-plus" class="w-max mt-3" @click="openNew"/>

  <Dialog v-model:visible="vehicleDialog" :style="{ width: '550px' }" header="Vehicle Details" :modal="true" class="p-fluid">
    <img v-if="vehicle.image" :src="vehicleImageSrc(vehicle.image)" alt="Vehicle Image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
    <div class="field">
      <label for="plateNumber">Plate Number</label>
      <InputText id="plateNumber" v-model.trim="vehicle.plateNumber" required="true" autofocus
                 :class="{ 'p-invalid': v.plateNumber.$errors.length }"/>
      <ValidationErrors :errors="v.plateNumber.$errors"/>
    </div>
    <div class="field">
      <label for="brand">Brand</label>
      <InputText id="brand" v-model.trim="vehicle.brand" required="true" autofocus
                 :class="{ 'p-invalid': v.brand.$errors.length }"/>
      <ValidationErrors :errors="v.brand.$errors"/>
    </div>
    <div class="field">
      <label for="model">Model</label>
      <InputText id="model" v-model.trim="vehicle.model" required="true" autofocus
                 :class="{ 'p-invalid': v.model.$errors.length }"/>
      <ValidationErrors :errors="v.model.$errors"/>
    </div>
    <div class="field">
      <label for="color">Color</label>
      <InputText id="color" v-model.trim="vehicle.color" required="true" autofocus
                 :class="{ 'p-invalid': v.color.$errors.length }"/>
      <ValidationErrors :errors="v.color.$errors"/>
    </div>
    <div class="field">
      <label for="registrationYear">Registration Year</label>
      <InputNumber id="registrationYear" v-model="vehicle.registrationYear" mode="decimal" :min="2000"
                   :max="new Date().getFullYear() "
                   :useGrouping="false" showButtons
                   :class="{ 'p-invalid': v.registrationYear.$errors.length }"/>
      <ValidationErrors :errors="v.registrationYear.$errors"/>
    </div>
    <div class="field">
      <label for="seats">Seats</label>
      <InputNumber id="seats" v-model="vehicle.seats" mode="decimal" :min="1" :max="10" showButtons
                   :class="{ 'p-invalid': v.seats.$errors.length }"/>
      <ValidationErrors :errors="v.seats.$errors"/>
    </div>
    <div class="field">
      <label for="image">Image</label>
      <FileUpload id="image" name="vehicleImage" accept="image/*" :maxFileSize="10000000"
                  :show-upload-button="false" :show-cancel-button="false" @select="selectFile">
        <template #empty>
          <div class="flex align-items-center justify-content-center flex-column">
            <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400" />
            <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
          </div>
        </template>
      </FileUpload>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
      <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveVehicle"/>
    </template>
  </Dialog>

  <Dialog v-model:visible="deleteVehicleDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
    <div class="flex align-items-center justify-content-center">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"/>
      <span v-if="vehicle"
      >Are you sure you want to delete <b>{{ vehicle.plateNumber }}</b
      >?</span
      >
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteVehicleDialog = false"/>
      <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteVehicle"/>
    </template>
  </Dialog>
</template>
