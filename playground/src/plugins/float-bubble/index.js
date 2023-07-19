import FloatBubble from '@viarotel-org/float-bubble'
import '@viarotel-org/float-bubble/style'

console.log('FloatBubble', FloatBubble)
export default {
  install(app) {
    app.use(FloatBubble)
  },
}
