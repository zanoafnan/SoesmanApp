<template>
  <ion-page>
    <ion-header> 
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="this.$router.go(-1)">
            <ion-icon slot="icon-only"  :icon="backIcon"></ion-icon>
          </ion-button>
        </ion-buttons>
        
        <ion-title class="ion-text-center">Pesanan</ion-title>
        
        <ion-buttons slot="end">
          <ion-button @click="goToCart()" class="cart-icon">
            <ion-img src="../assets/keranjang.png" class="keranjang" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-segment v-model="selectedTab" mode="md" class="tabs">
        <ion-segment-button value="waiting" class="custom-tab-button">Pengiriman</ion-segment-button>
        <ion-segment-button value="canceled" class="custom-tab-button">Batal</ion-segment-button>
        <ion-segment-button value="done" class="custom-tab-button">Selesai</ion-segment-button>
      </ion-segment>
 
      <component :is="currentTabComponent"></component>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonSegment, IonSegmentButton } from '@ionic/vue';
import { chevronBack, cart } from 'ionicons/icons';
import OrderCanceledPage from './OrderCanceledPage.vue';
import OrderDonePage from './OrderDonePage.vue';
import OrderWaitingPage from './OrderWaitingPage.vue';

export default {
  name: 'OrderPage',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonSegment, IonSegmentButton
  },
  data() {
    return { 
      backIcon: chevronBack,
      cartIcon: cart,
      selectedTab: 'waiting',
    };
  }, 
  computed: {
    currentTabComponent() {
      switch (this.selectedTab) {
        case 'waiting':
          return OrderWaitingPage;
        case 'canceled':
          return OrderCanceledPage;
        case 'done':
          return OrderDonePage;
        default:
          return OrderWaitingPage;
      }
    }
  },
  methods: {
    goToCart() {
      this.$router.push({ name: 'CartPage' }); 
    }
  },
  onMounted() { 
    const kategori = localStorage.getItem('kategori');
    if (kategori) {
      this.selectedTab = kategori;
    } 
  }
};
</script>


<style scoped>
.custom-tab-button {
  border: 1px solid brown;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
  --color-selected: brown;
}

.custom-tab-button-active {
  background-color: brown;
  --color-selected: brown;
}

ion-segment-button {
  --background-checked: #A82A00;
  --color-checked: white;
  --color: #A82A00;
  --indicator-color: none;
}

.keranjang {
  height: 23px;
  margin-right: 5px;
}

.cart-icon {
  --background-hover: transparent;
  --ripple-color: transparent;
}

.tabs {
  margin-top: 5%;
  margin-bottom: 2%;
}
</style>
