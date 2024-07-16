<template>

    <ion-grid>
      <ion-row v-for="(row, rowIndex) in 5" :key="rowIndex">
        <ion-col size="4" v-for="(col, colIndex) in 3" :key="colIndex">
          <ion-card class="custom-card">
            <ion-card-header>
              <ion-card-title>
                <ion-img class="card-image" :src="getImageUrl(rowIndex, colIndex)"></ion-img>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content class="ion-text-center">
              <p>Item {{ rowIndex + 1 }}-{{ colIndex + 1 }}</p>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
    
  </template>
  
  
  <script setup>
  import { ref } from 'vue';
  
  //Items
  const images = ref([
    '../assets/soesman_kopi.png',
    '../assets/coffee/aren.png',
    '../assets/coffee/moca.png',
    '../assets/coffee/macchiato.png',
  ]);
  
  //mendapatkan URL gambar berdasarkan indeks
  const getImageUrl = (rowIndex, colIndex) => {
    const index = (rowIndex * 3 + colIndex) % images.value.length;
    return images.value[index];
  };
  </script>
  
  <style scoped>

  .ion-text-center {
    text-align: center;
  }
  
  .custom-card {
    background-color: #CFA5A180;
  }
  
 
  .card-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 10px; 
    overflow: hidden;
}
  </style>
  