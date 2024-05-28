import { ChannelCredentials } from "@grpc/grpc-js";
import { AquadoggoClient } from "./AquadoggoClient";
import type { DocumentRequest } from "./rpc/DocumentRequest";
import type { CollectionRequest } from "./rpc/CollectionRequest";
import type { CollectionResponse } from "./rpc/CollectionResponse";
import type { Document } from "./rpc/Document";
import { KeyPair, verifySignature } from "p2panda-js";

export {
  AquadoggoClient,
  ChannelCredentials,
  KeyPair,

  verifySignature
}

export type {
  Document,
  DocumentRequest,
  CollectionRequest,
  CollectionResponse,
}