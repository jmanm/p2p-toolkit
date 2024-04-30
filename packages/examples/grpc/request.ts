import { AquadoggoClient, ChannelCredentials, CollectionRequest, DocumentRequest } from '@p2p-toolkit/toolkit';
import { EasyValues, KeyPair, OperationFields } from 'p2panda-js';
import { AQUADOGGO_RPC_ENDPOINT } from '../constants';

let client: AquadoggoClient;

export async function init() {
  client = await AquadoggoClient.load({
    credentials: ChannelCredentials.createInsecure(),
    protoFilePath: '../p2panda/aquadoggo/aquadoggo/proto/rpc.proto',
    serverUrl: AQUADOGGO_RPC_ENDPOINT
  });
}

export function cleanup() {
  client.dispose();
}

export const createItem = (keyPair: KeyPair, model: EasyValues | OperationFields, schemaId: string) =>
  client.doPublish({ keyPair, model, schemaId });

export const getDocument = (request: DocumentRequest) =>
  client.getDocument(request);

export const getCollection = (request: CollectionRequest) =>
  client.getCollection(request);