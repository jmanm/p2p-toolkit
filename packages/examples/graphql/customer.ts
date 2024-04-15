import { createItem, request } from "./request";
import { CUSTOMER_SCHEMA_ID } from "../constants";
import { gql } from "graphql-request";
import { Customer, CustomerResponse, SearchResponse } from "../models";
import invariant from "tiny-invariant";
import { StringOp } from "../common";
import { KeyPair } from 'p2panda-js';

type CustomerFilter = {
  [Property in keyof Customer]?: { [key in StringOp]?: string }
}

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

export async function getCustomer(
  documentId: string,
): Promise<CustomerResponse | undefined> {
  const query = gql`{
    customer: ${CUSTOMER_SCHEMA_ID}(id: "${documentId}") {
      meta {
        documentId
        viewId
      }
      fields {
        pub_key
        name
        contact {
          email
          taxId
          url
          phone
          nostr_pub_key
        }
      }
    }
  }`;

  const result = await request<CustomerResponse>(query);
  return result?.customer;
}

export async function findCustomers(filter: CustomerFilter) {
  const query = gql`
    query searchCustomers($filter:${CUSTOMER_SCHEMA_ID}Filter) {
      customer: all_${CUSTOMER_SCHEMA_ID}(filter:$filter) {
        documents {
          meta {
            documentId
          }
          fields {
            name
          }
        }
      }
    }`;

  const result = await request<SearchResponse<Partial<Customer>>>(query, { filter });
  return result?.customer?.documents;
}

export async function getCustomerByOwner(ownerPubKey: string) {
  const query = gql`
    query getCustomer($owner: String!) {
      customer: all_${CUSTOMER_SCHEMA_ID}(meta: {
        owner: { eq: $owner }
      }) {
        documents {
          meta {
            documentId
            viewId
          }
          fields {
            name
          }
        }
      }
    }`;

  const result = await request<SearchResponse<Partial<Customer>>>(query, { owner: ownerPubKey });
  const docs = result?.customer?.documents ?? [];
  invariant(docs.length <= 1, `Query returned ${docs.length} results`);
  return docs[0]?.fields;
}
