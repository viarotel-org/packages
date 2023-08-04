# vue-extends

用于增强 vue 业务开发体验的扩展实现

Used to enhance the expansion of the Vue business development experience

[Demo 演示地址](https://vue-extends.netlify.app/)

## Install

```shell
npm install @viarotel-org/vue-extends
```

## Example

```js
// vue3
import VueExtends from '@viarotel-org/vue-extends'

// vue2.7 以上
import VueExtends from '@viarotel-org/vue-extends/vue2s'

// vue2.6 以下
import VueExtends from '@viarotel-org/vue-extends/vue2'

// vue3
app.use(VueExtends)

// vue2/2.7
Vue.use(VueExtends)
```

```js
// 子组件
<Child ref="child" />

export default {
  methods: {
    handleRedata() {
      // 将重置 <Child/> $data 中所有的数据
      this.$refs.child.$redata()
      // 仅重置部分字段
      // 1. 单字符串方式
      this.$refs.child.$redata('name')
      // 2. 字符串方式传多个
      this.$refs.child.$redata('name,text')
      // 3. 数组方式
      this.$refs.child.$redata(['name', 'text'])
      // 改变上下文
      // 方法1
      this.$refs.child.$redata(['name', 'text'], { context: this })
      // 方法2
      this.$refs.child.$redata.call(this, ['name', 'text'])
    },
    handleRehook() {
      // 将重新触发 <Child/> 中 'beforeCreate', 'created', 'beforeMount', 'mounted' 的钩子函数
      this.$refs.child.$rehook()
      // 仅触发指定钩子函数
      // 1. 单字符串方式
      this.$refs.child.$rehook('created')
      // 2. 字符串方式传多个
      this.$refs.child.$rehook('created,mounted')
      // 3. 数组方式
      this.$refs.child.$rehook(['created', 'mounted'])
      // 改变上下文
      // 方法1
      this.$refs.child.$rehook(['created', 'mounted'], { context: this })
      // 方法2
      this.$refs.child.$rehook.call(this, ['created', 'mounted'])
    },
    handleReload() {
      // 相当于同时执行 $redata() && $rehook()
      // nextTick forceUpdate 添加后将在内部合适的时机添加 $nextTick 和 $forceUpdate
      // nextTick 默认值为 true
      // forceUpdate 默认值为 false
      this.$refs.child.$reload({
        context: this,
        nextTick: true,
        forceUpdate: true,
      })
    },
  },
}
```
