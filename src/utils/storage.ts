import { modeName, collectionName, categoryName } from '../constants'

import type { InsertionMode } from '../types'

export function setInsertionMode (insertionMode?: InsertionMode): void {
  const mode = insertionMode || 'click'
  localStorage.setItem(modeName, mode)
}

export function setIconCollectionName (collection: string): void {
  localStorage.setItem(collectionName, collection)
}

export function setIconCategoryName (category: string): void {
  localStorage.setItem(categoryName, category)
}

export function getIconCollectionName (): string|null {
  return localStorage.getItem(collectionName)
}

export function getIconCategoryName (): string|null {
  return localStorage.getItem(categoryName)
}
