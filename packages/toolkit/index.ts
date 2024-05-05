import { ChannelCredentials } from "@grpc/grpc-js";
import { AquadoggoClient } from "./AquadoggoClient.js";
import type { DocumentRequest } from "./rpc/DocumentRequest.js";
import type { CollectionRequest } from "./rpc/CollectionRequest.js";
import type { CollectionResponse } from "./rpc/CollectionResponse.js";
import type { Document } from "./rpc/Document.js";

export {
  AquadoggoClient,
  ChannelCredentials,
}

export type {
  Document,
  DocumentRequest,
  CollectionRequest,
  CollectionResponse,
}