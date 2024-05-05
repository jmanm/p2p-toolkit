// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

import type { PaginationCursor as _rpc_PaginationCursor, PaginationCursor__Output as _rpc_PaginationCursor__Output } from '../rpc/PaginationCursor.js';
import type { PaginationField as _rpc_PaginationField, PaginationField__Output as _rpc_PaginationField__Output } from '../rpc/PaginationField.js';

export interface Pagination {
  'first'?: (number | string | bigint);
  'after'?: (_rpc_PaginationCursor | null);
  'fields'?: (_rpc_PaginationField)[];
  '_after'?: "after";
}

export interface Pagination__Output {
  'first': (string);
  'after'?: (_rpc_PaginationCursor__Output | null);
  'fields': (_rpc_PaginationField__Output)[];
  '_after': "after";
}
