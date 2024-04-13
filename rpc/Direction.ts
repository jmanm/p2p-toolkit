// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

export const Direction = {
  Ascending: 'Ascending',
  Descending: 'Descending',
} as const;

export type Direction =
  | 'Ascending'
  | 0
  | 'Descending'
  | 1

export type Direction__Output = typeof Direction[keyof typeof Direction]
