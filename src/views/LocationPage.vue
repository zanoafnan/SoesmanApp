<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons @click="this.$router.go(-1);" slot="start">
          <ion-button>
            <ion-icon slot="icon-only" :icon="backIcon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="ion-text-center">Lokasi</ion-title>
        <ion-buttons slot="end">
          <ion-button></ion-button>
          <ion-button></ion-button>
          <ion-button></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
 
    <ion-content class="ion-padding">
      <div v-if="location">
        <div ref="map" class="map"></div>
      </div>
      <div class="placeholder-map" v-if="!location">
        <p>Tambahkan Lokasi</p>
      </div>
      <div class="location-info">
        <p>Lokasi saat ini</p>
        <div class="address-info">
          <ion-icon class="location-icon" :icon="locationPin"></ion-icon>
          <ion-text>{{ alamat }}</ion-text>
        </div>
      </div>
    </ion-content>
    <div class="fixed-container">
      <ion-button expand="block" @click="getLocation" class="save-button">Dapatkan Lokasi</ion-button>
    </div>
  </ion-page>
</template>

<script setup>
import { IonPage, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton } from '@ionic/vue';
import { ref, onMounted, nextTick } from 'vue';
import { Geolocation } from '@capacitor/geolocation';
import { chevronBack as backIcon, locationOutline as locationPin } from 'ionicons/icons';

const location = ref(null);
const userId = ref(localStorage.getItem('user_id') || '');
const map = ref(null);
const alamat = ref(localStorage.getItem('alamat') || '');

const loadMap = (lat, lng) => {
  const mapOptions = {
    center: { lat, lng },
    zoom: 15
  };
  nextTick(() => {
    map.value = new google.maps.Map(map.value, mapOptions);
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: map.value,
      draggable: true  
    });

    
    google.maps.event.addListener(marker, 'dragend', async (event) => {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();
      location.value = { latitude: newLat, longitude: newLng };
      await getAddress(newLat, newLng);
    });
  });
};

const getAddressFromAPI = async (address) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);
      location.value = { latitude, longitude };
      loadMap(latitude, longitude);
    } else {
      console.error('Address not found');
    }
  } catch (error) {
    console.error('Error getting address from API', error);
  }
};

onMounted(() => {
  const storedAlamat = localStorage.getItem('alamat');
  if (storedAlamat) {
    alamat.value = storedAlamat;
    getAddressFromAPI(storedAlamat);
  }
});

const getLocation = async () => {
  try {
    const position = await Geolocation.getCurrentPosition();
    const latitude = parseFloat(position.coords.latitude.toFixed(6));
    const longitude = parseFloat(position.coords.longitude.toFixed(6));
    location.value = { latitude, longitude };
    await getAddress(latitude, longitude);
    loadMap(latitude, longitude);
  } catch (error) {
    console.error('Error getting location', error);
  }
};

const getAddress = async (lat, lng) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.display_name) {
      alamat.value = data.display_name;
      await saveAddress(alamat.value);
    } else {
      alamat.value = 'Address not found';
    }
  } catch (error) {
    console.error('Error getting address', error);
  }
};

const saveAddress = async (alamat) => {
  try {
    const postData = {
      user_id: userId.value,
      alamat: alamat
    };
    
    const apiUrl = 'http://127.0.0.1:8000/api/updatelocation'; 

    const response = await fetch(apiUrl, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Alamat berhasil disimpan', data);
      localStorage.setItem('alamat', alamat);
    } else {
      console.error('Gagal menyimpan alamat', data.error);
    }
  } catch (error) { 
    console.error('Error saving address', error);
  }
};
</script>

<style scoped>

.location-info {
  text-align: left;
  margin: 2px;
}
 
.address-info {
  display: flex;
  align-items: center;
}

.location-icon {
  width: 10vh;
  font-size: x-large;
}

.map {
  height: 400px;
  width: 100%;
  margin-top: 20px;
}

.placeholder-map {
  height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border: 2px dashed #ccc;
  margin-top: 20px;
}

.fixed-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.save-button {
  text-transform: none;
  --background: #A82A00;
}
</style>
