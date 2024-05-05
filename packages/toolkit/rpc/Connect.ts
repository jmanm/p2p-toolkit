// Original file: ../p2panda/aquadoggo/aquadoggo/proto/rpc.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CollectionRequest as _rpc_CollectionRequest, CollectionRequest__Output as _rpc_CollectionRequest__Output } from '../rpc/CollectionRequest.js';
import type { CollectionResponse as _rpc_CollectionResponse, CollectionResponse__Output as _rpc_CollectionResponse__Output } from '../rpc/CollectionResponse.js';
import type { DocumentRequest as _rpc_DocumentRequest, DocumentRequest__Output as _rpc_DocumentRequest__Output } from '../rpc/DocumentRequest.js';
import type { DocumentResponse as _rpc_DocumentResponse, DocumentResponse__Output as _rpc_DocumentResponse__Output } from '../rpc/DocumentResponse.js';
import type { NextArgsRequest as _rpc_NextArgsRequest, NextArgsRequest__Output as _rpc_NextArgsRequest__Output } from '../rpc/NextArgsRequest.js';
import type { NextArgsResponse as _rpc_NextArgsResponse, NextArgsResponse__Output as _rpc_NextArgsResponse__Output } from '../rpc/NextArgsResponse.js';
import type { PublishRequest as _rpc_PublishRequest, PublishRequest__Output as _rpc_PublishRequest__Output } from '../rpc/PublishRequest.js';

export interface ConnectClient extends grpc.Client {
  DoPublish(argument: _rpc_PublishRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;
  DoPublish(argument: _rpc_PublishRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;
  DoPublish(argument: _rpc_PublishRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;
  DoPublish(argument: _rpc_PublishRequest, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;
  doPublish(argument: _rpc_PublishRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;
  doPublish(argument: _rpc_PublishRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;
  doPublish(argument: _rpc_PublishRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;
  doPublish(argument: _rpc_PublishRequest, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;

  GetCollection(argument: _rpc_CollectionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_CollectionResponse__Output>): grpc.ClientUnaryCall;
  GetCollection(argument: _rpc_CollectionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rpc_CollectionResponse__Output>): grpc.ClientUnaryCall;
  GetCollection(argument: _rpc_CollectionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_CollectionResponse__Output>): grpc.ClientUnaryCall;
  GetCollection(argument: _rpc_CollectionRequest, callback: grpc.requestCallback<_rpc_CollectionResponse__Output>): grpc.ClientUnaryCall;
  getCollection(argument: _rpc_CollectionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_CollectionResponse__Output>): grpc.ClientUnaryCall;
  getCollection(argument: _rpc_CollectionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rpc_CollectionResponse__Output>): grpc.ClientUnaryCall;
  getCollection(argument: _rpc_CollectionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_CollectionResponse__Output>): grpc.ClientUnaryCall;
  getCollection(argument: _rpc_CollectionRequest, callback: grpc.requestCallback<_rpc_CollectionResponse__Output>): grpc.ClientUnaryCall;

  GetDocument(argument: _rpc_DocumentRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_DocumentResponse__Output>): grpc.ClientUnaryCall;
  GetDocument(argument: _rpc_DocumentRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rpc_DocumentResponse__Output>): grpc.ClientUnaryCall;
  GetDocument(argument: _rpc_DocumentRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_DocumentResponse__Output>): grpc.ClientUnaryCall;
  GetDocument(argument: _rpc_DocumentRequest, callback: grpc.requestCallback<_rpc_DocumentResponse__Output>): grpc.ClientUnaryCall;
  getDocument(argument: _rpc_DocumentRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_DocumentResponse__Output>): grpc.ClientUnaryCall;
  getDocument(argument: _rpc_DocumentRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rpc_DocumentResponse__Output>): grpc.ClientUnaryCall;
  getDocument(argument: _rpc_DocumentRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_DocumentResponse__Output>): grpc.ClientUnaryCall;
  getDocument(argument: _rpc_DocumentRequest, callback: grpc.requestCallback<_rpc_DocumentResponse__Output>): grpc.ClientUnaryCall;

  GetNextArgs(argument: _rpc_NextArgsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;
  GetNextArgs(argument: _rpc_NextArgsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;
  GetNextArgs(argument: _rpc_NextArgsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;
  GetNextArgs(argument: _rpc_NextArgsRequest, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;
  getNextArgs(argument: _rpc_NextArgsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;
  getNextArgs(argument: _rpc_NextArgsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;
  getNextArgs(argument: _rpc_NextArgsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;
  getNextArgs(argument: _rpc_NextArgsRequest, callback: grpc.requestCallback<_rpc_NextArgsResponse__Output>): grpc.ClientUnaryCall;

}

export interface ConnectHandlers extends grpc.UntypedServiceImplementation {
  DoPublish: grpc.handleUnaryCall<_rpc_PublishRequest__Output, _rpc_NextArgsResponse>;

  GetCollection: grpc.handleUnaryCall<_rpc_CollectionRequest__Output, _rpc_CollectionResponse>;

  GetDocument: grpc.handleUnaryCall<_rpc_DocumentRequest__Output, _rpc_DocumentResponse>;

  GetNextArgs: grpc.handleUnaryCall<_rpc_NextArgsRequest__Output, _rpc_NextArgsResponse>;

}

export interface ConnectDefinition extends grpc.ServiceDefinition {
  DoPublish: MethodDefinition<_rpc_PublishRequest, _rpc_NextArgsResponse, _rpc_PublishRequest__Output, _rpc_NextArgsResponse__Output>
  GetCollection: MethodDefinition<_rpc_CollectionRequest, _rpc_CollectionResponse, _rpc_CollectionRequest__Output, _rpc_CollectionResponse__Output>
  GetDocument: MethodDefinition<_rpc_DocumentRequest, _rpc_DocumentResponse, _rpc_DocumentRequest__Output, _rpc_DocumentResponse__Output>
  GetNextArgs: MethodDefinition<_rpc_NextArgsRequest, _rpc_NextArgsResponse, _rpc_NextArgsRequest__Output, _rpc_NextArgsResponse__Output>
}
