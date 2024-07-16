<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="this.$router.replace('/tabs/tab1')">
            <ion-icon slot="icon-only" :icon="backIcon"></ion-icon>
          </ion-button>
        </ion-buttons>
        
        <ion-title class="ion-text-center">Menu</ion-title>
        
        <ion-buttons slot="end">
          <ion-button @click="goToCart()" class="cart-icon">
            <ion-img src="../assets/keranjang.png" class="keranjang" />
          </ion-button> 
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">

      <ion-title class="title">Best Seller</ion-title>

      <ion-grid>
        <ion-row class="row-best">
          <ion-col size="4" v-for="item in best" :key="item.id">
            <div class="card-container">
              <ion-button @click="addToCart(item)" class="card-button">
                <ion-column class="column-content">
                  <ion-img :src="item.imgUrl" class="card-image"></ion-img>
                  <ion-card-content class="ion-text-left">
                    <div class="item-details">
                      <div class="item-info">
                        <p class="item-name">{{ item.name }}</p>
                        <p>Rp{{ item.price.toLocaleString('id-ID') }}</p>
                      </div>
                      <ion-img src="../assets/bag.svg" class="bag-icon"></ion-img>
                    </div>
                  </ion-card-content>
                </ion-column>
              </ion-button>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
 
      <ion-segment v-model="selectedTab" mode="md">
        <ion-segment-button value="menu" class="custom-tab-button">Coffee</ion-segment-button>
        <ion-segment-button value="drink" class="custom-tab-button">Drink</ion-segment-button>
        <ion-segment-button value="snack" class="custom-tab-button">Snack</ion-segment-button>
      </ion-segment>

      <component :is="currentTabComponent"></component>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonRow, IonCol, IonSegment, IonSegmentButton } from '@ionic/vue';
import { chevronBack, cart } from 'ionicons/icons';
import CoffeePage from './CoffeePage.vue';
import DrinkPage from './DrinkPage.vue';
import SnackPage from './SnackPage.vue';
import MenuPage from './MenuPage.vue';

export default {
  name: 'Tabs2Page',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonRow, IonCol, IonSegment, IonSegmentButton
  },
  data() {
    return {
      backIcon: chevronBack,
      cartIcon: cart,
      selectedTab: 'menu',
      best: [
        { id: 7, name: 'Chocolate', price: 18000, imgUrl: '../assets/best/choco.png', ctg: 'Drink' },
        { id: 1, name: 'Capuccino', price: 18000, imgUrl: '../assets/soesman_kopi.png', ctg: 'Coffee' },
        { id: 15, name: 'Roti Bakar', price: 12000, imgUrl: '../assets/best/rotibakar.png', ctg: 'Snack' }
      ]
    };
  },
  computed: {
    currentTabComponent() {
      switch (this.selectedTab) {
        case 'menu':
          return MenuPage;
        case 'drink':
          return DrinkPage;
        case 'snack':
          return SnackPage;
        default:
          return MenuPage;
      }
    }
  },
  methods: {
    goToCart() {
      this.$router.push({ name: 'CartPage' }); 
    },
    addToCart(item) {
      const cartItem = this.$eventBus.cart.find(i => i.id === item.id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        this.$eventBus.cart.push({ ...item, quantity: 1 });
      }
    },
    saveCategoryToLocalStorage() {
      localStorage.setItem('kategori', 'menu');
    }
  },
  beforeRouteLeave(to, from, next) {
    this.saveCategoryToLocalStorage();
    next();
  },
  mounted() {
    const kategori = localStorage.getItem('kategori');
    if (kategori) {
      this.selectedTab = kategori;
    }
  }
};
</script>

<style scoped>
.title {
  margin-top: 30px;
  margin-bottom: 4px;
}

p {
  text-transform: none;
}

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

.card-button {
  --background: #CFA5A180;
  --background-activated: transparent;
  --background-focused: transparent;
  --background-hover: transparent;
  --color: inherit;
  --box-shadow: none;
  --border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  width: 100%;
  height: 80%;
}

.ion-text-left {
  text-align: left;
  padding: 1px;
  margin-top: 1px;
  margin-left: 4px;
}

.card-image {
  width: 100%;
  aspect-ratio: 1.25 / 1;
  object-fit: cover;
  border-radius: 20px;
  overflow: hidden;
}

.column-content {
  width: 100%;
}

.row-best {
  margin-bottom: 5%;
}

.cart-icon {
  --background-hover: transparent;
  --ripple-color: transparent;
}

.item-name {
  font-weight: bold;
  text-transform: none;
}

.card-container {
  position: relative;
}

.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.bag-icon {
  width: 20%;
}
</style>
