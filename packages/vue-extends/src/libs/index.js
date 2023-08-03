import { install } from 'vue-demi'
import VueExtends from './vue-extends/index'

install()

export default {
  install(app) {
    app.use(VueExtends)
  },
}
