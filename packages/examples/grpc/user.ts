import invariant from "tiny-invariant";
import { createKeyPair } from "../key-pair";
import { SearchResponse, User } from "../models";
import { OperationFields } from "p2panda-js";
import { USER_SCHEMA_ID } from "../constants";
import { createItem, getCollection, getDocument } from "./request";
import { Document } from "@p2p-toolkit/toolkit";

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

export async function getUserByDocumentId(documentId: string) {
  const doc = await getDocument({ documentId });
  return buildObject(doc.document ?? {});
}

const buildObject = (document: Document) => ({
  meta: document.meta,
  fields: Object.fromEntries((document.fields ?? []).map(f => [
    f.name,
    f.relVal ? buildObject(f.relVal) : f.stringVal
  ]))
});

export async function getUsers(first: number): Promise<SearchResponse<User>> {
  const result = await getCollection({ schemaId: USER_SCHEMA_ID, pagination: { first } });
  invariant(result.documents);
  const documents = result.documents.map(d => buildObject(d.document ?? {}));
  return { documents };
}