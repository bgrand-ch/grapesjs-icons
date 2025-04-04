import { LOG_SCOPE } from './utils/constant'
import { getIconCollection, getIconNames } from './utils/icon'

import type { Plugin } from 'grapesjs'
import type { IconCollection, PluginOptions } from './types'

const plugin: Plugin<PluginOptions> = (editor, options) => {
  const { collectionPrefixes } = options

  editor.once('load', () => {
    if (
      !Array.isArray(collectionPrefixes) ||
      collectionPrefixes.length === 0
    ) {
      console.warn(`${LOG_SCOPE} Editor load - No collection prefixes`)
      return
    }

    const iconCollectionPromises: Promise<IconCollection|null>[] = []

    collectionPrefixes.forEach(collectionPrefix => {
      iconCollectionPromises.push(
        getIconCollection(collectionPrefix)
      )
    })

    Promise.allSettled(iconCollectionPromises).then(results => {
      results.forEach(result => {
        if (result.status === 'rejected') {
          console.warn(`${LOG_SCOPE} Icon collection - ${result.reason}`)
          return
        }

        if (result.value) {
          getIconNames(result.value).then(iconNames => {
            if (!iconNames) {
              return
            }

            console.info(`${LOG_SCOPE} Icon names`, iconNames)
          })
        }
      })
    })
  })
}

export default plugin

export * from './types'
