import { createApp } from 'vue-demi'
import App from './App.vue'
import libs from './libs/index'

import './styles/index'

const app = createApp(App)

app.use(libs)

app.mount('#app')
