import type { EasyValues } from "p2panda-js";
import type { CollectionRequest as RpcCollectionRequest } from "./rpc/CollectionRequest";
import type { CollectionResponse as RpcCollectionResponse } from "./rpc/CollectionResponse";
import { Direction as RpcDirection } from "./rpc/Direction";
import type { Document as RpcDocument } from "./rpc/Document";
import type { DocumentMeta } from "./rpc/DocumentMeta";
import type { Field } from "./rpc/Field";
import type { FilterCondition as RpcFilterCondition } from "./rpc/FilterCondition";
import { FilterOperator as RpcFilterOperator } from "./rpc/FilterOperator";
import type { MetaFilter } from "./rpc/MetaFilter";

type Op = Uncapitalize<Exclude<RpcFilterOperator, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>>;

type FilterValue = {
  [op in Op]?: string | number | boolean | object | null
};

export type Filter<T> = {
  [prop in keyof T]?: FilterValue
};

export type FieldSelection<T> = {
  [prop in keyof T]: boolean
};

function getFieldVal(field: Field) {
  if (field.pinnedRelVal) {
    return buildObject(field.pinnedRelVal);
  }
  if (field.relVal) {
    return buildObject(field.relVal);
  }
  if (field.pinnedRelListVal) {
    return field.pinnedRelListVal.documents?.map(d => buildObject(d));
  }
  if (field.relListVal) {
    return field.relListVal.documents?.map(d => buildObject(d));
  }
  return field.stringVal ?? field.intVal ?? field.floatVal ?? field.byteVal ?? field.boolVal;
}

export function buildObject<T>(document?: RpcDocument | null): Document<T> | undefined {
  if (!document || !document?.fields || !document?.meta) {
    return undefined;
  }
  const fieldEntries: any = (document.fields ?? []).map(f => [
    f.name,
    getFieldVal(f)
  ]);
  return {
    meta: document.meta,
    cursor: document.cursor,
    fields: Object.fromEntries(fieldEntries) as DocumentFields<T>
  };
}

export function buildCollection<T>(collection: RpcCollectionResponse): CollectionResponse<T> {
  const { totalCount = 0, hasNextPage = false, endCursor, documents = [] } = collection;
  return {
    totalCount: Number(totalCount),
    hasNextPage,
    endCursor,
    documents: documents.map(doc => buildObject<T>(doc)).filter(d => d != null)
  }
}

type Dir = Exclude<RpcDirection, 0 | 1>;
export type SortDirection = Uncapitalize<Dir>;
type DocumentFields<T> = { [Prop in keyof T]: T[Prop] extends Date ? T[Prop] : T[Prop] extends object ? Document<T[Prop]> : T[Prop] };
export type PublishValue<T> = { [Prop in keyof T]: T[Prop] extends Date ? T[Prop] : T[Prop] extends object ? string : T[Prop] };

export interface Document<T> {
  meta: DocumentMeta;
  cursor?: string;
  fields: Partial<DocumentFields<T>>;
}

// TODO - map these types from Rpc types instead of redefining them
export interface DocumentRequest<T> {
  documentId?: string;
  documentViewId?: string;
  selections?: FieldSelection<T>;
}

export interface CollectionRequest<T> {
  schemaId?: string;
  filter?: Filter<T>;
  meta?: MetaFilter;
  orderBy?: keyof T;
  orderDirection?: SortDirection;
  first?: number;
  after?: string;
  selections?: FieldSelection<T>;
}

export interface CollectionResponse<T> {
  totalCount: number;
  hasNextPage: boolean;
  endCursor?: string;
  documents: Document<T>[];
}

function toRpcOperator(operator: Op): RpcFilterOperator {
  switch (operator) {
    case 'contains': return 'Contains';
    case 'notContains': return 'NotContains';
    case 'eq': return 'Eq';
    case 'notEq': return 'NotEq';
    case 'gt': return 'Gt';
    case 'gte': return 'Gte';
    case 'in': return 'In';
    case 'notIn': return 'NotIn';
    case 'lt': return 'Lt';
    case 'lte': return 'Lte';
  }
  return 'Eq';
}

function toRpcFilterCondition(operator: string, value: any): RpcFilterCondition {
  const op = toRpcOperator(operator as Op);
  switch (typeof value) {
    case 'number': return Number.isInteger(value) ? { operator: op, intVal: value } : { operator: op, floatVal: value };
    // case 'bigint': return { operator: op, floatVal: value }; // TODO - handle bigints
    case 'string': return { operator: op, stringVal: value };
    case 'boolean': return { operator: op, boolVal: value };
    case 'object': return { operator: op, relVal: value };
  }
  return { operator: op, stringVal: undefined };
}

function toRpcFilter<T>(filter?: Filter<T>): { [key: string]: RpcFilterCondition } | undefined {
  if (!filter) {
    return undefined;
  }
  const entries = Object.entries(filter).map(([key, value]) => {
    if (value) {
      const [op, val] = Object.entries(value)[0];
      return [key, toRpcFilterCondition(op, val)];
    }
    return [key, null];
  });
  return Object.fromEntries(entries);
}

function toRpcSortDirection(direction?: SortDirection): RpcDirection | undefined {
  switch (direction) {
    case 'ascending': return RpcDirection.Ascending;
    case 'descending': return RpcDirection.Descending;
  }
  return undefined;
}

export function toRpcCollectionRequest<T>(req: CollectionRequest<T>): RpcCollectionRequest {
  const { filter, orderBy, orderDirection, ...rest } = req;
  return {
    filter: toRpcFilter(filter),
    orderBy: orderBy as string,
    orderDirection: toRpcSortDirection(orderDirection),
    ...rest
  };
}