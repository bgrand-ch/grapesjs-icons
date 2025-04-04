export type IconCollection = {
  prefix: string,
  title: string,
  total: number,
  aliases?: Record<string, string>,
  categories?: Record<string, string[]>,
  uncategorized?: string[],
  hidden?: string[]
}

export type PluginOptions = {
  collectionPrefixes: string[]
}
