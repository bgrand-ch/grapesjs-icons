import {
  containerName, collectionName, categoryName,
  iconTargetName, contentName, modalContainerName
} from '../constants'

import type { CollectionData } from '../types'

type FlexWrap = 'wrap'|'no-wrap'

export function generateContainerElement (flexWrap: FlexWrap = 'wrap'): HTMLDivElement {
  const containerElement = document.createElement('div')

  containerElement.style.display = 'flex'
  containerElement.style.gap = '10px'
  containerElement.style.flexWrap = flexWrap
  containerElement.classList.add(containerName)

  if (flexWrap === 'no-wrap') {
    containerElement.style.overflowX = 'auto'
    containerElement.style.whiteSpace = 'nowrap'
  }

  return containerElement
}

export function generateCollectionElements (iconCollections: CollectionData[]): HTMLDivElement {
  const containerElement = generateContainerElement('no-wrap')

  for (const { title, prefix } of iconCollections) {
    const collectionElement = document.createElement('span')

    collectionElement.style.display = 'inline-block'
    collectionElement.style.cursor = 'pointer'
    collectionElement.style.padding = '6px 8px'
    collectionElement.style.borderRadius = '6px'
    collectionElement.style.border = '1px solid rgba(0, 0, 0, .7)'
    collectionElement.classList.add(collectionName)

    collectionElement.dataset.collectionPrefix = prefix
    collectionElement.dataset.collectionName = title
    collectionElement.innerText = title

    containerElement.appendChild(collectionElement)
  }

  return containerElement
}

export function generateCategoryElement (category: string): HTMLDivElement {
  const categoryElement = document.createElement('div')

  categoryElement.style.fontWeight = 'bold'
  categoryElement.style.padding = '20px 0 10px'
  categoryElement.classList.add(categoryName)

  categoryElement.innerText = category

  return categoryElement
}

export function generateIconTargetElement (iconPrefix: string, iconName: string): HTMLDivElement {
  const iconTargetElement = document.createElement('div')

  iconTargetElement.style.width = '48px'
  iconTargetElement.style.height = '48px'
  iconTargetElement.style.borderRadius = '6px'
  iconTargetElement.style.backgroundColor = 'white'
  iconTargetElement.style.color = 'black'
  iconTargetElement.style.cursor = 'pointer'
  iconTargetElement.classList.add(iconTargetName)

  iconTargetElement.dataset.iconPrefix = iconPrefix
  iconTargetElement.dataset.iconName = iconName

  return iconTargetElement
}

export function generateContentElement (iconCollection: CollectionData): HTMLDivElement {
  const { categories, prefix } = iconCollection
  const contentElement = document.createElement('div')

  contentElement.classList.add(contentName)

  for (const category in categories) {
    const iconNames = categories[category]
    const categoryEl = generateCategoryElement(category)

    contentElement.appendChild(categoryEl)

    const containerEl = generateContainerElement()

    for (const iconName of iconNames) {
      const iconTargetElement = generateIconTargetElement(prefix, iconName)
      containerEl.appendChild(iconTargetElement)
    }

    contentElement.appendChild(containerEl)
  }

  return contentElement
}

export function getFragmentHtml (fragmentElement: DocumentFragment): string {
  const divEl = document.createElement('div')

  divEl.appendChild(fragmentElement)
  divEl.setAttribute('id', modalContainerName)

  return divEl.outerHTML
}

export function resetCollectionElements (collectionElements: NodeListOf<HTMLSpanElement>) {
  for (const collectionElement of collectionElements) {
    collectionElement.style.backgroundColor = 'transparent'
  }
}
