import { Customer, User } from "./models";
import { faker } from '@faker-js/faker';
import { createCustomer as gqlCreateCustomer } from "./graphql/customer";
import { createUser as gqlCreateUser } from "./graphql/user";
import { createCustomer as rpcCreateCustomer } from "./grpc/customer";
import { createUser as rpcCreateUser } from "./grpc/user";
import { KeyPair } from 'p2panda-js';
import { argv } from "bun";
import { createKeyPair, getKeyPair } from "./key-pair";
import invariant from "tiny-invariant";
import { cleanup, init } from "./grpc/request";

enum ReqType { 'graphql', 'grpc' };

function createCustomer(owner: KeyPair, reqType: ReqType) {
  const name = faker.company.name();
  const url = `${name.replaceAll(' ', '')}.com`;
  const data: Customer = {
    name,
    email: `info@${url}`,
    phone: faker.phone.number(),
    url,
    taxId: faker.string.numeric(10)
  };
  return reqType === ReqType.graphql ?
    gqlCreateCustomer(data, owner) :
    rpcCreateCustomer(data, owner);
}

function createUser(memberOf: string, reqType: ReqType) {
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
  return reqType === ReqType.graphql ?
    gqlCreateUser(data) :
    rpcCreateUser(data);
}

async function createUserList(count: number, reqType: ReqType) {
  const keyPair = await getKeyPair() ?? await createKeyPair();
  const customer = await createCustomer(keyPair, reqType);
  invariant(customer, 'No customer created');
  for (let i = 0; i < count; i++) {
    await createUser(customer?.meta.documentId, reqType);
  }
}

async function main() {
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
      console.log('Creating', count, 'users using', reqType);
      await createUserList(count, ReqType[reqType]);
    }
  }

  if (reqType === 'grpc') {
    cleanup();
  }
}

await main();

/*
  Benchmark 1: bun bench:create graphql 1000
  Time (mean ± σ):      3.677 s ±  0.646 s    [User: 0.949 s, System: 0.312 s]
  Range (min … max):    2.584 s …  4.515 s    10 runs

  Benchmark 1: bun bench:create grpc 1000
  Time (mean ± σ):      5.496 s ±  0.393 s    [User: 1.338 s, System: 0.469 s]
  Range (min … max):    4.948 s …  6.084 s    10 runs

  Benchmark 1: bun bench:create graphql 1000
  Time (mean ± σ):      7.188 s ±  0.447 s    [User: 1.220 s, System: 0.520 s]
  Range (min … max):    6.544 s …  7.816 s    10 runs
*/