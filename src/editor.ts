import 'grapesjs/dist/css/grapes.min.css'

import grapesjs, { usePlugin } from 'grapesjs'
import plugin from './plugin'

import type { Options } from './types'

const options: Options = {
  collectionNames: [
    'mdi',
    'ri',
    'emojione'
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
