export type IconCollection = {
  prefix: string,
  title: string,
  total: number,
  aliases?: Record<string, string>,
  categories?: Record<string, string[]>,
  uncategorized?: string[],
  hidden?: string[]
}

export type CommandOptions = Pick<IconCollection, 'prefix'|'title'|'total'> & {
  iconNames: string[]
}

export type ReadyCommandOptions = Record<string, CommandOptions>

export type PluginOptions = {
  collectionPrefixes: string[]
}
