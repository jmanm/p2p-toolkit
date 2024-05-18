import { Organization, User } from "./models";
import { faker } from '@faker-js/faker';
import { createOrganization as gqlCreateOrganization } from "./graphql/organization";
import { getUsers, createUser as gqlCreateUser, getUserByDocumentId as gqlGetUser, getUsers as gqlGetusers } from "./graphql/user";
import { createOrganization as rpcCreateOrganization } from "./grpc/organization";
import { createUser as rpcCreateUser, getUserByDocumentId as rpcGetUser, getUsers as rpcGetUsers } from "./grpc/user";
import { KeyPair } from 'p2panda-js';
import { argv } from "bun";
import { createKeyPair, getKeyPair } from "./key-pair";
import invariant from "tiny-invariant";
import { cleanup, init } from "./grpc/request";

enum ReqType { 'graphql', 'grpc' };

function createOrganization(owner: KeyPair, reqType: ReqType) {
  const name = faker.company.name();
  const url = `${name.replaceAll(' ', '')}.com`;
  const data: Organization = {
    name,
    email: `info@${url}`,
    phone: faker.phone.number(),
    url,
    taxId: faker.string.numeric(10)
  };
  return reqType === ReqType.graphql ?
    gqlCreateOrganization(data, owner) :
    rpcCreateOrganization(data, owner);
}

async function createUser(memberOf: string, reqType: ReqType) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const data: User = {
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }),
    memberOf,
    nostrPubKey: faker.string.alphanumeric(64),
    phone: faker.phone.number(),
    pubKey: ''
  };
  const user = reqType === ReqType.graphql ?
    await gqlCreateUser(data) :
    await rpcCreateUser(data);

  console.log('Created user!', user.meta.documentId);
  return user;
}

async function createUserList(count: number, reqType: ReqType) {
  const keyPair = await getKeyPair() ?? await createKeyPair();
  const organization = await createOrganization(keyPair, reqType);
  invariant(organization, 'No organization created');
  for (let i = 0; i < count; i++) {
    await createUser(organization?.meta.documentId, reqType);
  }
}

async function getUser(docId: string, reqType: ReqType) {
  const user = reqType === ReqType.graphql ?
    await gqlGetUser(docId) :
    await rpcGetUser(docId);
  console.log('Got', user?.fields.name);
  return user;
}

async function getNUsers(limit: number, reqType: ReqType) {
  const result = reqType === ReqType.graphql ?
    await gqlGetusers(limit) :
    await rpcGetUsers(limit);

  const users: User[] = [];
  for (const doc of result.documents) {
    const user = await getUser(doc.meta.documentId, reqType);
    invariant(user, 'User not found!');
    users.push(user.fields as User);
  }

  return users;
}

async function runBenchmark() {
  const command = argv[2];
  const reqType = argv[3];
  invariant(reqType in ReqType, `${reqType} is an invalid request type`);
  const arg = argv[4];

  if (reqType === 'grpc') {
    await init();
  }

  switch (command) {
    case 'create': {
      const count = Number(arg);
      invariant(count, 'invalid count');
      await createUserList(count, ReqType[reqType]);
      break;
    }
    case 'get-one': {
      const limit = Number(arg);
      invariant(limit, 'invalid limit');
      await getNUsers(limit, ReqType[reqType]);
      break;
    }
    case 'get-many': {
      const limit = Number(arg);
      invariant(limit, 'invalid limit');
      await getUsers(limit);
      break;
    }
  }

  if (reqType === 'grpc') {
    cleanup();
  }
}

await runBenchmark();

/*
  Benchmark 1: bun run bench:create grpc 10
  Time (mean ± σ):     288.0 ms ±  14.6 ms    [User: 350.1 ms, System: 54.5 ms]
  Range (min … max):   276.5 ms … 325.3 ms    10 runs
*/