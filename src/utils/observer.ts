import { iconTargetName } from '../constants'

export function observeElements (
  containerSelector: string,
  elementSelector: string,
  callback: IntersectionObserverCallback
): IntersectionObserver|null {
  const containerElement = document.querySelector(containerSelector)
  const elements = document.querySelectorAll(elementSelector)

  if (!containerElement || !elements) {
    return null
  }

  const observer = new IntersectionObserver(callback, {
    root: containerElement
  })

  for (const element of elements) {
    observer.observe(element)
  }

  return observer
}

export function onInterval (callbackFn: () => void, msInterval: number): number {
  let lastTime = 0

  const checkTime = (currTime: number): boolean => {
    const diffTime = currTime - lastTime

    if (lastTime && diffTime < msInterval) {
      return false
    }

    lastTime = currTime
    return true
  }
  const execute = (currTime = 0): number => {
    const isTime = checkTime(currTime)

    if (isTime) {
      callbackFn()
    }

    return window.requestAnimationFrame(
      execute
    )
  }

  return execute()
}

export function stopObservation (observer: IntersectionObserver): void {
  const iconTargetSelector = `.${iconTargetName}`
  const elements = document.querySelectorAll(iconTargetSelector)

  for (const element of elements) {
    observer.unobserve(element)
  }
}

export function stopInterval (animationFrameId: number): void {
  window.cancelAnimationFrame(animationFrameId)
}

export function stopSubscriptions (
  observer: IntersectionObserver|null,
  animationFrameId: number|null
) {
  if (observer !== null) {
    stopObservation(observer)
  }

  if (animationFrameId !== null) {
    stopInterval(animationFrameId)
  }
}
