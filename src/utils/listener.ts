import { loadIcons } from 'iconify-icon'
import { categoryName as categoryClassName, containerName, contentName, iconTargetName } from '../constants'
import { setIconCollectionName, setIconCategoryName, getIconCategoryName, getIconCollectionName } from './storage'
import { selectFirstOptionElement, generateContentElement } from './element'
import { detachAllEventListeners } from './event-listener'

import type { IconCollection } from '../types'

const pluginName = import.meta.env.VITE_PLUGIN_NAME
const logScope = `[${pluginName}::utils/listener]`

export function onCollectionChanged (): EventListener {
  let categoryElements: NodeListOf<HTMLSelectElement>|null = null

  return event => {
    const collectionElement = event.target as HTMLSelectElement|null

    if (!collectionElement) {
      return
    }

    const collectionName = collectionElement.value

    setIconCollectionName(collectionName)

    if (!categoryElements) {
      categoryElements = document.querySelectorAll<HTMLSelectElement>(`.${categoryClassName}`)
    }

    for (const categoryElement of categoryElements) {
      const dataCollectionName = categoryElement.dataset.collectionName!
      const currentDisplay = categoryElement.style.display

      if (
        dataCollectionName === collectionName &&
        currentDisplay !== 'none'
      ) {
        continue
      }

      if (dataCollectionName !== collectionName) {
        categoryElement.style.display = 'none'
        continue
      }

      const categoryName = getIconCategoryName() || ''

      selectFirstOptionElement(categoryElement, categoryName)
    }
  }
}

export function onCategoryChanged (iconCollections: IconCollection[]): EventListener {
  return event => {
    const categoryElement = event.target as HTMLSelectElement|null

    if (!categoryElement) {
      return
    }

    const collectionName = getIconCollectionName()!
    const categoryName = categoryElement.value

    setIconCategoryName(categoryName)

    const iconCollection = iconCollections.find(({ prefix }) => {
      return prefix === collectionName
    })

    if (!iconCollection) {
      return
    }

    const iconNames = iconCollection.categories[categoryName]
    const iconFullNames: string[] = []

    for (const iconName of iconNames) {
      const iconFullName = `${collectionName}:${iconName}`
      iconFullNames.push(iconFullName)
    }

    loadIcons(iconFullNames)

    const containerElement = document.querySelector<HTMLDivElement>(`.${containerName}`)

    if (!containerElement) {
      return
    }

    const currentContentElement = containerElement.querySelector<HTMLDivElement>(`.${contentName}`)
    const contentElement = generateContentElement(iconCollection, categoryName)

    if (!currentContentElement) {
      containerElement.appendChild(contentElement)
      return
    }

    detachAllEventListeners(`.${iconTargetName}`)
    currentContentElement.replaceWith(contentElement)
  }
}

// TODO: Search icons with Iconify API
// see https://iconify.design/docs/api/search.html
export function onSearchChanged (): EventListener {
  return event => {
    const searchElement = event.target as HTMLInputElement|null

    if (!searchElement) {
      return
    }

    const searchValue = searchElement.value

    console.warn(
      logScope,
      'Search is not implemented yet in "grapesjs-icons". Do you want contribute?',
      `Value changed: ${searchValue}`
    )
  }
}
