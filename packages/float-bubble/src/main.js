import { createApp, version } from 'vue-demi'

import App from './App.vue'
import libs from './libs/index'

console.log(`vue@${version}`)

const app = createApp(App)

app.use(libs)

app.mount('#app')
