<template>
  <ion-list class="order-list" v-if="filteredOrders.length > 0">
    <ion-item class="order-list-item" v-for="order in filteredOrders" :key="order.id_order">
      <ion-card class="cart-item">
        <ion-label>
          <div>
            <ion-list class="order-list">
              <ion-item class="order-items" v-for="(item, index) in parseItems(order.items)" :key="index">
                <ion-col size="4">
                  <ion-img :src="item.imgUrl" class="item-image"></ion-img>
                </ion-col>
                <ion-col size="6">
                  <div class="item-details">
                    <h2 class="item-name">{{ item.name }}</h2>
                    <p class="item-category">{{ item.ctg }}</p>
                    <p class="item-quantity">{{ item.quantity }}</p>
                    <h2> </h2>
                    <h2> </h2>
                    <h2> </h2>
                    <h2> </h2>
                    <h2> </h2>
                    <p class="item-price" v-if="item.price !== undefined">Rp{{ item.price.toLocaleString('id-ID') }}</p>  
                  </div>
                </ion-col>
              </ion-item>
            </ion-list>
          </div>
          <div class="order-details-container">
            <div class="order-details">
              <p class="label">ID Order</p>
              <p class="value">{{ order.id_order }}</p>
            </div>
            <div class="order-details">
              <p class="label">Total Pembayaran</p>
              <p class="value">{{ order.total_pembayaran }}</p>
            </div>
            <div class="order-details">
              <p class="label">Alamat</p>
              <p class="value">{{ order.alamat }}</p>
            </div>
            <div class="order-details">
              <p class="label">Status</p>
              <p class="value status">{{ order.status }}</p>
            </div>
          </div>
        </ion-label> 
      </ion-card>
    </ion-item>
  </ion-list>
  <div v-else class="no-order-container">
        <ion-img class="no-order-image" src="/assets/empty.png"></ion-img>
        <ion-text class="no-order-text">Belum Ada Pesanan</ion-text>
  </div>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonList, IonItem, IonLabel, IonText, IonImg, IonRow, IonCol } from '@ionic/vue';
import axios from 'axios';
import { menu } from '@/data/menu';

export default {
  name: 'OrderPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonImg,
    IonRow,
    IonCol,
    IonCard
  },
  data() {
    return {
      orders: [],
      id_user: localStorage.getItem('user_id') || 1
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await axios.get(`http://localhost:8000/api/pesanan?id_user=${this.id_user}`);
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    parseItems(items) {
      try {
        const parsedItems = JSON.parse(items);
        return parsedItems.map(item => {
          const menuItem = menu.find(m => m.name === item.name);
          return menuItem ? { ...item, imgUrl: menuItem.imgUrl, price: menuItem.price, ctg: menuItem.ctg } : item;
        });
      } catch (e) {
        console.error('Error parsing items:', e);
        return [];
      }
    }
  },
  computed: {
    filteredOrders() {
      return this.orders
        .filter(order => order.status === 'Menunggu' || order.status === 'Dikonfirmasi' || order.status === 'Dalam Pengiriman')
        .sort((a, b) => b.id_order - a.id_order);
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

.order-list {
  margin-left: -25px;
  margin-right: -25px;
}

.order-list-item {
  --inner-border-width: 0px;
  --border-color: transparent;
  margin-top: 15px;
}

ion-button {
  --background: #A82A00;
  --border-radius: 12px;
}

.cart-item {
  --ion-item-background: #CFA5A180;
  border-radius: 20px;
  --inner-border-width: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-bottom: 1rem;
  max-width: 91%;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1.2 / 1;
  border-radius: 15px;
  overflow: hidden;
  margin: 18px;
  margin-top: 1px;
}
 
.item-details {
  display: flex;
  flex-direction: column;
  margin-top: -20px;
  margin-left: 21px;
  color: black;
}

.item-category {
  color: #808080;
}

.item-quantity {
  color: #808080;
}

.item-price {
  font-weight: bold;
}

.order-details-container {
  margin: 18px;
  margin-top: -12px;
}

.order-details {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  padding-top: 2px;
  color: black;
}

.status {
  color: #A82A00;
  font-weight: bold;
}

.item-name {
  color: black;
  font-weight: bold;
}

.order-list {
  background: transparent;
}

.order-items {
  --inner-border-width: 0px;
  --border-color: transparent;
  background: #ffffff;
}

.label {
  flex: 1;
  text-align: left;
  color: #79747E;
}

.value {
  flex: 1;
  text-align: right;
}

/*  tampilan order kosong */
.no-order-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px); 
}

.no-order-image {
  width: 200px; 
  height: 200px;
}

.no-order-text {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: gray;
}
</style>
