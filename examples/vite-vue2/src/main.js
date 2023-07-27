import Vue from 'vue'
import App from './App.vue'
import plugins from './plugins/index.js'

import 'virtual:uno.css'
import '@viarotel-org/design/styles/desktop'

console.log(`vue@${Vue.version}`)

Vue.use(plugins)

new Vue({
  render: h => h(App),
}).$mount('#app')
