<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="kurirwaiting" href="/pesanankurir/kurirwaiting">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
        </ion-tab-button>
 
        <ion-tab-button tab="kurirdelivery" href="/pesanankurir/kurirdelivery">
          <ion-icon aria-hidden="true" :icon="briefcaseOutline" />
        </ion-tab-button>

        <ion-tab-button tab="kurircanceled" href="/pesanankurir/kurircanceled">
          <ion-icon aria-hidden="true" :icon="canceled" />
        </ion-tab-button>

        <ion-tab-button tab="kurirdone" href="/pesanankurir/kurirdone">
          <ion-icon aria-hidden="true" :icon="done" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
 
<script setup >
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle, homeOutline, briefcaseOutline, readerOutline, closeCircleOutline as canceled, checkmarkCircleOutline as done} from 'ionicons/icons';
</script>

<style>
ion-tab-bar {
  --ion-color-primary: #A82A00;
}

ion-tab-button {
  --ripple-color: transparent;
}
</style>