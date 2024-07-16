<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons @click="this.$router.go(-1);" slot="start">
          <ion-button>
            <ion-icon slot="icon-only" :icon="backIcon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="ion-text-center">Lokasi Pengiriman</ion-title>
        <ion-buttons slot="end">
          <ion-button></ion-button>
          <ion-button></ion-button>
          <ion-button></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="kurirLocation && destination">
        <div ref="map" class="map"></div>
      </div>
      <div class="placeholder-map" v-if="!kurirLocation || !destination">
        <p>Memuat Lokasi...</p>
      </div>
      <div class="location-info" v-if="alamat">
        <p>Lokasi Pengiriman</p>
        <div class="address-info">
          <ion-icon class="location-icon" :icon="locationPin"></ion-icon>
          <p>{{ alamat }}</p>
        </div>
      </div>
    </ion-content>
    <div class="fixed-container">
      <ion-button expand="block" @click="handleAntarPesanan" class="save-button">Antar Pesanan</ion-button>
    </div>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton } from '@ionic/vue';
import { ref, nextTick, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Geolocation } from '@capacitor/geolocation';
import { chevronBack as backIcon, location as locationPin } from 'ionicons/icons';

const route = useRoute();
const kurirLocation = ref(null);
const destination = ref(null);
const map = ref(null);
const alamat = ref(route.params.alamat || '');

const loadMap = (kurirLat, kurirLng, destLat, destLng) => {
  const mapOptions = {
    center: { lat: kurirLat, lng: kurirLng },
    zoom: 15
  };
  nextTick(() => {
    map.value = new google.maps.Map(map.value, mapOptions);
    const kurirMarker = new google.maps.Marker({
      position: { lat: kurirLat, lng: kurirLng },
      map: map.value,
      label: 'A',
      title: 'Lokasi Anda'
    });
    const destMarker = new google.maps.Marker({
      position: { lat: destLat, lng: destLng },
      map: map.value,
      label: 'B',
      title: 'Tujuan'
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map.value);

    const request = {
      origin: { lat: kurirLat, lng: kurirLng },
      destination: { lat: destLat, lng: destLng },
      travelMode: 'DRIVING'
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
      } else {
        console.error('Directions request failed due to ', status);
      }
    });
  });
};

const openGoogleMaps = async () => {
  try {
    const position = await Geolocation.getCurrentPosition();
    const kurirLat = parseFloat(position.coords.latitude.toFixed(6));
    const kurirLng = parseFloat(position.coords.longitude.toFixed(6));

    const storedAlamat = route.params.alamat;
    if (storedAlamat) {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(storedAlamat)}&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) {
        const destLat = parseFloat(data[0].lat);
        const destLng = parseFloat(data[0].lon);

        // Open Google Maps sesuai data lokasi sekarang dan tujuan
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${kurirLat},${kurirLng}&destination=${destLat},${destLng}&travelmode=driving`;
        window.open(googleMapsUrl, '_blank');
      } else {
        console.error('Address not found');
      }
    }
  } catch (error) {
    console.error('Error getting location or address', error);
  }
};

const handleAntarPesanan = async () => {
  await openGoogleMaps();
  window.location.replace('/pesanankurir');
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
      destination.value = { latitude, longitude };
      loadMap(kurirLocation.value.latitude, kurirLocation.value.longitude, latitude, longitude);
    } else {
      console.error('Address not found');
    }
  } catch (error) {
    console.error('Error getting address from API', error);
  }
};

const getLocation = async () => {
  try {
    const position = await Geolocation.getCurrentPosition();
    const latitude = parseFloat(position.coords.latitude.toFixed(6));
    const longitude = parseFloat(position.coords.longitude.toFixed(6));
    kurirLocation.value = { latitude, longitude };
    await getAddressFromAPI(alamat);
  } catch (error) {
    console.error('Error getting location', error);
  }
};

onMounted(async () => {
  try {
    const position = await Geolocation.getCurrentPosition();
    const kurirLat = parseFloat(position.coords.latitude.toFixed(6));
    const kurirLng = parseFloat(position.coords.longitude.toFixed(6));
    kurirLocation.value = { latitude: kurirLat, longitude: kurirLng };

    const storedAlamat = route.params.alamat;
    if (storedAlamat) {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(storedAlamat)}&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) {
        const destLat = parseFloat(data[0].lat);
        const destLng = parseFloat(data[0].lon);
        destination.value = { latitude: destLat, longitude: destLng };

        // Load the map with the current and destination locations
        loadMap(kurirLat, kurirLng, destLat, destLng);
      } else {
        console.error('Address not found');
      }
    }
  } catch (error) {
    console.error('Error getting location or address', error);
  }
});
</script>

<style scoped>
.ion-padding {
  padding: 16px;
}

.location-info {
  text-align: left;
}

.address-info {
  display: flex;
  align-items: center;
}

.location-icon {
  width: 100px;
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
  --background: #A82A00;
}
</style>
