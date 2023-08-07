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

export type IconCollection = {
  prefix: string,
  total: number,
  title: string,
  categories: Record<string, string[]>,
  uncategorized?: string[],
  hidden?: string[],
  aliases?: Record<string, string>,
  prefixes?: Record<string, string>,
  suffixes?: Record<string, string>
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
