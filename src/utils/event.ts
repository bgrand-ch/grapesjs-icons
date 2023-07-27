import type { EventData } from '../types'

const events: EventData[] = []

export function foundEventListener (type: string, element: HTMLElement): number {
  return events.findIndex(event => {
    return event.type === type && event.element === element
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

  const event: EventData = {
    type,
    element,
    listener
  }

  events.push(event)
}

export function detachEventListener (type: string, element: HTMLElement) {
  const eventIndex = foundEventListener(type, element)

  if (eventIndex === -1) {
    return
  }

  const { listener } = events[eventIndex]

  element.removeEventListener(type, listener)
  events.splice(eventIndex, 1)
}

export function detachAllEventListeners () {
  for (const { type, element, listener } of events) {
    element.removeEventListener(type, listener)
  }

  events.length = 0
}
