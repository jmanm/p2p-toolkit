// Original file: ../../../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

import type { FilterCondition as _rpc_FilterCondition, FilterCondition__Output as _rpc_FilterCondition__Output } from '../rpc/FilterCondition';
import type { MetaFilter as _rpc_MetaFilter, MetaFilter__Output as _rpc_MetaFilter__Output } from '../rpc/MetaFilter';
import type { Direction as _rpc_Direction, Direction__Output as _rpc_Direction__Output } from '../rpc/Direction';
import type { Long } from '@grpc/proto-loader';

export interface CollectionRequest {
  'schemaId'?: (string);
  'filter'?: ({[key: string]: _rpc_FilterCondition});
  'meta'?: (_rpc_MetaFilter | null);
  'orderBy'?: (string);
  'orderDirection'?: (_rpc_Direction);
  'first'?: (number | string | Long);
  'after'?: (string);
  'selections'?: ({[key: string]: boolean});
  '_meta'?: "meta";
  '_orderBy'?: "orderBy";
  '_orderDirection'?: "orderDirection";
  '_first'?: "first";
  '_after'?: "after";
}

export interface CollectionRequest__Output {
  'schemaId': (string);
  'filter': ({[key: string]: _rpc_FilterCondition__Output});
  'meta'?: (_rpc_MetaFilter__Output | null);
  'orderBy'?: (string);
  'orderDirection'?: (_rpc_Direction__Output);
  'first'?: (string);
  'after'?: (string);
  'selections': ({[key: string]: boolean});
  '_meta': "meta";
  '_orderBy': "orderBy";
  '_orderDirection': "orderDirection";
  '_first': "first";
  '_after': "after";
}
