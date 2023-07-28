import { setIconCollectionName, setIconCategoryName } from './storage'

export function onCollectionChanged (): EventListener {
  return event => {
    const element = event.target as HTMLSelectElement|null

    if (!element) {
      return
    }

    setIconCollectionName(element.value)
  }
}

export function onCategoryChanged (): EventListener {
  return event => {
    const element = event.target as HTMLSelectElement|null

    if (!element) {
      return
    }

    setIconCategoryName(element.value)
  }
}

export function onSearchChanged (): EventListener {
  return event => {
    const element = event.target as HTMLInputElement|null

    if (!element) {
      return
    }

    console.log('search changed!', element.value)
  }
}
