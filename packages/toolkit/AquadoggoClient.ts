import { loadPackageDefinition, ChannelCredentials } from "@grpc/grpc-js";
import { load as loadProto } from '@grpc/proto-loader';
import type { ProtoGrpcType } from "./rpc";
import type { ConnectClient } from "./rpc/Connect";
import { KeyPair, OperationFields, encodeOperation, signAndEncodeEntry, type EasyValues, type EntryArgs } from "p2panda-js";
import type { NextArgsResponse } from "./rpc/NextArgsResponse";
import { buildCollection, buildObject, toRpcCollectionRequest, type CollectionRequest, type CollectionResponse, type Document, type DocumentRequest } from "./queries";

const HASH_LEN = 68;

export interface ClientOptions {
  serverUrl: string;
  protoFilePath?: string;
  credentials: ChannelCredentials;
}

export class AquadoggoClient {
  protected constructor(private grpcClient: ConnectClient) { }

  static async load(options: ClientOptions) {
    const def = await loadProto(options.protoFilePath ?? './proto/rpc.proto');
    const { rpc } = loadPackageDefinition(def) as unknown as ProtoGrpcType;
    const client = new rpc.Connect(options.serverUrl, options.credentials);
    return new AquadoggoClient(client);
  }

  dispose() {
    this.grpcClient.close();
  }

  async doPublish({ model, keyPair, schemaId, nextArgs, action, documentViewId }: {
    model?: OperationFields | EasyValues,
    keyPair: KeyPair,
    schemaId: string,
    documentViewId?: string,
    nextArgs?: NextArgsResponse,
    action?: 'create' | 'delete' | 'update'
  }): Promise<NextArgsResponse> {
    if (!nextArgs) {
      nextArgs = await this.nextArgs(keyPair.publicKey(), documentViewId);
    }
    action ??= 'create';

    if (action !== 'delete' && !model) {
      throw new Error('Model is required for create and update actions');
    }

    const operation = encodeOperation({
      schemaId,
      previous: documentViewId,
      fields: model,
      action
    });
    const entryArgs = {
      ...nextArgs,
      operation,
    } as EntryArgs;
    const entry = signAndEncodeEntry(entryArgs, keyPair);

    return new Promise((resolve, reject) => {
      this.grpcClient.doPublish({ entry, operation },
        (err, newNextArgs) => {
          err && reject(err);
          newNextArgs && resolve(newNextArgs);
        }
      );
    });
  }

  async getCollection<T>(request: CollectionRequest<T>): Promise<CollectionResponse<T>> {
    if (!request.schemaId || request.schemaId.length < HASH_LEN) {
      throw new Error('Missing or malformed schema ID');
    }

    const rpcRequest = toRpcCollectionRequest<T>(request);
    return new Promise((resolve, reject) => {
      this.grpcClient.getCollection(rpcRequest,
        (err, coll) => {
          err && reject(err);
          coll && resolve(buildCollection<T>(coll));
        }
      );
    });
  }

  async getDocument<T>({ documentId, documentViewId, selections }: DocumentRequest<T>): Promise<Document<T> | undefined> {
    if ((!documentId || documentId.length < HASH_LEN) &&
      (!documentViewId || documentViewId.length < HASH_LEN)
    ) {
      throw new Error('Missing or malformed document ID and/or document view ID');
    }

    return new Promise((resolve, reject) => {
      this.grpcClient.getDocument({ documentId, documentViewId, selections },
        (err, doc) => {
          err && reject(err);
          doc && resolve(buildObject<T>(doc?.document));
        }
      );
    });
  }

  async nextArgs(publicKey: string, documentViewId?: string): Promise<NextArgsResponse> {
    if (!publicKey) {
      throw new Error('No public key provided');
    }

    return new Promise((resolve, reject) => {
      this.grpcClient.getNextArgs({ publicKey, documentViewId },
        (err, args) => {
          err && reject(err);
          args && resolve(args);
        }
      );
    });
  }
}