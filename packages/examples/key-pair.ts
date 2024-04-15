import { KeyPair } from 'p2panda-js';

const FILENAME = 'private-key.txt';

export async function getKeyPair() {
  const file = Bun.file(FILENAME);
  if (await file.exists()) {
    const privateKey = await file.text();
    return new KeyPair(privateKey);
  }
}

export async function createKeyPair() {
  const keyPair = new KeyPair();
  await Bun.write(FILENAME, keyPair.privateKey());
  return keyPair;
}
