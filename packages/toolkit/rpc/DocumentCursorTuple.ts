// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

import type { PaginationCursor as _rpc_PaginationCursor, PaginationCursor__Output as _rpc_PaginationCursor__Output } from '../rpc/PaginationCursor';
import type { Document as _rpc_Document, Document__Output as _rpc_Document__Output } from '../rpc/Document';

export interface DocumentCursorTuple {
  'cursor'?: (_rpc_PaginationCursor | null);
  'document'?: (_rpc_Document | null);
}

export interface DocumentCursorTuple__Output {
  'cursor': (_rpc_PaginationCursor__Output | null);
  'document': (_rpc_Document__Output | null);
}
