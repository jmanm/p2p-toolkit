// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto


export interface PaginationCursor {
  'operationCursor'?: (string);
  'rootOperationCursor'?: (string);
  'rootViewId'?: (string);
  '_rootOperationCursor'?: "rootOperationCursor";
  '_rootViewId'?: "rootViewId";
}

export interface PaginationCursor__Output {
  'operationCursor': (string);
  'rootOperationCursor'?: (string);
  'rootViewId'?: (string);
  '_rootOperationCursor': "rootOperationCursor";
  '_rootViewId': "rootViewId";
}
