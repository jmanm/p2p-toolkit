// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

import type { Document as _rpc_Document, Document__Output as _rpc_Document__Output } from '../rpc/Document';
import type { DocumentList as _rpc_DocumentList, DocumentList__Output as _rpc_DocumentList__Output } from '../rpc/DocumentList';
import type { Long } from '@grpc/proto-loader';

export interface Field {
  'name'?: (string);
  'relVal'?: (_rpc_Document | null);
  'relListVal'?: (_rpc_DocumentList | null);
  'pinnedRelVal'?: (_rpc_Document | null);
  'pinnedRelListVal'?: (_rpc_DocumentList | null);
  'stringVal'?: (string);
  'intVal'?: (number | string | Long);
  'floatVal'?: (number | string);
  'boolVal'?: (boolean);
  'byteVal'?: (Buffer | Uint8Array | string);
  'value'?: "relVal"|"relListVal"|"pinnedRelVal"|"pinnedRelListVal"|"stringVal"|"intVal"|"floatVal"|"boolVal"|"byteVal";
}

export interface Field__Output {
  'name': (string);
  'relVal'?: (_rpc_Document__Output | null);
  'relListVal'?: (_rpc_DocumentList__Output | null);
  'pinnedRelVal'?: (_rpc_Document__Output | null);
  'pinnedRelListVal'?: (_rpc_DocumentList__Output | null);
  'stringVal'?: (string);
  'intVal'?: (string);
  'floatVal'?: (number);
  'boolVal'?: (boolean);
  'byteVal'?: (Buffer);
  'value': "relVal"|"relListVal"|"pinnedRelVal"|"pinnedRelListVal"|"stringVal"|"intVal"|"floatVal"|"boolVal"|"byteVal";
}
