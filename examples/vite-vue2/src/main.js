import Vue from 'vue'
import App from './App.vue'
import plugins from './plugins/index'

import 'virtual:uno.css'
import './styles/index'

console.log(`vue@${Vue.version}`)

Vue.use(plugins)

new Vue({
  render: h => h(App),
}).$mount('#app')
