import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from './router'
import axios from 'axios'
import { useUserStore } from './stores/userStore'

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        alert("Unauthorized")
    }
    return error;
});


const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

const store = useUserStore();
store.tryReconnect();
