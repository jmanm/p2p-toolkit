// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

import type { DocumentMeta as _rpc_DocumentMeta, DocumentMeta__Output as _rpc_DocumentMeta__Output } from '../rpc/DocumentMeta';
import type { Field as _rpc_Field, Field__Output as _rpc_Field__Output } from '../rpc/Field';

export interface Document {
  'meta'?: (_rpc_DocumentMeta | null);
  'fields'?: (_rpc_Field)[];
}

export interface Document__Output {
  'meta': (_rpc_DocumentMeta__Output | null);
  'fields': (_rpc_Field__Output)[];
}
