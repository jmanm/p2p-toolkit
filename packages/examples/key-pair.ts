import { KeyPair } from 'p2panda-js';
import { readFile, writeFile } from 'node:fs/promises';

const FILENAME = 'private-key.txt';

export async function getKeyPair() {
  const privateKey = await readFile(FILENAME, 'utf8');
  return new KeyPair(privateKey);
}

export async function createKeyPair() {
  const keyPair = new KeyPair();
  await writeFile(FILENAME, keyPair.privateKey(), 'utf8');
  return keyPair;
}
