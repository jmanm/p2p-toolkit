import { createKeyPair, getKeyPair } from "../key-pair";
import { createItem, request } from "./request";
import { USER_SCHEMA_ID } from "../constants";
import { OperationFields } from "p2panda-js";
import { SearchResponse, User } from "../models";
import { StringOp } from "../common";
import { gql } from "graphql-request";
import invariant from "tiny-invariant";

type UserFilter = {
  [Property in keyof User]?: { [key in StringOp]?: string }
}

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

export async function findUsers(filter: UserFilter) {
  const query = gql`
    query searchUsers($filter:${USER_SCHEMA_ID}Filter) {
      user: all_${USER_SCHEMA_ID}(filter:$filter) {
        documents {
          meta {
            documentId
          }
          fields {
            name
            email
            phone
          }
        }
      }
    }`;

  const result = await request<SearchResponse<Partial<User>>>(query, { filter });
  return result?.user?.documents;
}

export async function currentUser() {
  const keyPair = await getKeyPair();
  if (keyPair) {
    return await getUserByPublicKey(keyPair.publicKey());
  }
}

export async function getUserByPublicKey(pubKey: string) {
  const results = await findUsers({
    pubKey: {
      eq: pubKey
    }
  });

  if (results?.length) {
    return results[0];
  }
}