import { collectionName } from '../constants'
import { generateCollectionElements, generateContentElement, getFragmentHtml } from './element'
import { getSelectedIconCollection } from './icon'
import { onActiveCollectionChange } from './active'

import type { Editor } from 'grapesjs'
import type { IconCollection } from '../types'

export function generateModalContent (
  selectedIconCollection: IconCollection,
  iconCollections?: IconCollection[]
): DocumentFragment {
  const fragmentElement = new DocumentFragment()

  if (iconCollections) {
    const collectionElement = generateCollectionElements(iconCollections)
    fragmentElement.appendChild(collectionElement)
  }

  const contentElement = generateContentElement(selectedIconCollection)
  fragmentElement.appendChild(contentElement)

  return fragmentElement
}

export function openModal (title: string, iconCollections: IconCollection[], editor: Editor) {
  const { Modal } = editor
  const selectedIconCollection = getSelectedIconCollection(iconCollections)

  if (!selectedIconCollection) {
    return
  }

  const modalContentElement = generateModalContent(selectedIconCollection, iconCollections)
  const content = getFragmentHtml(modalContentElement)

  const modalModule = Modal.open({
    title,
    content
  })

  const collectionElements = document.querySelectorAll<HTMLSpanElement>(`.${collectionName}`)
  const handler = onActiveCollectionChange(iconCollections, collectionElements, modalModule, editor)

  for (const collectionElement of collectionElements) {
    const collectionPrefix = collectionElement.dataset.collectionPrefix

    collectionElement.addEventListener('click', handler)

    if (collectionPrefix === selectedIconCollection.prefix) {
      collectionElement.click()
    }
  }
}
