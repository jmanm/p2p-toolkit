// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

import type { Pagination as _rpc_Pagination, Pagination__Output as _rpc_Pagination__Output } from '../rpc/Pagination';
import type { Order as _rpc_Order, Order__Output as _rpc_Order__Output } from '../rpc/Order';
import type { FilterSetting as _rpc_FilterSetting, FilterSetting__Output as _rpc_FilterSetting__Output } from '../rpc/FilterSetting';

export interface CollectionRequest {
  'schemaId'?: (string);
  'pagination'?: (_rpc_Pagination | null);
  'order'?: (_rpc_Order | null);
  'filter'?: (_rpc_FilterSetting)[];
  '_pagination'?: "pagination";
  '_order'?: "order";
}

export interface CollectionRequest__Output {
  'schemaId': (string);
  'pagination'?: (_rpc_Pagination__Output | null);
  'order'?: (_rpc_Order__Output | null);
  'filter': (_rpc_FilterSetting__Output)[];
  '_pagination': "pagination";
  '_order': "order";
}
