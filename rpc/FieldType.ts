// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

export const FieldType = {
  Doc: 'Doc',
  String: 'String',
  Int: 'Int',
  Float: 'Float',
  Bool: 'Bool',
  Bytes: 'Bytes',
} as const;

export type FieldType =
  | 'Doc'
  | 0
  | 'String'
  | 1
  | 'Int'
  | 2
  | 'Float'
  | 3
  | 'Bool'
  | 4
  | 'Bytes'
  | 5

export type FieldType__Output = typeof FieldType[keyof typeof FieldType]
