import { collectionName, categoryName, searchName } from '../constants'
import { generateModalContent, selectFirstOptionElement } from './element'
import { attachEventListener, attachEventListeners, detachAllEventListeners } from './event-listener'
import { onCollectionChanged, onCategoryChanged, onSearchChanged } from './listener'
import { getIconCollectionName } from './storage'

import type { Editor } from 'grapesjs'
import type { ModalOptions, IconCollection } from '../types'

function attachListeners (iconCollections: IconCollection[]) {
  const collectionElement = document.querySelector<HTMLSelectElement>(`.${collectionName}`)
  const categoryElements = document.querySelectorAll<HTMLSelectElement>(`.${categoryName}`)
  const searchElement = document.querySelector<HTMLInputElement>(`.${searchName}`)

  if (!collectionElement || !categoryElements || !searchElement) {
    return
  }

  const collectionListener = onCollectionChanged()
  const categoryListener = onCategoryChanged(iconCollections)
  const searchListener = onSearchChanged()

  attachEventListener<HTMLSelectElement>('change', collectionElement, collectionListener)
  attachEventListeners<HTMLSelectElement>('change', categoryElements, categoryListener)
  attachEventListener<HTMLInputElement>('input', searchElement, searchListener)

  const iconCollectionName = getIconCollectionName() || ''

  selectFirstOptionElement(collectionElement, iconCollectionName)
}

export function openModal (editor: Editor, modalOptions: ModalOptions, iconCollections: IconCollection[]) {
  const { Modal } = editor
  const { title, searchText } = modalOptions

  const content = generateModalContent(
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

  attachListeners(iconCollections)
}
