// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

import type { Long } from '@grpc/proto-loader';

export interface NextArgsResponse {
  'logId'?: (number | string | Long);
  'seqNum'?: (number | string | Long);
  'backlink'?: (string);
  'skiplink'?: (string);
  '_backlink'?: "backlink";
  '_skiplink'?: "skiplink";
}

export interface NextArgsResponse__Output {
  'logId': (string);
  'seqNum': (string);
  'backlink'?: (string);
  'skiplink'?: (string);
  '_backlink': "backlink";
  '_skiplink': "skiplink";
}
