import { API_URL, LOG_SCOPE } from './constant'

import type { IconCollection } from '../types'

export function getIconFullName (collectionPrefix: string, iconName: string): string {
  return `${collectionPrefix}:${iconName}`
}

export function getIconPagination (totalIcons: number, maxIcons: number = 15): number {
  return Math.ceil(totalIcons / maxIcons)
}

export async function getIconCollection (collectionPrefix: string, cache: RequestCache = 'force-cache'): Promise<IconCollection|null> {
  try {
    const response = await fetch(`${API_URL}/collection?prefix=${collectionPrefix}`, { cache })
    const result = await response.json()

    return result
  } catch (err) {
    const { message } = err as Error
    console.warn(`${LOG_SCOPE} getIconCollection - ${message}`)

    return null
  }
}

export async function getIconNames ({ categories = {}, uncategorized = [] }: IconCollection): Promise<string[]|null> {
  try {
    const categorized = Object.values(categories).flatMap(names => names)
    const allIconNames = categorized.concat(uncategorized)

    return [...new Set(allIconNames)]
  } catch (err) {
    const { message } = err as Error
    console.warn(`${LOG_SCOPE} getAllIconNames - ${message}`)

    return null
  }
}
