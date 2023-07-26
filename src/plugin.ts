import { getIconCollections } from './utils/icon'
import { openModal } from './utils/modal'

import type { Plugin, Component } from 'grapesjs'
import type { CollectionData, Options } from './types'

const commandName = 'open-icon-modal'

const plugin: Plugin<Options> = (editor, options) => {
  const { DomComponents, Commands, Modal, BlockManager } = editor

  const type = options.componentType || 'icon'
  const name = options.componentName || 'Icon' // TODO: i18n
  const title = options.modalTitle || 'Icons' // TODO: i18n
  const category = options.blockCategory || 'Basic' // TODO: i18n
  const collectionNames = options.collectionNames

  let iconCollections: CollectionData[] = []

  DomComponents.addType(type, {
    isComponent (element) {
      return element.dataset?.type === type
    },
    model: {
      defaults: {
        name,
        tagName: 'span',
        attributes: {
          'data-type': type
        },
        classes: [
          'iconify-inline'
        ],
        style: {
          display: 'inline-block',
          width: '48px',
          height: '48px'
        }
      }
    },
    view: {
      events: {
        // @ts-ignore
        dblclick: 'openIconModal'
      },
      openIconModal (event: Event) {
        event.preventDefault()

        const element = event.target as HTMLElement
        const elementType = element?.getAttribute('data-type') || ''
        const parentByType = element?.closest(`[data-type="${type}"]`)

        if (
          (elementType !== type && !parentByType) ||
          Modal.isOpen()
        ) {
          return
        }

        Commands.run(commandName)
      }
    }
  })

  Commands.add(commandName, () => {
    openModal(title, iconCollections, editor)
  })

  BlockManager.add(type, {
    category,
    label: name,
    content: {
      type
    }
  })

  editor.on('load', async () => {
    iconCollections = await getIconCollections(collectionNames)
  })

  editor.on('block:drag:stop', (component: Component) => {
    const {
      'data-type': componentType
    } = component.getAttributes()

    if (
      componentType !== type ||
      Modal.isOpen()
    ) {
      return
    }

    editor.select(component)
    Commands.run(commandName)
  })
}

export default plugin
