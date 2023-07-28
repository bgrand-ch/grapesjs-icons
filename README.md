# GrapesJS icons plugin with Iconify

> `grapesjs-icons` plugin is not an official Iconify plugin and is not maintained by the Iconify team. This plugin uses the Iconify API. This API is the biggest expense of the Iconify team. If you use `grapesjs-icons` plugin, please [donate to Iconify](https://iconify.design/sponsors/) to guarantee free use of the API.

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
import grapesjsIcons from 'grapesjs-icons'

const editor = grapesjs.init({
  // ...
  plugins: [
    grapesjsIcons
  ],
  pluginOpts: {
    [grapesjsIcons]: {
      // see https://icon-sets.iconify.design/
      collections: ['ri', 'uim', 'streamline-emojis']
    }
  }
  // ...
})
```

### TypeScript

```ts
import grapesjs, { usePlugin } from 'grapesjs'
import grapesjsIcons from 'grapesjs-icons'

const editor = grapesjs.init({
  // ...
  plugins: [
    usePlugin(grapesjsIcons, {
      // see https://icon-sets.iconify.design/
      collections: ['ri', 'uim', 'streamline-emojis']
    })
  ]
  // ...
})
```

## Command

> `click` insertion mode is not yet implemented. The idea is to open the icons modal from anywhere using the `open-icons-modal` command, choose an icon and drop it by clicking somewhere in the GrapesJS canvas. Do you want contribute?

### JavaScript

```js
const commandOptions = {
  insertionMode: 'click' // default to "drop"
}

editor.runCommand('open-icons-modal', commandOptions)
```

### TypeScript

```ts
import type { CommandOptions } from 'grapesjs-icons'

const commandOptions: CommandOptions = {
  insertionMode: 'click' // default to "drop"
}

editor.runCommand('open-icons-modal', commandOptions)
```

## Options

```ts
{
  // required
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
