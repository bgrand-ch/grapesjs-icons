import {
  collectionName, categoryName, searchName, actionsName,
  iconTargetName, contentName, containerName
} from '../constants'
import { getIconCollectionOptions, getIconCategoryOptions } from './icon'

import type { SelectOption, IconCollection } from '../types'

function generateSelectElement (options: SelectOption[]): HTMLSelectElement {
  const selectElement = document.createElement('select')

  for (const { text, value } of options) {
    const optionElement = document.createElement('option')

    optionElement.text = text
    optionElement.value = value

    selectElement.appendChild(optionElement)
  }

  return selectElement
}

export function generateCollectionElement (options: SelectOption[]): HTMLSelectElement {
  const collectionElement = generateSelectElement(options)
  collectionElement.classList.add(collectionName)

  return collectionElement
}

function generateCategoryElement (options: SelectOption[]): HTMLSelectElement {
  const categoryElement = generateSelectElement(options)
  categoryElement.classList.add(categoryName)

  return categoryElement
}

export function generateCategoryElements (iconCollections: IconCollection[]): HTMLSelectElement[] {
  const categoryElements: HTMLSelectElement[] = []

  for (const iconCollection of iconCollections) {
    const categoryOptions = getIconCategoryOptions(iconCollection)
    const categoryElement = generateCategoryElement(categoryOptions)

    categoryElements.push(categoryElement)
  }

  return categoryElements
}

export function generateSearchElement (placeholder: string): HTMLInputElement {
  const searchElement = document.createElement('input')

  searchElement.type = 'search'
  searchElement.placeholder = placeholder
  searchElement.style.padding = '10px 14px'
  searchElement.style.borderRadius = '6px'
  searchElement.classList.add(searchName)

  return searchElement
}

export function generateActionsElement (
  iconCollections: IconCollection[],
  searchPlaceholder: string
): HTMLDivElement {
  const actionsElement = document.createElement('div')
  const collectionOptions = getIconCollectionOptions(iconCollections)
  const collectionElement = generateCollectionElement(collectionOptions)
  const categoryElements = generateCategoryElements(iconCollections)
  const searchElement = generateSearchElement(searchPlaceholder)

  actionsElement.style.display = 'flex'
  actionsElement.style.gap = '10px'
  actionsElement.classList.add(actionsName)

  collectionElement.style.flexGrow = '1'
  searchElement.style.flexGrow = '2'

  actionsElement.appendChild(collectionElement)
  categoryElements.forEach(categoryElement => {
    categoryElement.style.display = 'none'
    categoryElement.style.flexGrow = '1'
    actionsElement.appendChild(categoryElement)
  })
  actionsElement.appendChild(searchElement)

  return actionsElement
}

function generateIconTargetElement (
  iconPrefix: string,
  iconName: string
): HTMLDivElement {
  const iconTargetElement = document.createElement('div')

  iconTargetElement.style.width = '48px'
  iconTargetElement.style.height = '48px'
  iconTargetElement.style.color = 'black'
  iconTargetElement.style.cursor = 'pointer'
  iconTargetElement.style.borderRadius = '6px'
  iconTargetElement.style.backgroundColor = 'white'
  iconTargetElement.classList.add(iconTargetName)

  iconTargetElement.dataset.iconPrefix = iconPrefix
  iconTargetElement.dataset.iconName = iconName

  return iconTargetElement
}

export function generateContentElement (
  iconCollection: IconCollection,
  categoryName: string
): HTMLDivElement {
  const { categories, prefix: iconPrefix } = iconCollection
  const iconNames = categories[categoryName]
  const contentElement = document.createElement('div')

  for (const iconName of iconNames) {
    const iconTargetElement = generateIconTargetElement(iconPrefix, iconName)
    contentElement.appendChild(iconTargetElement)
  }

  contentElement.style.display = 'flex'
  contentElement.style.gap = '10px'
  contentElement.style.flexWrap = 'wrap'
  contentElement.classList.add(contentName)

  return contentElement
}

export function generateContainerElement (): HTMLDivElement {
  const containerElement = document.createElement('div')

  containerElement.style.display = 'flex'
  containerElement.style.flexDirection = 'column'
  containerElement.style.gap = '10px'
  containerElement.style.padding = '10px'
  containerElement.classList.add(containerName)

  return containerElement
}

export function getFragmentHtml (fragmentElement: DocumentFragment): string {
  const containerElement = generateContainerElement()
  containerElement.appendChild(fragmentElement)

  return containerElement.outerHTML
}
