import { createApp } from 'vue'
import App from './App.vue'
import plugins from './plugins/index'
import libs from './libs/index'

import 'virtual:uno.css'
import './styles/index'

const app = createApp(App)

app.use(plugins)
app.use(libs)

app.mount('#app')
