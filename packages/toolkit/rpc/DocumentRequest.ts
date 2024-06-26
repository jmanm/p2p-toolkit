// Original file: ../../../p2panda/aquadoggo/aquadoggo/proto/rpc.proto


export interface DocumentRequest {
  'documentId'?: (string);
  'documentViewId'?: (string);
  'selections'?: ({[key: string]: boolean});
  '_documentId'?: "documentId";
  '_documentViewId'?: "documentViewId";
}

export interface DocumentRequest__Output {
  'documentId'?: (string);
  'documentViewId'?: (string);
  'selections': ({[key: string]: boolean});
  '_documentId': "documentId";
  '_documentViewId': "documentViewId";
}
