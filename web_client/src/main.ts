import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './globals.css';
import dayjs from 'dayjs';
import { initializeApp } from 'firebase/app';
import VueSocketIoExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');
const app = createApp(App);

app.config.globalProperties.$dayjs = dayjs;

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_AUTHDOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PRODUCT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGEING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

app.use(store).use(router).mount('#app');

(window as any).Kakao.init(process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY);
