import { createItem, request } from "./request";
import { ORGANIZATION_SCHEMA_ID } from "../constants";
import { gql } from "graphql-request";
import { Organization, OrganizationResponse, SearchResponse } from "../models";
import invariant from "tiny-invariant";
import { StringOp } from "../common";
import { KeyPair } from 'p2panda-js';

type OrganizationFilter = {
  [Property in keyof Organization]?: { [key in StringOp]?: string }
}

export async function createOrganization(value: Organization, owner: KeyPair ) {
  const { backlink } = await createItem(owner, value, ORGANIZATION_SCHEMA_ID);
  invariant(backlink, 'No back link returned');

  const organization = {
    meta: {
      documentId: backlink
    },
    fields: value
  };

  console.log('Created organization!', backlink);

  return organization;
}

export async function getOrganization(
  documentId: string,
): Promise<OrganizationResponse | undefined> {
  const query = gql`{
    organization: ${ORGANIZATION_SCHEMA_ID}(id: "${documentId}") {
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

  const result = await request<OrganizationResponse>(query);
  return result?.organization;
}

export async function findOrganization(filter: OrganizationFilter) {
  const query = gql`
    query searchOrganizations($filter:${ORGANIZATION_SCHEMA_ID}Filter) {
      organization: all_${ORGANIZATION_SCHEMA_ID}(filter:$filter) {
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

  const result = await request<SearchResponse<Partial<Organization>>>(query, { filter });
  return result?.organization?.documents;
}

export async function getOrganizationByOwner(ownerPubKey: string) {
  const query = gql`
    query getOrganization($owner: String!) {
      organization: all_${ORGANIZATION_SCHEMA_ID}(meta: {
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

  const result = await request<SearchResponse<Partial<Organization>>>(query, { owner: ownerPubKey });
  const docs = result?.organization?.documents ?? [];
  invariant(docs.length <= 1, `Query returned ${docs.length} results`);
  return docs[0]?.fields;
}
