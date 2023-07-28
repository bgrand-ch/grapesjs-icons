import { collectionName, categoryName } from '../constants'

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
