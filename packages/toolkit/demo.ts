import { ChannelCredentials } from "@grpc/grpc-js";
import { AquadoggoClient } from "./AquadoggoClient";

async function main() {
    const client = await AquadoggoClient.load({
      credentials: ChannelCredentials.createInsecure(),
      protoFilePath: '../p2panda/aquadoggo/aquadoggo/proto/rpc.proto',
      serverUrl: 'localhost:2021' // omit 'http'
    });

    const doc = await client.getDocument({ documentId: '0020a5c1c397b6f515f5df7f80c4d821fd0a70f098b9b3c3c1a06934ad638eea87aa' });
    console.log('DOC', doc);
    client.dispose();
  }

  await main();