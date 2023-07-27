import { collectionName, categoryName } from '../constants'
import { generateActionsElement, generateContentElement, getFragmentHtml } from './element'
import { getSelectedIconCollection } from './icon'
import { attachEventListener, attachEventListeners, detachAllEventListeners } from './event-listener'

import type { Editor } from 'grapesjs'
import type { ModalOptions, IconCollection } from '../types'

export function generateModalContent (
  selectedIconCollection: IconCollection,
  iconCollections: IconCollection[],
  searchPlaceholder: string
): string {
  const fragmentElement = new DocumentFragment()
  const actionsElement = generateActionsElement(iconCollections, searchPlaceholder)
  const contentElement = generateContentElement(selectedIconCollection)

  fragmentElement.appendChild(actionsElement)
  fragmentElement.appendChild(contentElement)

  return getFragmentHtml(fragmentElement)
}

export function openModal (editor: Editor, modalOptions: ModalOptions, iconCollections: IconCollection[]) {
  const { Modal } = editor
  const { title, searchText } = modalOptions
  const selectedIconCollection = getSelectedIconCollection(iconCollections)

  if (!selectedIconCollection) {
    return
  }

  const content = generateModalContent(
    selectedIconCollection,
    iconCollections,
    searchText
  )
  const modalModule = Modal.open({
    title,
    content
  })

  modalModule.onceClose(() => {
    detachAllEventListeners()
  })

  const collectionElement = document.querySelector<HTMLSelectElement>(`.${collectionName}`)
  const categoryElements = document.querySelectorAll<HTMLSelectElement>(`.${categoryName}`)

  if (!collectionElement || !categoryElements) {
    return
  }

  attachEventListener<HTMLSelectElement>('change', collectionElement, () => {
    console.log('collection changed')
  })
  attachEventListeners<HTMLSelectElement>('change', categoryElements, () => {
    console.log('category changed')
  })
}
