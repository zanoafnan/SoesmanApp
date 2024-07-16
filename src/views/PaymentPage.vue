<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons @click="this.$router.go(-1)" slot="start">
          <ion-button>
            <ion-icon slot="icon-only" :icon="backIcon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="ion-text-center">Soesman Coffee</ion-title>
        <ion-buttons slot="end">
          <ion-button></ion-button>
          <ion-button></ion-button>
          <ion-button></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      
        <ion-list v-if="cart.length > 0" v-for="item in cart" :key="item.id">
            <ion-card class="cart-item">
            
              <ion-row class="item-row">
                <ion-col>
                  <ion-text class="item-details">
                    <h2 class="item-name">{{ item.name }}</h2>
                    <p class="item-category">{{ item.ctg }}</p>
                    <p class="item-price">Rp{{ item.price.toLocaleString('id-ID') }}</p>
                  </ion-text>
                </ion-col>
                <ion-col size="2.5" class="item-controls">
                  <img :src="item.imgUrl" class="item-image" alt="Item image">
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
          </ion-card>
        </ion-list>
      

      <ion-card class="address-container">
        <ion-card-content>
          <ion-label class="address-label">Alamat Pengantaran</ion-label>
          <ion-text class="address">{{ address }}</ion-text>
          <ion-button @click="this.$router.push('/location')" fill="outline" color="color" class="address-button" size="small">Ganti Alamat</ion-button>
        </ion-card-content>
      </ion-card> 

      <ion-label class="summary-title">Ringkasan Pembayaran</ion-label>

      <ion-card class="summary-container">
        <ion-card-content>
          
          <div class="summary-item">
            <ion-label>Harga</ion-label>
            <ion-text>{{ calculateTotalPrice().toLocaleString('id-ID') }}</ion-text>
          </div>
          <div class="summary-item">
            <ion-label>Biaya Penanganan dan Pengiriman</ion-label>
            <ion-text>12.000</ion-text>
          </div>
          <div class="summary-total">
            <ion-label>Total Pembayaran</ion-label>
            <ion-text>{{ calculateTotalPayment().toLocaleString('id-ID') }}</ion-text>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <div class="to-payment-container">
      <div class="payment-summary">
        <ion-img class="coupon-icon" src="/assets/coupon.svg"></ion-img>
        <ion-label class="tunai">Tunai</ion-label>
        <ion-label class="total-payment">{{ calculateTotalPayment().toLocaleString('id-ID') }}</ion-label>
      </div>
      <ion-button expand="block" @click="submitOrder" class="to-payment">Pesan Sekarang</ion-button>
    </div>
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
  IonLabel, 
  IonButton,
  IonIcon,
  IonText,
  IonCard,
  IonCardContent,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonImg
} from '@ionic/vue';
import axios from 'axios';
import { chevronBack } from 'ionicons/icons';
import { ref } from 'vue';

export default {
  name: 'PaymentPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonIcon,
    IonItem,
    IonLabel,
    IonButton,
    IonText,
    IonCard,
    IonCardContent,
    IonButtons,
    IonBackButton,
    IonGrid,
    IonRow,
    IonImg,
    IonCol
  },
  setup() {
    const userId = ref(localStorage.getItem('user_id') || '');
    const address = ref(localStorage.getItem('alamat') || '');

    return {
      userId,
      address
    };
  },
  data() {
    return {
      cart: this.$eventBus.cart,
      backIcon: chevronBack
    };
  },
  methods: {
    calculateTotalPrice() {
      return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    calculateTotalPayment() {
      const handlingFee = 12000;
      return this.calculateTotalPrice() + handlingFee;
    },
    increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
    async submitOrder() {
      const orderData = {
        id_user: this.userId, 
        items: this.cart.map(item => ({ name: item.name, quantity: item.quantity })),
        biaya: this.calculateTotalPrice(),
        total_pembayaran: this.calculateTotalPayment(), 
        alamat: this.address, 
        status: 'Menunggu'
      };

      const apiUrl = 'http://127.0.0.1:8000/api/pesanan';

      try { 
        const response = await axios.post(apiUrl, orderData);
        if (response.status === 200) {
          this.$router.replace('/tabs/tab3');
        } else {
          console.error('Gagal membuat pesanan');
        }
      } catch (error) {
        console.error('Gagal membuat pesanan:', error);
      }
    }
  }
};
</script>

<style scoped>
ion-header {
  --background: #ffffff;
  --color: #000000;
}

ion-toolbar {
  --background: #ffffff;
  --color: #000000;
}

ion-title {
  text-align: center;
}

ion-label {
  color: #000;
}

.item-card {
  max-width: 600px;
  margin: 0 auto;
}
 
.cart-item {
  --ion-item-background: white;
  --border-radius: 20px;
  padding: 10px;
  --inner-border-width: 0px;
  margin-bottom: 0%;
}

.item-row {
  margin-left: -10px;
}

.item-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  margin-bottom: 10px;
  aspect-ratio: 1 / 1;
  border-radius: 20px;
  overflow: hidden;
}

.item-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
}

.item-name {
  color: black;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  background-color: #f6f6f6;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-text {
  margin: 0 10px;
}

.address-label {
  color: black;
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}

.address {
  display: block;
  margin-bottom: 4px;
  color: #000;
}

ion-button[fill="outline"] {
  --border-radius: 4px;
  --border-color: #CFA5A180;
  --color: #CFA5A180;
  font-size: 12px;
  margin-top: 10px;
}

.summary-title {
  font-weight: bold;
  margin-bottom: 8px;
  margin-left: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  border-top: 1px solid #000;
  padding-top: 8px;
}

.summary-container{
  margin-bottom: 125px;
}

.address-container{
  margin-top: 20px;
  margin-bottom: 40px;
}

.address-button {
  color: #A82A00;
  text-transform: none;
}

.total-payment {
  float: right;
  font-weight: bold;
}

ion-footer {
  --background: #ffffff;
  padding: 10px;
}

.order-button {
  --background: #CFA5A180;
  --color: #ffffff;
  --border-radius: 4px;
  width: calc(100% - 20px);
  font-size: 14px;
}

ion-card {
  border-radius: 15px;
}

ion-card-content {
  padding: 10px;
}

ion-item {
  --padding-start: 0;
}


.to-payment {
  --background: #A82A00;
  --border-radius: 10px;
  text-transform: none;
}

.coupon-icon {
  position: absolute;
  width: 16px;
  font-size: 150%;
  margin: 10px;
  color: black;
}

.tunai {
  padding-left: 25px;
}

.to-payment-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.payment-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.payment-summary ion-label {
  margin: 0 10px;
}

.total-payment {
  margin-left: auto;
  font-weight: bold;
}

</style>
