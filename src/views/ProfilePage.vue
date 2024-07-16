<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons @click="this.$router.go(-1);" slot="start">
          <ion-button>
            <ion-icon slot="icon-only" :icon="backIcon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="ion-text-center">Edit Profil</ion-title>
        <ion-buttons slot="end">
          <ion-button></ion-button>
          <ion-button></ion-button>
          <ion-button></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="form-container">
        <ion-img class="profile-side" src="../assets/profile.png"/>
          
        
        <ion-input label="Nama" label-placement="stacked" fill="outline" v-model="formData.nama"
        class="input-item" placeholder="Masukkan Nama"></ion-input>

        <ion-input label="No. Telepon" label-placement="stacked" fill="outline" v-model="formData.no_telp"
        class="input-item" placeholder="Masukkan No. Telp"></ion-input>

        <ion-input label="Email" label-placement="stacked" fill="outline" v-model="formData.email"
        class="input-item" placeholder="Masukkan Email"></ion-input>
        
        <ion-input label="Alamat" label-placement="stacked" :readonly="true"
        fill="outline" v-model="formData.alamat" value="formData.value.alamat"
        class="input-item" placeholder="Alamat Belum Ditambahkan">
        <div slot="end">
          <ion-button class="edit-button" @click="goToLocation">Edit</ion-button>
        </div>
        </ion-input>
        
        <div class="save-container">
        <ion-button class="save" expand="block" @click="simpanPerubahan">
        <ion-text class="save-text">Simpan</ion-text>
      </ion-button>
      </div>
      </div>
    </ion-content>
  </ion-page>
</template>
 
<script setup>
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonIcon, IonButtons, IonImg, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { chevronBack as backIcon } from 'ionicons/icons';

const formData = ref({
  nama: '',
  email: '',
  no_telp: '',
  alamat: ''
});

const router = useRouter();

const simpanPerubahan = async () => {
  try {
    const user_id = localStorage.getItem('user_id');
    const response = await axios.post('http://localhost:8000/api/update-profile', {
      ...formData.value,
      user_id: user_id
    });
    // Menyimpan ke localStorage
    localStorage.setItem('nama', formData.value.nama);
    localStorage.setItem('email', formData.value.email);
    localStorage.setItem('no_telp', formData.value.no_telp);
    localStorage.setItem('alamat', formData.value.alamat);

    console.log('Response:', response.data);
    // success message
  } catch (error) {
    console.error('Error:', error);
    // Handle error
  }
}

const goToLocation = () => {
  router.push('/location');
}

onMounted(() => {
  formData.value.nama = localStorage.getItem('nama') || '';
  formData.value.email = localStorage.getItem('email') || '';
  formData.value.no_telp = localStorage.getItem('no_telp') || '';
  formData.value.alamat = localStorage.getItem('alamat') || '';
  
});
</script>

<style scoped>
.ion-padding {
  padding: 16px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 65%; 
}

.profile-side {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}

.form-item {
  width: 100%;
  max-width: 400px; 
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
}
.form-item ion-label {
  margin-top: -10px;
  background-color: white;
  padding: 0 8px;
}

.input-item {
  width: 100%;
  max-width: 400px; 
  margin: 10px;
}

.alamat-item {
  margin-bottom: 16px;
}

.alamat-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 14px;
}

.alamat-text {
  flex-grow: 1;
  margin-right: 10px;
}


.edit-button {
  --background: #A82A00;
  background-color: white;
  text-transform: none;
}


.save-text {
  text-transform: none;
  margin: 5px;
}

.save {
  --background: #A82A00;
  --border-radius: 10px;
  margin: 2%;
}

.save-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}
</style>
