// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

export const PaginationField = {
  TotalCount: 'TotalCount',
  HasNextPage: 'HasNextPage',
  HasPreviousPage: 'HasPreviousPage',
  StartCursor: 'StartCursor',
  EndCursor: 'EndCursor',
} as const;

export type PaginationField =
  | 'TotalCount'
  | 0
  | 'HasNextPage'
  | 1
  | 'HasPreviousPage'
  | 2
  | 'StartCursor'
  | 3
  | 'EndCursor'
  | 4

export type PaginationField__Output = typeof PaginationField[keyof typeof PaginationField]
