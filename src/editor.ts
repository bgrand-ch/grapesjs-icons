import 'grapesjs/dist/css/grapes.min.css'

import grapesjs, { usePlugin } from 'grapesjs'
import plugin from './plugin'

import type { PluginOptions } from './types'

const options: PluginOptions = {
  collections: [
    'mdi',
    'ri',
    'uim',
    'streamline-emojis'
  ]
}

grapesjs.init({
  container: '#editor',
  height: '100vh',
  storageManager: false,
  plugins: [
    usePlugin(plugin, options)
  ]
})
