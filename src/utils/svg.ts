import { iconExists, getIcon } from 'iconify-icon'

export function getSvgIcon (iconName: string): string|null {
  if (!iconExists(iconName)) {
    return null
  }

  const {
    body: iconBody,
    width: iconWidth,
    height: iconHeight
  } = getIcon(iconName)
  const rawSvgIcon = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 ${iconWidth} ${iconHeight}"
    >
      ${iconBody}
    </svg>
  `
  const svgIcon = rawSvgIcon.replace(/^\s+/gm, '').replace(/[\r\n]+/g, ' ')

  return svgIcon
}
