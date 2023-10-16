# vite-plugin-path

🔍 一个用于 Vitejs 的插件，可以返回任意文件的绝对路径。

🔍 A plugin for Vitejs can return the absolute path of any file.

## 安装

```shell
npm install @viarotel-org/vite-plugin-path
```

## 示例

首先使用该插件

```js
// vite.config.js
import { defineConfig } from 'vite'
import useVitePluginPath from '@viarotel-org/vite-plugin-path'

export default defineConfig({
  // ...
  plugins: [useVitePluginPath()],
  // ...
})
```

然后导入需要获取绝对路径的文件

```js
// Demo.js
import examplePath from '../../example.exe?path'

console.log(examplePath)

// 将输出 "C:/User/packages/vite-plugin-path/example.exe"
```
