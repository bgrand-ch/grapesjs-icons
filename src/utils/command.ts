import { FETCHED_COMMAND, READY_COMMAND } from './constant'
import { collectionStore } from './store'

import type { Editor, Command } from 'grapesjs'
import type { CommandOptions, ReadyCommandOptions } from '../types'

export function addCommands (editor: Editor): void {
  editor.Commands.add<Command>(FETCHED_COMMAND, (_em, _sender, options: CommandOptions) => {
    const collectionPrefix = options.prefix
    collectionStore.set(collectionPrefix, options)
  })

  editor.Commands.add<Command>(READY_COMMAND, (_em, _sender, options: ReadyCommandOptions) => {
    console.log('Ready command options', options)
  })
}
