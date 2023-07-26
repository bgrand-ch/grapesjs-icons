export type Options = {
  collectionNames: string[],
  componentType?: string,
  componentName?: string,
  modalTitle?: string,
  blockCategory?: string
}

export type CollectionCategories = {
  [key: string]: string[]
}

export type CollectionAliases = {
  [key: string]: string
}

export type CollectionSuffixes = {
  [key: string]: string
}

export type CollectionData = {
  prefix: string,
  total: number,
  title: string,
  categories: CollectionCategories,
  uncategorized?: string[],
  hidden?: string[],
  aliases?: CollectionAliases,
  suffixes?: CollectionSuffixes
}
