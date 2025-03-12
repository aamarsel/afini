import { createApp } from 'vue'
import { createPinia } from 'pinia'; 
import './style.css'
import App from './App.vue'
import './assets/main.css'
import { openDB } from "@/db";

openDB().then().catch(console.error);

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.mount('#app');
