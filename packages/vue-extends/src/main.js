import { createApp, version } from 'vue-demi'

import App from './App.vue'
import libs from './libs/index'

import 'virtual:uno.css'
import '@viarotel-org/design/styles/desktop'

console.log(`vue@${version}`)

const app = createApp(App)

app.use(libs)

app.mount('#app')
