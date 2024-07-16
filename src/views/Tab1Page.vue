<template> 
  <ion-page>
    <ion-app>
    <ion-menu side="start" content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <div class="profile-header">
              <ion-img class="profile-side" src="../assets/profile.png"/>
              <div class="profile-info">
                <h2 class="profile-name">{{ namaUser }}</h2>
                <p class="profile-email">{{ emailUser }}</p>
                <ion-button class="edit-profile" @click="goToPage('/profile')">Edit Profil</ion-button>
              </div>
            </div>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
            
            <ion-item @click="goToPage('/cart')">
              <ion-icon slot="start" :icon="cart" ></ion-icon>
              Keranjang
            </ion-item>
            <ion-item @click="goToPage('/tabs/tab3')">
              <ion-icon slot="start" :icon="list"></ion-icon>
              Pesanan
            </ion-item>
            <ion-item @click="goToPage('/location')">
              <ion-icon slot="start" :icon="location"></ion-icon>
              Lokasi
            </ion-item>
            <ion-item @click="logout">
              <ion-icon slot="start" :icon="door"></ion-icon>
              Keluar
            </ion-item>
          </ion-list>
      </ion-content>
    </ion-menu>

    <ion-router-outlet id="main-content"></ion-router-outlet>
    
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start" >
            <ion-menu-button class="ion-menu-button">
              <ion-img class="profile" src="../assets/profile.png" />
            </ion-menu-button>
          </ion-buttons>

          <ion-title>
            <ion-img class="logo" src="../assets/soesman_logo_title.png" alt="Soesman" width="120" height="60" />
          </ion-title>

          <ion-buttons slot="end">
            <ion-button class="cart-icon" @click="goToPage('/cart')">
              <ion-icon name="settings"></ion-icon>
              <ion-img src="../assets/keranjang.png" class="keranjang"/>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content fullscreen>
        <ion-img class="banner" src="../assets/soesman_banner.png" alt="Banner"></ion-img>

        <ion-grid>
          <ion-row class="row-best">

            <!-- Item -->
            <ion-col size="4">
              <div class="card-container">
                <ion-button @click="goToMenu('menu')" class="card-button">
                  <ion-column class="column-content">
                    <ion-img src="../assets/soesman_kopi.png" class="card-image"></ion-img>
                    <ion-card-content class="best-text">
                      <div class="item-details">
                      <div class="item-info">
                        <p class="item-name">Capuccino</p>
                      <p>Rp18.000</p>
                    </div>
                      <ion-img src="../assets/bag.svg" class="bag-icon"></ion-img>
                    </div>
                    </ion-card-content>
                  </ion-column>
                </ion-button>
              </div>
            </ion-col>

            <!-- Item -->
            <ion-col size="4">
              <div class="card-container">
                <ion-button @click="goToMenu('menu')" class="card-button">
                  <ion-column class="column-content">
                    <ion-img src="../assets/best/choco.png" class="card-image"></ion-img>
                    <ion-card-content class="best-text">
                      <div class="item-details">
                      <div class="item-info">
                        <p class="item-name">Chocolate</p>
                      <p>Rp18.000</p>
                    </div>
                      <ion-img src="../assets/bag.svg" class="bag-icon"></ion-img>
                    </div>
                    </ion-card-content>
                  </ion-column>
                </ion-button>
              </div>
            </ion-col>
           
            <!-- Item -->
            <ion-col size="4">
              <div class="card-container">
                <ion-button @click="goToMenu('menu')" class="card-button">
                  <ion-column class="column-content">
                    <ion-img src="../assets/best/rotibakar.png" class="card-image"></ion-img>
                    <ion-card-content class="best-text">
                      <div class="item-details">
                      <div class="item-info">
                        <p class="item-name">Roti Bakar</p>
                      <p>Rp12.000</p>
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

        <ion-title class="top-menu-title">Menu Terlaris</ion-title>

        <ion-grid>
          <ion-grid>
            <ion-row>
              <ion-button @click="goToMenu('menu')" class="card-button">
                <div class="month-best-content">
                  <div class="best-seller">Best Seller
                  </div>
                  <div>
                    <ion-img src="../assets/bag.svg" class="month-bag-icon"/>
                  </div>
                  <ion-img src="../assets/soesman_kopi.png" class="month-image"/>
                  <ion-card-content class="ion-text-left">
                    <p class="item-name">Capuccino</p>
                    <p class="item-category">Coffee</p>
                    <ion-card-content class="ion-text-left"></ion-card-content>
                    <p class="item-price">Rp18.000</p>

                  </ion-card-content>
                </div>
              </ion-button>
            </ion-row>
          </ion-grid>
        </ion-grid>

        <ion-grid class="menu">
          <ion-row>
            <ion-col size="4">
              <ion-title class="top-menu-title">Menu</ion-title>
            </ion-col>
            <ion-col size="8" class="ion-text-end">
            <ion-button @click="goToMenu('menu')" class="see-menu-button">
              <ion-label class="see-menu">Lihat semua menu </ion-label>
            </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="4">
              <div class="card-container menu-card">
                <ion-button @click="goToMenu('menu')" class="card-button menu-card-button">
                  <ion-col class="menu-content">
                    <ion-img src="assets/menuLogo/coffee.svg" class="menu-image"></ion-img>
                    <ion-card-content class="ion-text-left">
                      <p class="item-name">Coffee</p>
                    </ion-card-content>
                  </ion-col>
                </ion-button>
              </div>
            </ion-col>
            <ion-col size="4">
              <div class="card-container menu-card">
                <ion-button @click="goToMenu('drink')" class="card-button menu-card-button">
                  <ion-col class="menu-content">
                    <ion-img src="assets/menuLogo/drink.svg" class="menu-image"></ion-img>
                    <ion-card-content class="ion-text-left">
                      <p class="item-name">Drink</p>
                    </ion-card-content>
                  </ion-col>
                </ion-button>
              </div>
            </ion-col>
            <ion-col size="4">
              <div class="card-container menu-card">
                <ion-button @click="goToMenu('snack')" class="card-button menu-card-button">
                  <ion-col class="menu-content">
                    <ion-img src="assets/menuLogo/snack.svg" class="menu-image"></ion-img>
                    <ion-card-content class="ion-text-left">
                      <p class="item-name">Snack</p>
                    </ion-card-content>
                  </ion-col>
                </ion-button>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
   </ion-app>
  </ion-page>
</template>

<script setup>
import { IonApp, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButtons, IonButton, IonIcon, IonImg, IonRouterOutlet, IonLabel, IonGrid, IonRow, IonCol, IonPage, IonCardContent, useIonRouter, IonMenuButton } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { cartOutline as cart, readerOutline as list, locationOutline as location, logOutOutline as door } from 'ionicons/icons';


const userId = ref('');
const namaUser = ref('');
const emailUser = ref('');
const alamat = ref('');
const router = useIonRouter();

onMounted(() => {
  const user_id = localStorage.getItem('user_id');
  const nama_user = localStorage.getItem('nama');
  const email_user = localStorage.getItem('email');

  if (user_id) {
    userId.value = user_id;
  }
  if (nama_user) {
    namaUser.value = nama_user;
  }
  if (nama_user) {
    emailUser.value = email_user;
  }

  fetchUserAddress();
});

const fetchUserAddress = async () => {
  try {
    const apiUrl = 'http://127.0.0.1:8000/api/location';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId.value }),
    });
    
    const data = await response.json();
    if (response.ok && data && data.alamat) {
      alamat.value = data.alamat;
      localStorage.setItem('alamat', data.alamat);
    } else {
      console.error('Error fetching user address', data);
    }
  } catch (error) {
    console.error('Error fetching users address', error);
  }
};
 
const goToMenu = (kategori) => {
  localStorage.setItem('kategori', kategori);
  router.replace('/tabs/tab2');
};

const goToPage = (page) => {
  router.push(page);
};

const logout = () => {
  localStorage.clear();
  router.replace('/login');
};
</script>

<style scoped>
.logo {
  height: 55px;
  margin: 9px;
  margin-left: 1px;
}
 
.profile {
  height: 150%;

}

.notification {
  height: 23px;
}

.keranjang {
  height: 23px;
  margin-right: 5px;
  
}

.profile-header {
  display: flex;
  align-items: center;
  padding: 16px;
}


.profile-info {
  margin-left: 15px;
  margin-right: 50px;
}

.profile-name {
  margin: 0;
  margin-left: 2px;
  font-size: 18px;
  font-weight: bold;
  color: #5a5a5a;
}

.profile-email {
  margin: 2px;
  font-size: 14px;
  color: #5a5a5a;
}

.edit-profile {
  --background: #A82A00;
  --border-radius: 10px;
  text-transform: none;
}

.cart-icon {
  --background: transparent;
  --background-activated: transparent;
  --background-focused: transparent;
  --background-hover: transparent;
  --color: inherit;
  --box-shadow: none;
  --border-radius: 20px;
  --ripple-color: transparent;
}

.banner {
  width: calc(100% - 30px); 
  height: auto;
  margin: 30px 20px 0 20px; 
}

.row-best {
  margin-top: 20px;
}

.card-container {
  position: relative;
}

.menu-card {
  height: 100%;  
}

.menu {
  margin-bottom: 12px;
}


.card-button {
  --background: #CFA5A180;
  --background-activated: transparent;
  --background-focused: transparent;
  --background-hover: transparent;
  --color: inherit;
  --box-shadow: none;
  --border-radius: 20px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  .month-best-content {
    display: flex;
    width: 100%;
  }
}

p {
  text-transform: none;
}

.see-menu-button{
  --background: transparent;
  --background-activated: transparent;
  --background-focused: transparent;
  --background-hover: transparent;
  --color: inherit;
  --box-shadow: none;
  --border-radius: 20px;
  --ripple-color: transparent;
  margin-bottom: -35px;
  flex-direction: column;
  align-items: flex-end;
}

.see-menu {
  color: #A82A00;
  font-weight:600;
  text-transform: none;
}


.best-text {
  text-align: left;
  padding: 1px;
  margin-top: 1px;
  margin-left: 4px;
}

.item-name-overflow {
  font-size: 86%;
}

.card-image {
  width: 100%;
  aspect-ratio: 1.25 / 1;
  object-fit: cover;
  border-radius: 20px;
  overflow: hidden;
}

.month-image {
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 20px;
  overflow: hidden;
  width: 30%;
  height: 95%;
  align-self: center;
}

.month-best {
  margin-top: 20px;
}

.month-best-content {
  width: 25%;
  height: 100%;
  align-self: center;
}

.item-name {
  font-weight: bold;
  text-transform: none;
}

.item-category {
  color: gray;
  margin: 0;
  text-transform: none;
}

.item-price {
  font-weight: bold;
}

.menu-image {
  width: 60px; 
  height: 60px; 
  
}

.top-menu-title {
  margin-top: 20px;
  
  font-weight: bold;
  
}

.cards-button {
  margin-top: 20px;
}

.column-content{
  width: 100%;
}

.best-seller {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #A82A00; 
  text-transform: none;
  color: white;
  padding: 5px 10px;
  margin-top: -7px;
  margin-right: 2px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 10px;
  text-align: center;
  z-index: 10;
}

.month-bag-icon {
  position: absolute;
  width: 13%;
  max-width: 80px;
  bottom: 0;
  right: 0;
  padding: 20px 10px;
  margin-bottom: -12px;
  font-size: 10px;
  text-align: center;
  z-index: 10;
  
}


.menu-card-button {
  --background: linear-gradient(to bottom, #BD787280 50%, #BD787280 50%, #ffffff80 100%);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}



.menu-card .menu-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  text-align: center;
  
}

.ion-menu-button {
  margin-left: 12px;
  
}

.ion-menu-button {
  width: 68%;
  height: 100%;
}

.profile{
  width: 100%;
  height: 60px;
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
  margin-top: 3px;
  margin-bottom: 2px;
}

</style>
