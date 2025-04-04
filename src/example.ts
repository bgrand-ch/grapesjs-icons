// This file is only used by Vite during development.
// It is ignored when the files are built.
// It is an example, a demonstration.

import 'grapesjs/dist/css/grapes.min.css'

import grapesjs, { usePlugin } from 'grapesjs'
import grapesjsIcons from './plugin'

import type { PluginOptions } from './types'

function runExample () {
  const protectedCss: string = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body, [data-gjs-type="wrapper"] {
      width: 100%;
      height: 100%;
    }
  `
  const pluginOptions: PluginOptions = {
    collectionPrefixes: [
      'mdi',
      'ri',
      'uim',
      'streamline-emojis'
    ]
  }
  const editor = grapesjs.init({
    container: '#editor', // same as id in the "index.html" file
    height: '100vh',
    fromElement: true,
    storageManager: false,
    protectedCss,
    plugins: [
      usePlugin(grapesjsIcons, pluginOptions)
    ]
  })

  editor.once('load', () => {
    console.log('Editor loaded', editor)
  })
}

runExample()
