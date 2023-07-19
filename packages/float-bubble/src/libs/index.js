import 'virtual:uno.css'
import { install } from 'vue-demi'
import FloatBubble from './float-bubble/index'

install()

export default {
  install(app) {
    app.use(FloatBubble)
  },
}

export { FloatBubble }
