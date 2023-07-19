import { createApp } from 'vue-demi'
import App from './App.vue'
import plugins from './plugins/index'

import 'virtual:uno.css'
import './styles/index'

const app = createApp(App)

app.use(plugins)

app.mount('#app')
