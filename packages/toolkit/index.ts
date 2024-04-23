import { ChannelCredentials } from "@grpc/grpc-js";
import { AquadoggoClient } from "./AquadoggoClient";
import type { DocumentRequest } from "./rpc/DocumentRequest";
import type { CollectionRequest } from "./rpc/CollectionRequest";
import type { CollectionResponse } from "./rpc/CollectionResponse";
import type { Document } from "./rpc/Document";

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