import { ChannelCredentials } from "@grpc/grpc-js";
import { AquadoggoClient } from "./AquadoggoClient.js";

async function main() {
    const client = await AquadoggoClient.load({
      credentials: ChannelCredentials.createInsecure(),
      protoFilePath: '../p2panda/aquadoggo/aquadoggo/proto/rpc.proto',
      serverUrl: 'localhost:2021' // omit 'http'
    });

    const doc = await client.getDocument({ documentId: '002000185bb22277e1acf0f1d944d9e713fb3a98b90e85a6e9e3fdefa6db710242bb' });
    console.log('DOC', doc);
    client.dispose();
  }

  await main();