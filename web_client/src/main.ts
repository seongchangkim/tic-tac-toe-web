import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './globals.css';
import VueCookies from 'vue-cookies';

createApp(App)
    .use(VueCookies, { expires: '1h' })
    .use(store)
    .use(router)
    .mount('#app');

(window as any).Kakao.init('0e7f8f889b5f77b3f8083efc8497557e');
