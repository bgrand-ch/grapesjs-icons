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
