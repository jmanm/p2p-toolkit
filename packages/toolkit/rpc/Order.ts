// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

import type { MetaField as _rpc_MetaField, MetaField__Output as _rpc_MetaField__Output } from '../rpc/MetaField.js';
import type { Direction as _rpc_Direction, Direction__Output as _rpc_Direction__Output } from '../rpc/Direction.js';

export interface Order {
  'meta'?: (_rpc_MetaField);
  'fieldName'?: (string);
  'direction'?: (_rpc_Direction);
  'field'?: "meta"|"fieldName";
}

export interface Order__Output {
  'meta'?: (_rpc_MetaField__Output);
  'fieldName'?: (string);
  'direction': (_rpc_Direction__Output);
  'field': "meta"|"fieldName";
}
