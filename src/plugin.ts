import { FETCHED_COMMAND, LOG_SCOPE, READY_COMMAND } from './utils/constant'
import { addCommands } from './utils/command'
import { getIconCollection, getIconNames } from './utils/icon'
import { collectionStore } from './utils/store'

import type { Plugin } from 'grapesjs'
import type { CommandOptions, IconCollection, PluginOptions, ReadyCommandOptions } from './types'

const plugin: Plugin<PluginOptions> = (editor, options) => {
  const { collectionPrefixes } = options

  if (
    !Array.isArray(collectionPrefixes) ||
    collectionPrefixes.length === 0
  ) {
    console.warn(`${LOG_SCOPE} "collectionPrefixes" is required in plugin options`)
    return
  }

  addCommands(editor)

  const lastCollectionIndex = collectionPrefixes.length - 1
  const iconCollectionPromises: Promise<IconCollection|null>[] = collectionPrefixes.map(collectionPrefix => {
    return getIconCollection(collectionPrefix)
  })

  Promise.allSettled(iconCollectionPromises).then(results => {
    results.forEach((result, collectionIndex) => {
      const collectionPrefix = collectionPrefixes[collectionIndex]

      if (result.status === 'rejected' || !result.value) {
        console.warn(`${LOG_SCOPE} Icon collection (${collectionPrefix}) error`, result)
        return
      }

      const { prefix, title, total } = result.value
      const options: CommandOptions = {
        prefix,
        title,
        total: 0,
        iconNames: []
      }

      getIconNames(result.value).then(iconNames => {
        if (
          Array.isArray(iconNames) &&
          iconNames.length > 0
        ) {
          options.total = total
          options.iconNames = iconNames
        }

        editor.runCommand(FETCHED_COMMAND, options)

        if (collectionIndex === lastCollectionIndex) {
          const readyOptions: ReadyCommandOptions = Object.fromEntries(collectionStore.entries())
          editor.runCommand(READY_COMMAND, readyOptions)
        }
      })
    })
  })
}

export default plugin

export * from './types'
