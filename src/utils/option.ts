import type { ModalOptions, ComponentOptions, BlockOptions } from '../types'

export function getModalOptions (options: Partial<ModalOptions>): ModalOptions {
  const modalOptions: ModalOptions = {
    title: options.title ?? 'Icons',
    collectionText: options.collectionText ?? 'Collection',
    categoryText: options.categoryText ?? 'Category',
    searchText: options.searchText ?? 'Search an icon...'
  }

  return modalOptions
}

export function getComponentOptions (options: Partial<ComponentOptions>): ComponentOptions {
  const componentOptions: ComponentOptions = {
    type: options.type ?? 'icon',
    name: options.name ?? 'Icon'
  }

  return componentOptions
}

export function getBlockOptions (options: Partial<BlockOptions>): BlockOptions {
  const blockOptions: BlockOptions = {
    category: options.category ?? 'Basic'
  }

  return blockOptions
}
