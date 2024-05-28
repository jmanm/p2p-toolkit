import type { CollectionRequest as RpcCollectionRequest } from "./rpc/CollectionRequest";
import { Direction as RpcDirection } from "./rpc/Direction";
import type { Document } from "./rpc/Document";
import type { Field } from "./rpc/Field";
import type { FilterCondition as RpcFilterCondition } from "./rpc/FilterCondition";
import { FilterOperator, FilterOperator as RpcFilterOperator } from "./rpc/FilterOperator";
import type { MetaFilter } from "./rpc/MetaFilter";

type Op = Uncapitalize<Exclude<RpcFilterOperator, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>>;

type FilterValue = {
  [op in Op]?: string | number | boolean | null
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
    buildObject(field.relVal);
  }
  if (field.pinnedRelListVal) {
    return field.pinnedRelListVal.documents?.map(d => buildObject(d));
  }
  if (field.relListVal) {
    return field.relListVal.documents?.map(d => buildObject(d));
  }
  return field.stringVal ?? field.intVal ?? field.floatVal ?? field.byteVal ?? field.boolVal;
}

export function buildObject(document?: Document) {
  if (!document || !document?.fields) {
    return undefined;
  }
  const fieldEntries: any = (document.fields ?? []).map(f => [
    f.name,
    getFieldVal(f)
  ]);
  return {
    meta: document.meta,
    fields: Object.fromEntries(fieldEntries)
  };
}

type Dir = Exclude<RpcDirection, 0 | 1>;
export type SortDirection = Uncapitalize<Dir>;

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
    case 'number': return Number.isInteger(value) ? { [op]: { intVal: value } } : { [op]: { floatVal: value }};
    case 'bigint': return { [op]: { floatVal: value } }; // TODO - handle bigints
    case 'string': return { [op]: { stringVal: value } };
    case 'boolean': return { [op]: { boolVal: value } };
    case 'object': return { [op]: { relVal: value } };
  }
  return { [op]: { stringVal: null } };
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