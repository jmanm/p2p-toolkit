import invariant from "tiny-invariant";
import { CUSTOMER_SCHEMA_ID } from "../constants";
import type { Customer } from "../models";
import { KeyPair } from 'p2panda-js';
import { createItem } from "./request";

export async function createCustomer(value: Customer, owner: KeyPair ) {
  const { backlink } = await createItem(owner, value, CUSTOMER_SCHEMA_ID);
  invariant(backlink, 'No back link returned');

  const customer = {
    meta: {
      documentId: backlink
    },
    fields: value
  };

  console.log('Created customer!', backlink);

  return customer;
}

