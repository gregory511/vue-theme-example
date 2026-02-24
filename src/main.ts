import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from './router'
import axios from 'axios'
import { useUserStore } from './stores/userStore'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Todo
        }

        return Promise.reject(error);
    }
)

const store = useUserStore(pinia);

(async () => {
    await store.tryReconnect()
    app.mount('#app')
})();