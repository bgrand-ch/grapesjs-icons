import type { EventListenerData } from '../types'

const eventListeners: EventListenerData[] = []

export function foundEventListener (type: string, element: HTMLElement): number {
  return eventListeners.findIndex(eventListener => {
    return eventListener.type === type && eventListener.element === element
  })
}

export function hasEventListener (type: string, element: HTMLElement): boolean {
  const eventIndex = foundEventListener(type, element)
  return eventIndex !== -1
}

export function attachEventListener (type: string, element: HTMLElement, listener: EventListener): void {
  if (hasEventListener(type, element)) {
    return
  }

  element.addEventListener(type, listener)

  eventListeners.push({
    type,
    element,
    listener
  })
}

export function detachEventListener (type: string, element: HTMLElement): void {
  const eventIndex = foundEventListener(type, element)

  if (eventIndex === -1) {
    return
  }

  const { listener } = eventListeners[eventIndex]

  element.removeEventListener(type, listener)
  eventListeners.splice(eventIndex, 1)
}

export function detachAllEventListeners (className?: string): void {
  const totalEventListeners = eventListeners.length
  const removedIndexes: number[] = []

  for (let index = 0; index < totalEventListeners; index++) {
    const { type, element, listener } = eventListeners[index]

    if (className && !element.classList.contains(className)) {
      continue
    }

    element.removeEventListener(type, listener)
    removedIndexes.push(index)
  }

  for (const removedIndex of removedIndexes) {
    eventListeners.splice(removedIndex, 1)
  }
}
