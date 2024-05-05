// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

import type { MetaField as _rpc_MetaField, MetaField__Output as _rpc_MetaField__Output } from '../rpc/MetaField.js';
import type { Field as _rpc_Field, Field__Output as _rpc_Field__Output } from '../rpc/Field.js';
import type { FilterOperator as _rpc_FilterOperator, FilterOperator__Output as _rpc_FilterOperator__Output } from '../rpc/FilterOperator.js';

export interface FilterSetting {
  'meta'?: (_rpc_MetaField);
  'field'?: (_rpc_Field | null);
  'operator'?: (_rpc_FilterOperator);
  'filterBy'?: "meta"|"field";
}

export interface FilterSetting__Output {
  'meta'?: (_rpc_MetaField__Output);
  'field'?: (_rpc_Field__Output | null);
  'operator': (_rpc_FilterOperator__Output);
  'filterBy': "meta"|"field";
}
