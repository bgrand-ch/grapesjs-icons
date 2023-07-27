# GrapesJS icons plugin with Iconify

> The `grapesjs-icons` plugin is not an official Iconify plugin and is not maintained by the Iconify team.

> This plugin uses the Iconify API. The Iconify API is the biggest expense of the Iconify team. If you use the `grapesjs-icons` plugin, please [donate to Iconify](https://iconify.design/sponsors/) to guarantee free use of the API.

## Installation

```shell
npm install grapesjs-icons
```

```shell
pnpm add grapesjs-icons
```

```shell
yarn add grapesjs-icons
```

## Usage

### JavaScript

```js
import grapesjs from 'grapesjs'
import grapesjsIcons from 'grapes-icons'

grapesjs.init({
  // ...
  plugins: [
    grapesjsIcons
  ],
  pluginOpts: {
    [grapesjsIcons]: {
      // see https://icon-sets.iconify.design/
      collectionNames: [
        'ri',
        'uim',
        'streamline-emojis'
      ],
      componentType: 'icon', // optional
      componentName: 'Icon', // optional
      modalTitle: 'Icons', // optional
      blockCategory: 'Basic' // optional
    }
  }
  // ...
})
```

### TypeScript

```js
import grapesjs, { usePlugin } from 'grapesjs'
import grapesjsIcons from 'grapes-icons'

grapesjs.init({
  // ...
  plugins: [
    usePlugin(grapesjsIcons, {
      // see https://icon-sets.iconify.design/
      collectionNames: [
        'ri',
        'uim',
        'streamline-emojis'
      ],
      componentType: 'icon', // optional
      componentName: 'Icon', // optional
      modalTitle: 'Icons', // optional
      blockCategory: 'Basic' // optional
    })
  ]
  // ...
})
```
