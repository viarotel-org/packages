import { isVue2 } from 'vue-demi'
import * as methods from './methods/index'

export default {
  install(app) {
    Object.entries(methods).forEach(([key, value]) => {
      const globalProperties = isVue2
        ? app.prototype
        : app.config.globalProperties
      globalProperties[`$${key}`] = value
    })

    // Object.values(mixins).forEach((value) => {
    //   app.mixin(value)
    // })
  },
}
