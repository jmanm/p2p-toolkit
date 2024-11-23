import { ChannelCredentials } from "@grpc/grpc-js";
import { AquadoggoClient } from "./AquadoggoClient";
import type { DocumentMeta } from "./rpc/DocumentMeta";
import type { NextArgsResponse } from "./rpc/NextArgsResponse";
import type { Document, DocumentRequest, Filter, FieldSelection, CollectionRequest, CollectionResponse, PublishValue } from "./queries";
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
  NextArgsResponse,
}
