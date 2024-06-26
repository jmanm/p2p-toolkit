import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { ConnectClient as _rpc_ConnectClient, ConnectDefinition as _rpc_ConnectDefinition } from './rpc/Connect';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  rpc: {
    CollectionRequest: MessageTypeDefinition
    CollectionResponse: MessageTypeDefinition
    Connect: SubtypeConstructor<typeof grpc.Client, _rpc_ConnectClient> & { service: _rpc_ConnectDefinition }
    Direction: EnumTypeDefinition
    Document: MessageTypeDefinition
    DocumentList: MessageTypeDefinition
    DocumentMeta: MessageTypeDefinition
    DocumentRequest: MessageTypeDefinition
    DocumentResponse: MessageTypeDefinition
    Field: MessageTypeDefinition
    FilterCondition: MessageTypeDefinition
    FilterOperator: EnumTypeDefinition
    MetaFilter: MessageTypeDefinition
    NextArgsRequest: MessageTypeDefinition
    NextArgsResponse: MessageTypeDefinition
    PublishRequest: MessageTypeDefinition
  }
}

