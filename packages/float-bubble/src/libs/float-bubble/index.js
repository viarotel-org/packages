import FloatBubble from './components/index.vue'
import FloatBubbleTheme from './components/Theme/index.vue'
import './styles/index.js'

FloatBubble.install = (app) => {
  app.component('FloatBubble', FloatBubble)
  app.component('FloatBubbleTheme', FloatBubbleTheme)
}

FloatBubbleTheme.install = (app) => {
  app.component('FloatBubbleTheme', FloatBubbleTheme)
}

export default FloatBubble

export { FloatBubble, FloatBubbleTheme }
