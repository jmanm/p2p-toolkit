import { loadPackageDefinition, ChannelCredentials, CallCredentials, Metadata } from "@grpc/grpc-js";
import { load as loadProto } from '@grpc/proto-loader';
import type { ProtoGrpcType } from "./rpc";
import type { ConnectClient } from "./rpc/Connect";
import { KeyPair, OperationFields, encodeOperation, signAndEncodeEntry, type EasyValues, type EntryArgs } from "p2panda-js";
import type { NextArgsResponse } from "./rpc/NextArgsResponse";
import { buildCollection, buildObject, toRpcCollectionRequest, type CollectionRequest, type CollectionResponse, type Document, type DocumentRequest } from "./queries";
import type { CallMetadataGenerator } from "@grpc/grpc-js/build/src/call-credentials";
import os from 'os';
import { SignJWT } from 'jose';
import { createPrivateKey, createPublicKey, KeyObject } from "crypto";

const HASH_LEN = 68;

export interface ClientOptions {
  keyPair: KeyPair,
  serverUrl: string;
  protoFilePath?: string;
  credentials: ChannelCredentials;
}

export class AquadoggoClient {
  private jwtPrivateKey: KeyObject;

  protected constructor(private rootKeyPair: KeyPair, private grpcClient: ConnectClient) {
    // https://stackoverflow.com/questions/68612396/sign-and-verify-jws-json-web-signature-with-ed25519-keypair?rq=3
    const pubKeyBuff = Buffer.from(this.rootKeyPair.publicKey(), 'hex');
    const priKeyBuff = Buffer.from(this.rootKeyPair.privateKey(), 'hex');
    this.jwtPrivateKey = createPrivateKey({
      key: {
        kty: 'OKP',
        crv: 'Ed25519',
        x: pubKeyBuff.toString('base64url'),
        d: priKeyBuff.toString('base64url')
      },
      format: 'jwk'
    });
  }

  private async generateToken() {
    const payload = {
      // TODO - find method to fingerprint devices
      mac: os.networkInterfaces().eth0?.at(0)?.mac,
      hostname: os.hostname(),
      timestamp: new Date().getTime()
    };

    return new SignJWT(payload).setProtectedHeader({ alg: 'EdDSA' }).sign(this.jwtPrivateKey);
  }

  private getRequestMetadata: CallMetadataGenerator = (options, cb) => {
    this.generateToken().then(token => {
      const meta = new Metadata();
      meta.add('pubKey', this.rootKeyPair.publicKey());
      meta.add('token', token);
      cb(null, meta);
    });
  }

  private credentials = CallCredentials.createFromMetadataGenerator(this.getRequestMetadata);

  static async load(options: ClientOptions) {
    const def = await loadProto(options.protoFilePath ?? './proto/connect.proto');
    const { rpc } = loadPackageDefinition(def) as unknown as ProtoGrpcType;
    const client = new rpc.Connect(options.serverUrl, options.credentials);
    return new AquadoggoClient(options.keyPair, client);
  }

  dispose() {
    this.grpcClient.close();
  }

  async publish({ model, keyPair, schemaId, nextArgs, action, documentViewId }: {
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
      this.grpcClient.publish(
        { entry, operation },
        { credentials: this.credentials },
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
        { credentials: this.credentials },
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
      this.grpcClient.getDocument(
        { documentId, documentViewId, selections },
        { credentials: this.credentials },
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
      this.grpcClient.getNextArgs(
        { publicKey, documentViewId },
        { credentials: this.credentials },
        (err, args) => {
          err && reject(err);
          args && resolve(args);
        }
      );
    });
  }
}
