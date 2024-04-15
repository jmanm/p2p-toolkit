// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

export const MetaField = {
  DocumentId: 'DocumentId',
  DocumentViewId: 'DocumentViewId',
  Owner: 'Owner',
  Edited: 'Edited',
  Deleted: 'Deleted',
} as const;

export type MetaField =
  | 'DocumentId'
  | 0
  | 'DocumentViewId'
  | 1
  | 'Owner'
  | 2
  | 'Edited'
  | 3
  | 'Deleted'
  | 4

export type MetaField__Output = typeof MetaField[keyof typeof MetaField]
