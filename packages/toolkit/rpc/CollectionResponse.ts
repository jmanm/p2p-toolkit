// Original file: ../../../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

import type { Document as _rpc_Document, Document__Output as _rpc_Document__Output } from '../rpc/Document';
import type { Long } from '@grpc/proto-loader';

export interface CollectionResponse {
  'totalCount'?: (number | string | Long);
  'hasNextPage'?: (boolean);
  'endCursor'?: (string);
  'documents'?: (_rpc_Document)[];
}

export interface CollectionResponse__Output {
  'totalCount': (string);
  'hasNextPage': (boolean);
  'endCursor': (string);
  'documents': (_rpc_Document__Output)[];
}
