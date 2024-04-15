import { AquadoggoClient, ChannelCredentials } from 'p2p-toolkit';
import { EasyValues, KeyPair, OperationFields } from 'p2panda-js';

let client: AquadoggoClient;

export async function init() {
  client = await AquadoggoClient.load({
    credentials: ChannelCredentials.createInsecure(),
    protoFilePath: '../p2panda/aquadoggo/aquadoggo/proto/rpc.proto',
    serverUrl: 'localhost:2021' // omit 'http'
  });
}

export function cleanup() {
  client.dispose();
}

export function createItem(keyPair: KeyPair, model: EasyValues | OperationFields, schemaId: string) {
  return client.doPublish({ keyPair, model, schemaId });
}
