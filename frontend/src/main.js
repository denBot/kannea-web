import { createApp } from 'vue'
import App from './App.vue'

require('dotenv').config({
    path: '../.env'
});

createApp(App).mount('#app')
