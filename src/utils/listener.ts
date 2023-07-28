import { categoryName } from '../constants'
import { setIconCollectionName, setIconCategoryName } from './storage'

export function onCollectionChanged (): EventListener {
  let categoryElements: NodeListOf<HTMLSelectElement>|null = null

  return event => {
    const collectionElement = event.target as HTMLSelectElement|null

    if (!collectionElement) {
      return
    }

    if (!categoryElements) {
      categoryElements = document.querySelectorAll<HTMLSelectElement>(`.${categoryName}`)
    }

    const collectionName = collectionElement.value

    setIconCollectionName(collectionName)

    for (const categoryElement of categoryElements) {
      const dataCollectionName = categoryElement.dataset.collectionName!

      if (dataCollectionName !== collectionName) {
        categoryElement.style.display = 'none'
        continue
      }

      const firstOption = categoryElement.options[0]
      const changeEvent = new Event('change')

      categoryElement.style.display = 'initial'
      categoryElement.value = firstOption.value

      categoryElement.dispatchEvent(changeEvent)
    }
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
