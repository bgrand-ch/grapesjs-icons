export type ModalOptions = {
  title: string,
  collectionText: string,
  categoryText: string,
  searchText: string
}

export type ComponentOptions = {
  type: string,
  name: string
}

export type BlockOptions = {
  category: string
}

export type PluginOptions = {
  collections: string[],
  modal?: Partial<ModalOptions>,
  component?: Partial<ComponentOptions>,
  block?: Partial<BlockOptions>
}

type IconCollectionCategories = {
  [key: string]: string[]
}

type IconCollectionAliases = {
  [key: string]: string
}

type IconCollectionSuffixes = {
  [key: string]: string
}

export type IconCollection = {
  prefix: string,
  total: number,
  title: string,
  categories: IconCollectionCategories,
  uncategorized?: string[],
  hidden?: string[],
  aliases?: IconCollectionAliases,
  suffixes?: IconCollectionSuffixes
}

export type SelectOption = {
  text: string,
  value: string
}

export type EventListenerData = {
  type: string,
  element: HTMLElement,
  listener: EventListener
}

export type InsertionMode = 'drop'|'click'

export type CommandOptions = {
  insertionMode?: InsertionMode
}
