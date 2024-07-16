<template>
  <ion-page>
    <ion-header>
        
    </ion-header>

    <ion-content class="ion-padding">
      <div class="form-container">
        <ion-img class="soesman-logo" src="../assets/soesman_logo.png"/>
        
        <ion-input label="Email" label-placement="stacked" fill="outline" 
        class="input-item" placeholder="Masukkan Email"
        v-model="email" type="text" required ></ion-input>
        

        <ion-input :type="passwordVisible ? 'text' : 'password'" label="Password" label-placement="stacked" fill="outline" 
        class="input-item" placeholder="Masukkan Password"
        v-model="password" required >
          <div slot="end" @click="togglePasswordVisibility">
            <ion-icon class="visibility-button"
            :icon="passwordVisible ? eyeOutline : eyeOffOutline" ></ion-icon>
          </div>
          
        </ion-input>

        <ion-row v-if="errorMessage">
          <ion-col>
            <p class="error-message">{{ errorMessage }}</p>
          </ion-col>
        </ion-row>
        
      <ion-button class="login input-item" expand="block" @click="login">
        <ion-text class="login-text">Masuk</ion-text>
      </ion-button>

      <ion-row class="to-register">
            <p>Belum punya akun? </p>
            <ion-button class="to-register-button" @click.native="this.$router.push('/register')">Daftar</ion-button>
        </ion-row>
      </div>
    </ion-content>

  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonTitle, IonInput, IonContent, IonButton, IonButtons, IonIcon, IonCard, IonImg, IonRow, IonCol } from '@ionic/vue';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

export default {
  components: {
    IonInput,
    IonPage, IonHeader, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonCard, IonImg, IonRow, IonCol
  },
  data() {
    return {
      email: '',
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
    async login() {
      if (!this.email || !this.password) {
        this.errorMessage = 'Email dan Password tidak boleh kosong';
        return;
      }

      const postData = {
        email: this.email,
        password: this.password,
      };

      const apiUrl = 'http://localhost:8000/api/login';

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
          localStorage.setItem('token', data.token);
          localStorage.setItem('user_id', data.user_id); 
          localStorage.setItem('nama', data.nama); 
          localStorage.setItem('email', data.email); 
          localStorage.setItem('no_telp', data.no_telp); 
          this.$router.push('/tabs/tab1');
        } else {
          this.errorMessage = data.error || 'Login gagal';
        }
      } catch (error) {
        console.error('Kesalahan saat login:', error);
        this.errorMessage = 'Terjadi kesalahan saat login';
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

  --ion-color-primary: #A82A00;
}

.login-text {
  text-transform: none;
  margin: 5px;
}

.login {
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

.to-register-button {
  --background: transparent;
  text-transform: none;
  color: #A82A00;
  --padding-start: 4px !important;
  --box-shadow: none;
  --ripple-color: transparent;
}

.to-register-text,
.to-register-button {
  font-size: 16px; 
}

</style>
