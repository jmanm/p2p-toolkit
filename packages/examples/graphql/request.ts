import { GraphQLClient, gql, RequestDocument } from 'graphql-request';
import { NextArgs } from '../models';
import { EasyValues, KeyPair, OperationFields, encodeOperation, signAndEncodeEntry } from 'p2panda-js';
import invariant from 'tiny-invariant';
import { AQUADOGGO_GQL_ENDPOINT } from '../constants';

const client = new GraphQLClient(AQUADOGGO_GQL_ENDPOINT);

export async function request<T>(query: RequestDocument, variables?: any): Promise<{ [key: string]: T } | undefined> {
  try {
    return await client.request(query, variables);
  } catch (error) {
    console.error(error);
  }
}

async function nextArgs(publicKey: string, viewId?: string): Promise<NextArgs | undefined> {
  const query = gql`
    query NextArgs($publicKey: String!, $viewId: String) {
      nextArgs(publicKey: $publicKey, viewId: $viewId) {
        logId
        seqNum
        backlink
        skiplink
      }
    }
  `;

  const result = await request<NextArgs>(query, {
    publicKey,
    viewId,
  });

  return result?.nextArgs;
}

async function publish(
  entry: string,
  operation: string,
): Promise<NextArgs> {
  const query = gql`
    mutation Publish($entry: String!, $operation: String!) {
      publish(entry: $entry, operation: $operation) {
        logId
        seqNum
        backlink
        skiplink
      }
    }
  `;

  const result = await request<NextArgs>(query, {
    entry,
    operation,
  });
  invariant(result, "Server didn't return a response");

  return result.publish;
}

export async function createItem(keyPair: KeyPair, model: EasyValues | OperationFields, schemaId: string) {
  const _nextArgs = await nextArgs(keyPair.publicKey());

  const operation = encodeOperation({
    schemaId,
    fields: model,
  });

  const entry = signAndEncodeEntry(
    {
      ..._nextArgs,
      operation,
    },
    keyPair,
  );

  return await publish(entry, operation);
}
