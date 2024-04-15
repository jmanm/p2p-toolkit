import invariant from "tiny-invariant";
import { createKeyPair } from "../key-pair";
import { User } from "../models";
import { OperationFields } from "p2panda-js";
import { USER_SCHEMA_ID } from "../constants";
import { createItem } from "./request";

export async function createUser(value: Omit<User, 'pubKey'>) {
  const keyPair = await createKeyPair();
  const model = {
    ...value,
    pubKey: keyPair.publicKey()
  };

  const { memberOf, ...rest } = model;

  const fields = new OperationFields(rest as any);
  fields.insert('memberOf', 'relation', memberOf);

  const { backlink } = await createItem(keyPair, fields, USER_SCHEMA_ID);
  invariant(backlink, 'No back link returned');

  const user = {
    meta: {
      documentId: backlink
    },
    fields: model
  };

  console.log('Created user!', backlink);

  return user;
}
