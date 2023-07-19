import 'virtual:uno.css'
import { install } from 'vue-demi'
import { FloatBubble } from './float-bubble/index'

export default {
  install(app) {
    install(app)
    app.component('FloatBubble', FloatBubble)
  },
}

export { FloatBubble }
