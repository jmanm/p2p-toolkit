// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

import type { PaginationData as _rpc_PaginationData, PaginationData__Output as _rpc_PaginationData__Output } from '../rpc/PaginationData';
import type { DocumentCursorTuple as _rpc_DocumentCursorTuple, DocumentCursorTuple__Output as _rpc_DocumentCursorTuple__Output } from '../rpc/DocumentCursorTuple';

export interface CollectionResponse {
  'pagination'?: (_rpc_PaginationData | null);
  'documents'?: (_rpc_DocumentCursorTuple)[];
}

export interface CollectionResponse__Output {
  'pagination': (_rpc_PaginationData__Output | null);
  'documents': (_rpc_DocumentCursorTuple__Output)[];
}
