import { loadPackageDefinition, ChannelCredentials } from "@grpc/grpc-js";
import { load as loadProto } from '@grpc/proto-loader';
import type { ProtoGrpcType } from "./rpc";
import type { ConnectClient } from "./rpc/Connect";
import type { DocumentRequest } from "./rpc/DocumentRequest";
import type { CollectionRequest } from "./rpc/CollectionRequest";
import { KeyPair, encodeOperation, signAndEncodeEntry, type EntryArgs, type OperationArgs } from "p2panda-js";

const HASH_LEN = 68;

export interface ClientOptions {
  serverUrl: string;
  protoFilePath: string;
  credentials: ChannelCredentials;
}

export class AquadoggoClient {
  protected constructor(private grpcClient: ConnectClient) { }

  static async load(options: ClientOptions) {
    const def = await loadProto(options.protoFilePath);
    const { rpc } = loadPackageDefinition(def) as unknown as ProtoGrpcType;
    const client = new rpc.Connect(options.serverUrl, options.credentials);
    return new AquadoggoClient(client);
  }

  dispose() {
    this.grpcClient.close();
  }

  async getCollection({ schemaId, pagination, order, filter }: CollectionRequest) {
    if (!schemaId || schemaId.length < HASH_LEN) {
      throw new Error('Missing or malformed schema ID');
    }

    return new Promise((resolve, reject) => {
      this.grpcClient.getCollection({ schemaId, pagination, order, filter },
        (err, coll) => {
          err && reject(err);
          coll && resolve(coll);
        }
      )
    });
  }

  async getDocument({ documentId, documentViewId }: DocumentRequest) {
    if ((!documentId || documentId.length < HASH_LEN) &&
        (!documentViewId || documentViewId.length < HASH_LEN)
    ) {
      throw new Error('Missing or malformed document ID and/or document view ID');
    }

    return new Promise((resolve, reject) => {
      this.grpcClient.getDocument({ documentId, documentViewId },
        (err, doc) => {
          err && reject(err);
          doc && resolve(doc);
        }
      );
    });
  }

  async doPublish({ operationArgs, entryArgs, keyPair }: { operationArgs: OperationArgs, entryArgs: EntryArgs, keyPair: KeyPair }) {
    const entry = signAndEncodeEntry(entryArgs, keyPair);
    const operation = encodeOperation(operationArgs);

    return new Promise((resolve, reject) => {
      this.grpcClient.doPublish({ entry, operation },
        (err, nextArgs) => {
          err && reject(err);
          nextArgs && resolve(nextArgs);
        }
      );
    })
  }
}