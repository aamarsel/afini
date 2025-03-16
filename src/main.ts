import { createApp } from 'vue'
import { createPinia } from 'pinia'; 
import './style.css'
import App from './App.vue'
import './assets/main.css'
import { openDB } from "@/db";
import naive from 'naive-ui'
import router from './router';

openDB().then().catch(console.error);

const pinia = createPinia();
const app = createApp(App);

app.use(naive);
app.use(pinia);
app.use(router);
app.mount('#app');
