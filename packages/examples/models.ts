type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type NextArgs = {
  logId: string;
  seqNum: string;
  backlink?: string;
  skiplink?: string;
};

export type Meta = {
  viewId?: string;
  documentId: string;
};

export type SearchResponse<T> = {
  documents: {
    meta: {
      documentId: string,
      viewId?: string,
    },
    fields: T
  }[]
}

export type Contact = {
  name: string;
  email: string;
  phone: string;
}

export type Customer = Contact & {
  taxId: string;
  url: string;
}

export type User = Contact & {
  memberOf: string;
  pubKey: string;
  nostrPubKey: string;
}

export type UserResponse = {
  meta: Meta;
  fields: User;
}

export type CustomerResponse = {
  meta: Meta;
  fields: Overwrite<Customer, { users?: UserResponse[] }>;
}
