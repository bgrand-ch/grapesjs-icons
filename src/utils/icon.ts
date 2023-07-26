import { collectionItemName } from '../constants'

import type { CollectionData } from '../types'

const apiUrl = import.meta.env.VITE_ICONIFY_API_URL
const pluginName = import.meta.env.VITE_PLUGIN_NAME
const logScope = `[${pluginName}::utils/icon]`

export function getSelectedIconCollection (iconCollections: CollectionData[]): CollectionData|null {
  let iconCollectionPrefix = localStorage.getItem(collectionItemName)

  if (!iconCollectionPrefix) {
    const firstIconCollection = iconCollections[0]
    const { prefix } = firstIconCollection

    localStorage.setItem(collectionItemName, prefix)
    iconCollectionPrefix = prefix
  }

  const selectedIconCollection = iconCollections.find(iconCollection => {
    return iconCollection.prefix === iconCollectionPrefix
  })
  
  if (!selectedIconCollection) {
    return null
  }

  return selectedIconCollection
}

export async function getIconCollection (collectionName: string): Promise<CollectionData|null> {
  try {
    const response = await fetch(`${apiUrl}/collection?prefix=${collectionName}`)
    const iconCollection = await response.json()

    return iconCollection
  } catch (error) {
    console.error(`${logScope} "${collectionName}" fetching error`, error)
    return null
  }
}

export async function getIconCollections (collectionNames: string[]): Promise<CollectionData[]> {
  const iconCollectionPromises: Promise<CollectionData|null>[] = []

  for (const collectionName of collectionNames) {
    const iconCollectionPromise = getIconCollection(collectionName)
    iconCollectionPromises.push(iconCollectionPromise)
  }

  const rawIconCollections = await Promise.all(iconCollectionPromises)
  const iconCollections = rawIconCollections.filter(iconCollection => {
    return iconCollection !== null
  }) as CollectionData[]

  return iconCollections
}
