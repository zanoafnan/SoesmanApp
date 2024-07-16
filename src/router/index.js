import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue';
import Tab3Page from '../views/Tab3Page.vue';
import LoginPage from '../views/LoginPage.vue';
import OrderPage from '../views/OrderPage.vue';
import OrderWaitingPage from '../views/OrderWaitingPage.vue';
import OrderCanceledPage from '../views/OrderCanceledPage.vue';
import OrderDonePage from '../views/OrderDonePage.vue';
import MenuPage from '../views/MenuPage.vue';
import CartPage from '../views/CartPage.vue';
import LocationPage from '../views/LocationPage.vue';
import LocationKurirPage from '../views/LocationKurirPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import PaymentPage from '../views/PaymentPage.vue';
import PesananKurirPage from '../views/PesananKurirPage.vue';
import KurirWaitingPage from '../views/KurirWaitingPage.vue';
import KurirDeliveryPage from '../views/KurirDeliveryPage.vue';
import KurirCanceledPage from '../views/KurirCanceledPage.vue';
import KurirDonePage from '../views/KurirDonePage.vue';
import KurirRegisterPage from '../views/KurirRegisterPage.vue';
import KurirLoginPage from '../views/KurirLoginPage.vue';




const routes = [
  {
    path: '/',
    redirect: '/tabs/tab1',
  },
  {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  },
  {
    path: '/order',
    name: 'OrderPage',
    component: OrderPage
  },
  {
    path: '/tabs/tab3',
    name: 'Tab3Page',
    component: Tab3Page
  },
  {
    path: '/menu',
    name: 'MenuPage',
    component: MenuPage
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage
  },
  {
    path: '/location',
    name: 'LocationPage',
    component: LocationPage
  },
  {
    path: '/locationkurir:alamat',
    name: 'LocationKurirPage',
    component: LocationKurirPage
  },
  {
    path: '/payment',
    name: 'PaymentPage',
    component: PaymentPage
  },
  {
    path: '/pesanankurir/',
    component: PesananKurirPage,
    children: [
      {
        path: '',
        redirect: '/pesanankurir/kurirwaiting',
        component: () => import('@/views/KurirWaitingPage.vue')
      },
      {
        path: 'kurirwaiting',
        component: () => import('@/views/KurirWaitingPage.vue')
      },
      {
        path: 'kurircanceled',
        component: () => import('@/views/KurirCanceledPage.vue')
      },
      {
        path: 'kurirdelivery',
        component: () => import('@/views/KurirDeliveryPage.vue')
      },
      {
        path: 'kurirdone',
        component: () => import('@/views/KurirDonePage.vue')
      }
    ]
  },
  { 
    path: '/kurirregister',
    component: KurirRegisterPage
  },
  {
    path: '/kurirlogin',
    component: KurirLoginPage
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
