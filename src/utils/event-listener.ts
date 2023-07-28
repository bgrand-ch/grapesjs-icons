import type { EventListenerData } from '../types'

const eventListeners: EventListenerData[] = []

export function foundEventListener <T extends HTMLElement>(
  type: string,
  element: T
): number {
  return eventListeners.findIndex(eventListener => {
    return eventListener.type === type && eventListener.element === element
  })
}

export function hasEventListener <T extends HTMLElement>(
  type: string,
  element: T
): boolean {
  const eventIndex = foundEventListener<T>(type, element)
  return eventIndex !== -1
}

export function attachEventListener <T extends HTMLElement>(
  type: string,
  element: T,
  listener: EventListener
): void {
  if (hasEventListener<T>(type, element)) {
    return
  }

  element.addEventListener(type, listener)

  eventListeners.push({
    type,
    element,
    listener
  })
}

export function attachEventListeners <T extends HTMLElement>(
  type: string,
  elements: T[]|NodeListOf<T>,
  listener: EventListener
): void {
  for (const element of elements) {
    attachEventListener<T>(type, element, listener)
  }
}

export function detachEventListener <T extends HTMLElement>(
  type: string,
  element: T
): void {
  const eventIndex = foundEventListener<T>(type, element)

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

  if (totalEventListeners === 0) {
    return
  }

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
