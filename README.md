# GrapesJS icons plugin with Iconify

> `grapesjs-icons` plugin is not an official Iconify plugin and is not maintained by the Iconify team. This plugin uses the Iconify API. This API is the biggest expense of the Iconify team. If you use `grapesjs-icons` plugin, please [donate to Iconify](https://iconify.design/sponsors/) to guarantee free use of the API.

## Demo

![GrapesJS icons plugin demo](https://github.com/bgrand-ch/grapesjs-icons/blob/main/demo.gif)

## Installation

```shell
npm install grapesjs grapesjs-icons
```

## Usage

### JavaScript

```js
import grapesjs from 'grapesjs'
import grapesjsIcons from 'grapesjs-icons'

const pluginOptions = {
  // see https://icon-sets.iconify.design/
  collections: [
    'ri', // Remix Icon by Remix Design
    'mdi', // Material Design Icons by Pictogrammers
    'uim', // Unicons Monochrome by Iconscout
    'streamline-emojis' // Streamline Emojis by Streamline
  ]
}
const editor = grapesjs.init({
  // ...
  plugins: [
    grapesjsIcons
  ],
  pluginOpts: {
    [grapesjsIcons]: pluginOptions
  }
  // ...
})
```

### TypeScript

```ts
import grapesjs, { usePlugin } from 'grapesjs'
import grapesjsIcons from 'grapesjs-icons'

const pluginOptions = {
  // see https://icon-sets.iconify.design/
  collections: [
    'ri', // Remix Icon by Remix Design,
    'mdi', // Material Design Icons by Pictogrammers
    'uim', // Unicons Monochrome by Iconscout
    'streamline-emojis' // Streamline Emojis by Streamline
  ]
}
const editor = grapesjs.init({
  // ...
  plugins: [
    usePlugin(grapesjsIcons, pluginOptions)
  ]
  // ...
})
```

## How do I find and use an Iconify collection?

1. Search for an icon collection on the [Iconify website](https://icon-sets.iconify.design/).
2. Click on a collection (a.k.a "set" on [Iconify website](https://icon-sets.iconify.design/)) or an icon.
3. Copy the shortcut name of the collection in the URL. Examples:
    - *Remix* collection: `https://icon-sets.iconify.design/ri/` -> Copy `ri`
    - *Remix* icon: `https://icon-sets.iconify.design/ri/add-fill/` -> Copy `ri`
4. Paste the shortcut name of the collection in the `collections` option of the plugin.

## Command

> `click` insertion mode is not yet implemented. The idea is to open the icons modal from anywhere using the `open-icons-modal` command, choose an icon and drop it by clicking somewhere in the GrapesJS canvas. Do you want contribute?

```ts
editor.runCommand('open-icons-modal')
```

## Options

```ts
{
  // required, list of collection shortcut names
  collections: string[],

  // optional
  modal: {
    title: string,
    collectionText: string,
    categoryText: string,
    searchText: string
  },
  component: {
    type: string,
    name: string
  },
  block: {
    category: string
  }
}
```

## Question? Idea?

If you have a question about how `grapesjs-icons` works or an idea to improve it, the [Discussions](https://github.com/bgrand-ch/grapesjs-icons/discussions) tab in GitHub is the place to be.

However, if you get an error, you should open an [issue](https://github.com/bgrand-ch/grapesjs-icons/issues).

## License

Distributed under the BSD 3-Clause License. See [LICENSE](https://github.com/bgrand-ch/grapesjs-icons/blob/main/LICENSE.md) for more information.

## Contact

Benjamin Grand [@bgrand_ch](https://twitter.com/bgrand_ch)
