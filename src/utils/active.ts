import { loadIcons, iconExists } from 'iconify-icon'
import { activeColor, collectionItemName, contentName, iconTargetName, svgIconName } from '../constants'
import { generateModalContent } from './modal'
import { getSelectedIconCollection } from './icon'
import { observeElements, onInterval, stopSubscriptions } from './observer'
import { getSvgIcon } from './svg'
import { resetCollectionElements } from './element'

import type { Editor } from 'grapesjs'
import type { CollectionData } from '../types'

function setActiveBackgroundColor (activeElement: HTMLSpanElement): void {
  activeElement.style.backgroundColor = activeColor
}

function setActiveIconCollection (activeCollectionElement: HTMLSpanElement): void {
  const collectionPrefix = activeCollectionElement.dataset.collectionPrefix || ''
  localStorage.setItem(collectionItemName, collectionPrefix)
}

function setActiveContentElement (iconCollections: CollectionData[]): boolean {
  const contentSelector = `.${contentName}`
  const contentElement = document.querySelector<HTMLDivElement>(contentSelector)
  const selectedIconCollection = getSelectedIconCollection(iconCollections)

  if (!contentElement || !selectedIconCollection) {
    return false
  }

  const modalContentElement = generateModalContent(selectedIconCollection)
  contentElement.replaceWith(modalContentElement)

  return true
}

export function setActiveCollectionElement (selectedIconCollection: CollectionData): void {
  const { prefix } = selectedIconCollection
  const collectionSelector = `[data-collection-prefix="${prefix}"]`
  const activeCollectionElement = document.querySelector<HTMLSpanElement>(collectionSelector)

  if (!activeCollectionElement) {
    return
  }

  setActiveBackgroundColor(activeCollectionElement)
}

export function onActiveCollectionChange (
  iconCollections: CollectionData[],
  collectionElements: NodeListOf<HTMLSpanElement>,
  modalModule: any, // TODO: Use GrapesJS "ModalModule" interface
  editor: Editor
): EventListener {
  let observer: IntersectionObserver|null = null
  let animationFrameId: number|null = null

  return event => {
    // Stop previous subscriptions
    stopSubscriptions(observer, animationFrameId)

    const activeCollectionElement = event.target as HTMLSpanElement|null

    if (!activeCollectionElement) {
      return
    }

    resetCollectionElements(collectionElements)
    setActiveIconCollection(activeCollectionElement)
    setActiveBackgroundColor(activeCollectionElement)

    const hasActiveContent = setActiveContentElement(iconCollections)

    if (!hasActiveContent) {
      return
    }

    const gjsModalSelector = `.gjs-mdl-container`
    const iconTargetSelector = `.${iconTargetName}`

    observer = observeElements(gjsModalSelector, iconTargetSelector, entries => {
      const iconFullNames: string[] = []

      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) {
          return
        }

        const iconTargetElement = target as HTMLDivElement
        const iconPrefix = iconTargetElement.dataset.iconPrefix
        const iconName = iconTargetElement.dataset.iconName

        if (!iconPrefix || !iconName) {
          return
        }

        const iconFullName = `${iconPrefix}:${iconName}`

        if (iconExists(iconFullName)) {
          return
        }

        iconFullNames.push(iconFullName)
      })

      if (iconFullNames.length === 0) {
        return
      }

      loadIcons(iconFullNames)
    })

    animationFrameId = onInterval(() => {
      const iconTargetElements = document.querySelectorAll<HTMLDivElement>(iconTargetSelector)

      if (iconTargetElements.length === 0) {
        stopSubscriptions(observer, animationFrameId)
        return
      }

      for (const iconTargetElement of iconTargetElements) {
        const iconPrefix = iconTargetElement.dataset.iconPrefix
        const iconName = iconTargetElement.dataset.iconName
        const iconFullName = `${iconPrefix}:${iconName}`
        const svgIcon = getSvgIcon(iconFullName)

        if (!svgIcon) {
          continue
        }

        iconTargetElement.classList.replace(iconTargetName, svgIconName)
        iconTargetElement.innerHTML = svgIcon

        iconTargetElement.addEventListener('click', () => {
          const selectedComponent = editor.getSelected()

          if (!selectedComponent) {
            return
          }

          selectedComponent.set({ content: svgIcon })

          modalModule.close()
        }, { once: true })
      }
    }, 1000)

    modalModule.onceClose(() => {
      stopSubscriptions(observer, animationFrameId)
    })
  }
}
