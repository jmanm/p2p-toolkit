import { ChannelCredentials } from "@grpc/grpc-js";
import { AquadoggoClient, type PublishValue } from "./AquadoggoClient";
import type { DocumentMeta } from "./rpc/DocumentMeta";
import type { Document, DocumentRequest, Filter, FieldSelection, CollectionRequest, CollectionResponse } from "./queries";
import { KeyPair, OperationFields, verifySignature } from "p2panda-js";

export {
  AquadoggoClient,
  ChannelCredentials,
  KeyPair,
  OperationFields,
  
  verifySignature
}

export type {
  CollectionRequest,
  CollectionResponse,
  Document,
  DocumentMeta,
  DocumentRequest,
  Filter,
  FieldSelection,
  PublishValue,
}
