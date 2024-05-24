import { ChannelCredentials } from "@grpc/grpc-js";
import { KeyPair } from "p2panda-js";
import { AquadoggoClient } from "./AquadoggoClient";
import { buildObject } from "./queries";
import type { DocumentRequest } from "./rpc/DocumentRequest";
import type { CollectionRequest } from "./rpc/CollectionRequest";
import type { CollectionResponse } from "./rpc/CollectionResponse";
import type { Document } from "./rpc/Document";
import type { Filter, FieldSelection } from "./queries";

export {
  AquadoggoClient,
  ChannelCredentials,
  KeyPair,
  
  buildObject,
}

export type {
  CollectionRequest,
  CollectionResponse,
  Document,
  DocumentRequest,
  Filter,
  FieldSelection,
}