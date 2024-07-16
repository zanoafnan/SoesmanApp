<template>
  <ion-page>
    <ion-header>
      <ion-toolbar> 
        <ion-buttons slot="start">
          <ion-button @click="this.$router.go(-1)">
          </ion-button>
        </ion-buttons>
        <ion-title>
            <ion-img class="logo" src="../assets/soesman_logo_title.png" alt="Soesman" width="120" height="60" />
          </ion-title>
        <ion-buttons slot="end">
          <ion-button @click="goToCart()" class="cart-icon">
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-title class="ion-text-left"> Pesanan Selesai </ion-title>
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
                        <p class="item-price">Rp{{ item.price }}</p>
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
                  <p class="label">ID User</p>
                  <p class="value">{{ order.id_user }}</p>
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

    </ion-content>
  </ion-page>
</template>


<script>
import { IonPage, IonHeader, IonToolbar, IonIcon, IonButtons, IonTitle, IonContent, IonCard, IonList, IonItem, IonLabel, IonText, IonImg, IonRow, IonCol, IonButton } from '@ionic/vue';
import axios from 'axios';
import { menu } from '@/data/menu';
import { chevronBack} from 'ionicons/icons';


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
    IonCard,
    IonIcon,
    IonButton,
    IonButtons
  },
  data() {
    return {
      orders: [],
      backIcon: chevronBack
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await axios.get('http://localhost:8000/api/pesanankurir');
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
    },
    async updateOrderStatus(id_order, status) {
      try {
        const response = await axios.post('http://localhost:8000/api/pesanankurir', {
          id_order: id_order,
          status: status
        });
        if (response.data.message) {
          this.fetchOrders();
        }
      } catch (error) {
        console.error('Failed to update order status:', error);
      }
    },
    navigateToLocationPage(alamat) {
      this.$router.push({ name: 'LocationKurirPage', params: { alamat: alamat } });
    },
  },
  
  computed: {
    filteredOrders() {
      return this.orders
        .filter(order => order.status === 'Diterima')
        .sort((a, b) => b.id_order - a.id_order);
    }
  }
};
</script>
<style scoped>

.logo {
  height: 45px;
  margin: 9px;
  margin-left: 1px;
}

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

ion-item {
  --border-color: transparent;
}

.ion-text-left {
   margin-top: 16px;
   font-weight: bold;
}

.keranjang {
  height: 23px;
  margin-right: 5px;
}

.cart-icon {
  --background-hover: transparent;
  --ripple-color: transparent;
}

.order-list {
  margin-left: -25px;
  margin-right: -25px;
}

.order-list-item {
  --inner-border-width: 0px;
  --border-color: transparent;
  margin-top: 12px;
}

ion-button {
  --background: #A82A00;
  --border-radius: 10px;
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

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px; 
  margin-top: 10px;
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
