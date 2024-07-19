import { ChannelCredentials } from "@grpc/grpc-js";
import { AquadoggoClient } from "./AquadoggoClient";
import type { DocumentRequest } from "./rpc/DocumentRequest";
import type { CollectionRequest } from "./rpc/CollectionRequest";
import type { CollectionResponse } from "./rpc/CollectionResponse";
import type { Document } from "./rpc/Document";
import type { Filter, FieldSelection } from "./queries";
import { KeyPair, verifySignature } from "p2panda-js";

export {
  AquadoggoClient,
  ChannelCredentials,
  KeyPair,
  
  verifySignature
}

export type {
  CollectionRequest,
  CollectionResponse,
  Document,
  DocumentRequest,
  Filter,
  FieldSelection,
}
