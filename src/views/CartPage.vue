<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons @click="this.$router.go(-1);" slot="start">
          <ion-button>
            <ion-icon slot="icon-only" :icon="backIcon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="ion-text-center">Keranjang</ion-title>
        <ion-buttons slot="end">
          <ion-button></ion-button>
          <ion-button></ion-button>
          <ion-button></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list class="list" v-if="cart.length > 0">
        <ion-item v-for="item in cart" :key="item.id" class="cart-item">
          <ion-grid>
            <ion-row class="item-row">
              <ion-col size="4">
                <ion-img :src="item.imgUrl" class="item-image"></ion-img>
              </ion-col>
              <ion-col size="6">
                <ion-text class="item-details">
                  <h2 class="item-name">{{ item.name }}</h2>
                  <p class="item-category">{{ item.ctg }}</p>
                  <p class="item-price">Rp{{ item.price.toLocaleString('id-ID') }}</p>
                </ion-text>
              </ion-col>
              <ion-col size="2" class="item-controls">
                <ion-button fill="clear" @click="removeFromCart(item)" class="remove-button">
                  <ion-img class="button-icon" src="/assets/remove.svg"></ion-img>
                </ion-button>
                <div class="quantity-controls">
                  <ion-button fill="clear" @click="decreaseQuantity(item)" class="round-button">
                    <ion-text class="button-icon">-</ion-text>
                  </ion-button>
                  <ion-text class="quantity-text">{{ item.quantity }}</ion-text>
                  <ion-button fill="clear" @click="increaseQuantity(item)" class="round-button">
                    <ion-text class="button-icon">+</ion-text>
                  </ion-button>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      </ion-list>

      <!-- tampilkan pesan keranjang kosong -->
      <div v-else class="empty-cart-container">
        <ion-img class="empty-cart-image" src="/assets/empty.png"></ion-img>
        <ion-text class="empty-cart-text">Keranjang Kosong</ion-text>
      </div>

      <!-- tombol Lanjutkan ke Pembayaran, hanya jika ada barang di keranjang -->
      <div v-if="cart.length > 0" class="to-payment-container">
        <ion-button class="to-payment" expand="block" @click="goToPayment">
        <ion-text class="to-payment-text">Lanjutkan ke Pembayaran</ion-text>
      </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonButton,
  IonIcon,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButtons
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { chevronBack } from 'ionicons/icons';

export default {
  name: 'CartPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonButton,
    IonIcon,
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
    IonButtons,
    IonText
  },
  setup() {
    const userId = ref('');
    const address = ref('');
    const router = useRouter();

    onMounted(() => {
      const user_id = localStorage.getItem('user_id');
      if (user_id) {
        userId.value = user_id;
      }
    });

    return {
      userId,
      address,
      router
    };
  },
  data() {
    return {
      cart: this.$eventBus.cart,
      backIcon: chevronBack,
    };
  },
  created() {
    this.$eventBus.on('updateAddress', this.updateAddress);
  },
  beforeUnmount() {
    this.$eventBus.off('updateAddress', this.updateAddress);
  },
  methods: {
    updateAddress(address) {
      this.address = address;
    },
    increaseQuantity(item) {
      item.quantity += 1;
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.removeFromCart(item);
      }
    },
    removeFromCart(item) {
      const index = this.cart.findIndex(i => i.id === item.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
    goToPayment() {
      this.$router.push({ name: 'PaymentPage' }); 
    }
  }
};
</script>

<style scoped>

.cart-item {
  --ion-item-background: #CFA5A180;
  --border-radius: 20px;
  margin: 10px 0;
  padding: 10px;
}

.item-row {
  margin-left: -10px;
}

.item-image {
  width: 100%;
  height: 100%;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 15px;
  overflow: hidden;
}

.item-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}  

.item-name {
  font-weight: bold;
  margin-top: 10px;
}

.item-category {
  color: gray;
  margin-top: -6px;
}

.item-price {
  font-weight: bold;
}

.item-controls {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  
  padding-top: 10px;
  padding-bottom: 10px;
}

.remove-button {
  background-color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;

  --background-hover: transparent;
  --ripple-color: transparent;
}

.button-icon {
  position: absolute;
  width: 16px;
  font-size: 150%;
  color: black;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
}

.round-button {
  background-color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  --background-hover: transparent;
  --ripple-color: transparent;
}

.quantity-text {
  margin: 0 10px;
}

.to-payment-text {
  text-transform: none;
  margin: 5px;
}

.to-payment {
  --background: #A82A00;
  --border-radius: 10px;
  margin: 2%;
}

.to-payment-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}

/*  tampilan keranjang kosong */
.empty-cart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px); 
}

.empty-cart-image {
  width: 200px; 
  height: 200px;
}

.empty-cart-text {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: gray;
}

.list {
  padding-bottom: 100px;
}
</style>