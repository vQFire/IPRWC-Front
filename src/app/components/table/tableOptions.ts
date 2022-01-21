export type Data = {
  [key: string]: any
}

export interface Option {
  hidden?: boolean
  key?: string
}

export type Options = {
  [index: number]: Option,
  product?: {
    price: number
    amount: number
  },
  extraColumns?: ExtraColumn[]
  sumTotals?: number[]
}

export type ExtraColumn = {
  objectIndex: number
  objectKey: string
  wantedIndex: number
}
