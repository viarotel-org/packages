import type { Plugin } from 'vite'

export default function VitePluginPath(): Plugin {
  return {
    name: 'vite-plugin-path',
    transform(src, id) {
      if (id.endsWith('?path')) {
        const value = id.slice(0, -5)
        return `export default ${JSON.stringify(value)}`
      }
    },
  }
}
