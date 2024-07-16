<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="form-container">
        <ion-img class="soesman-logo" src="../assets/soesman_logo.png"/>
        
        <ion-input label="Nama" label-placement="stacked" fill="outline"
        class="input-item" placeholder="Masukkan Nama"
        v-model="nama" type="text" required></ion-input>
        
        <ion-input label="No Telp" label-placement="stacked" fill="outline"
        class="input-item" placeholder="Masukkan No Telp"
        v-model="no_telp" type="tel" required></ion-input>
        
        <ion-input label="Email" label-placement="stacked" fill="outline"
        class="input-item" placeholder="Masukkan Email"
        v-model="email" type="email" required></ion-input>
        
        <ion-input :type="passwordVisible ? 'text' : 'password'" label="Password" label-placement="stacked" fill="outline"
        class="input-item" placeholder="Masukkan Password"
        v-model="password" required>
          <div slot="end" @click="togglePasswordVisibility">
            <ion-icon class="visibility-button"
            :icon="passwordVisible ? eyeOutline : eyeOffOutline"></ion-icon>
          </div>
        </ion-input>
        
        <ion-row v-if="errorMessage">
          <ion-col>
            <p class="error-message">{{ errorMessage }}</p>
          </ion-col>
        </ion-row>
        
        <ion-button class="register input-item" expand="block" @click="register">
          <ion-text class="register-text">Daftar</ion-text>
        </ion-button>
        
        <ion-row class="to-login">
          <p>Sudah punya akun? </p>
          <ion-button class="to-login-button" @click.native="this.$router.replace('/login')">Masuk</ion-button>
        </ion-row>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonInput, IonContent, IonButton, IonIcon, IonImg, IonRow, IonCol } from '@ionic/vue';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

export default {
  components: {
    IonInput, IonPage, IonContent, IonButton, IonIcon, IonImg, IonRow, IonCol
  },
  data() {
    return {
      nama: '',
      email: '',
      no_telp: '',
      password: '',
      errorMessage: '',
      eyeOutline: eyeOutline,
      eyeOffOutline: eyeOffOutline,
      passwordVisible: false
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    async register() {
      if (!this.nama || !this.email || !this.no_telp || !this.password) {
        this.errorMessage = 'Semua field harus diisi';
        return;
      }

      const postData = {
        nama: this.nama,
        email: this.email,
        no_telp: this.no_telp,
        password: this.password,
      };
      
      const apiUrl = 'http://127.0.0.1:8000/api/register';
      
      try {
        const response = await fetch(apiUrl, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
       
        const data = await response.json();

        if (response.ok) {
          this.$router.push('/login');
        } else {
          this.errorMessage = data.error || 'Registrasi gagal';
        }
      } catch (error) {
        console.error('Kesalahan saat registrasi:', error);
        this.errorMessage = 'Terjadi kesalahan saat registrasi';
      }
    }
  }
};
</script>

<style>
.error-message {
  color: red;
}

.ion-padding {
  padding: 16px;
}
 
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%; 
}

.soesman-logo {
  width: 120px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 30px;
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
  margin-top: 10px;
  background-color: white;
  padding: 0 8px;
}

.input-item {
  width: 100%;
  max-width: 400px; 
  margin: 10px;
}

.register-text {
  text-transform: none;
  margin: 5px;
}

.register {
  --background: #A82A00;
  --border-radius: 10px;
  margin: 2%;
}

.visibility-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: larger;
  color: gray;
}

.to-login-button {
  --background: transparent;
  text-transform: none;
  color: #A82A00;
  --padding-start: 4px !important;
  --box-shadow: none;
  --ripple-color: transparent;
}

.to-login-text,
.to-login-button {
  font-size: 16px; 
}


</style>
