import { loadPackageDefinition, ChannelCredentials } from "@grpc/grpc-js";
import { load as loadProto } from '@grpc/proto-loader';
import type { ProtoGrpcType } from "./rpc";
import type { ConnectClient } from "./rpc/Connect";

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

  async getDocument(documentId: string) {
    return new Promise((resolve, reject) => {
      const call = this.grpcClient.getDocument({ documentId },
        (err, doc) => {
          err && reject(err);
          doc && resolve(doc);
        }
      );
    });
  }
}