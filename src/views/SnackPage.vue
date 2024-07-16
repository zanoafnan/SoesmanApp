<template>
  <ion-content class="content">
    <ion-grid>
      <ion-row>
        <ion-col size="4" v-for="item in filteredMenu" :key="item.id">
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
  </ion-content>
</template> 

<script>
import { IonContent, IonRow, IonCol, IonCardContent, IonButton, IonImg, IonGrid } from '@ionic/vue';
import { menu } from '@/data/menu';

export default {
  name: 'MenuPage',
  components: {
    IonContent,
    IonRow,
    IonCol,
    IonCardContent,
    IonButton,
    IonImg,
    IonGrid
  },
  data() {
    return {
      menu: menu
    };
  },
  computed: {
    filteredMenu() {
      return this.menu.filter(item => item.ctg === 'Snack');
    }
  },
  methods: {
    addToCart(item) {
      const cartItem = this.$eventBus.cart.find(i => i.id === item.id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        this.$eventBus.cart.push({ ...item, quantity: 1 });
      }
    }
  }
};
</script>

<style scoped>
.ion-text-left {
  text-align: left;
  padding: 1px;
  margin-top: 1px;
  margin-left: 4px;
}

p {
  text-transform: none;
}

.card-container {
  position: relative;
}

.card-button {
  margin-top: 15px;
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
}

.card-image {
  width: 100%;
  aspect-ratio: 1.25 / 1;
  object-fit: cover;
  border-radius: 20px;
  overflow: hidden;
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

.column-content {
  width: 100%;
}

.item-name {
  font-weight: bold;
  text-transform: none;
}

.content {
  overflow: hidden;
}



.bag-icon {
  width: 20%;
}
</style>