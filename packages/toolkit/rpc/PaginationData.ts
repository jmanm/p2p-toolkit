// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

import type { PaginationCursor as _rpc_PaginationCursor, PaginationCursor__Output as _rpc_PaginationCursor__Output } from '../rpc/PaginationCursor.js';

export interface PaginationData {
  'totalCount'?: (number | string | bigint);
  'hasNextPage'?: (boolean);
  'hasPreviousPage'?: (boolean);
  'startCursor'?: (_rpc_PaginationCursor | null);
  'endCursor'?: (_rpc_PaginationCursor | null);
  '_startCursor'?: "startCursor";
  '_endCursor'?: "endCursor";
}

export interface PaginationData__Output {
  'totalCount': (string);
  'hasNextPage': (boolean);
  'hasPreviousPage': (boolean);
  'startCursor'?: (_rpc_PaginationCursor__Output | null);
  'endCursor'?: (_rpc_PaginationCursor__Output | null);
  '_startCursor': "startCursor";
  '_endCursor': "endCursor";
}
