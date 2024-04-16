import invariant from "tiny-invariant";
import { ORGANIZATION_SCHEMA_ID } from "../constants";
import type { Organization } from "../models";
import { KeyPair } from 'p2panda-js';
import { createItem } from "./request";

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

