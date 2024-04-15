// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

export const FilterOperator = {
  In: 'In',
  NotIn: 'NotIn',
  Eq: 'Eq',
  NotEq: 'NotEq',
  Gt: 'Gt',
  Gte: 'Gte',
  Lt: 'Lt',
  Lte: 'Lte',
  Contains: 'Contains',
  NotContains: 'NotContains',
} as const;

export type FilterOperator =
  | 'In'
  | 0
  | 'NotIn'
  | 1
  | 'Eq'
  | 2
  | 'NotEq'
  | 3
  | 'Gt'
  | 4
  | 'Gte'
  | 5
  | 'Lt'
  | 6
  | 'Lte'
  | 7
  | 'Contains'
  | 8
  | 'NotContains'
  | 9

export type FilterOperator__Output = typeof FilterOperator[keyof typeof FilterOperator]
