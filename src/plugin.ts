import { getModalOptions, getComponentOptions, getBlockOptions } from './utils/option'
import { getIconCollections } from './utils/icon'
import { openModal } from './utils/modal'

import type { Plugin, Component } from 'grapesjs'
import type { IconCollection, PluginOptions } from './types'

const commandName = 'open-icon-modal'

const plugin: Plugin<PluginOptions> = (editor, options) => {
  const { DomComponents, Commands, Modal, BlockManager } = editor
  const { collections, modal = {}, component = {}, block = {} } = options
  const { title } = getModalOptions(modal)
  const { type, name } = getComponentOptions(component)
  const { category } = getBlockOptions(block)

  let iconCollections: IconCollection[] = []

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
    iconCollections = await getIconCollections(collections)
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
