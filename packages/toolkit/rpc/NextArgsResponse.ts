// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

export interface NextArgsResponse {
  'logId'?: (number | string | bigint);
  'seqNum'?: (number | string | bigint);
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
