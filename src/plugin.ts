import { openModalName, containerName } from './constants'
import { getModalOptions, getComponentOptions, getBlockOptions } from './utils/option'
import { getIconCollections } from './utils/icon'
import { openModal } from './utils/modal'
import { detachAllEventListeners } from './utils/event-listener'
import { setInsertionMode } from './utils/storage'
import { loadSvgIcons } from './utils/svg'

import type { Plugin, Component, Command } from 'grapesjs'
import type { IconCollection, PluginOptions, CommandOptions } from './types'

const commandOptions: Required<CommandOptions> = {
  insertionMode: 'drop'
}
const plugin: Plugin<PluginOptions> = (editor, options) => {
  const { collections, modal = {}, component = {}, block = {} } = options
  const modalOptions = getModalOptions(modal)
  const { type, name } = getComponentOptions(component)
  const { category } = getBlockOptions(block)

  let iconCollections: IconCollection[] = []

  function listenEditorEvents () {
    editor.on('load', async () => {
      iconCollections = await getIconCollections(collections)
      loadSvgIcons(editor)
    })

    editor.on('modal:open', () => {
      const containerElement = document.querySelector<HTMLDivElement>(`.${containerName}`)

      if (!containerElement) {
        return
      }

      detachAllEventListeners()
    })

    editor.on('block:drag:stop', (component: Component) => {
      const {
        'data-type': componentType
      } = component.getAttributes()

      if (
        componentType !== type ||
        editor.Modal.isOpen()
      ) {
        return
      }

      editor.select(component)
      editor.Commands.run(openModalName, commandOptions)
    })
  }

  editor.DomComponents.addType(type, {
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
          editor.Modal.isOpen()
        ) {
          return
        }

        editor.Commands.run(openModalName, commandOptions)
      }
    }
  })

  editor.Commands.add<Command>(openModalName, (_editor, _sender, options: CommandOptions = {}) => {
    setInsertionMode(options.insertionMode)
    openModal(editor, modalOptions, iconCollections)
  })

  editor.BlockManager.add(type, {
    category,
    label: name,
    content: {
      type
    }
  })

  listenEditorEvents()
}

export default plugin
