import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { ConnectClient as _rpc_ConnectClient, ConnectDefinition as _rpc_ConnectDefinition } from './rpc/Connect.js';

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
    DocumentCursorTuple: MessageTypeDefinition
    DocumentList: MessageTypeDefinition
    DocumentMeta: MessageTypeDefinition
    DocumentRequest: MessageTypeDefinition
    DocumentResponse: MessageTypeDefinition
    Field: MessageTypeDefinition
    FieldType: EnumTypeDefinition
    FilterOperator: EnumTypeDefinition
    FilterSetting: MessageTypeDefinition
    MetaField: EnumTypeDefinition
    NextArgsRequest: MessageTypeDefinition
    NextArgsResponse: MessageTypeDefinition
    Order: MessageTypeDefinition
    Pagination: MessageTypeDefinition
    PaginationCursor: MessageTypeDefinition
    PaginationData: MessageTypeDefinition
    PaginationField: EnumTypeDefinition
    PublishRequest: MessageTypeDefinition
  }
}

