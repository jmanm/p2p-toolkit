import schemas from './schemas.json';

export const AQUADOGGO_GQL_ENDPOINT = 'http://0.0.0.0:2020/graphql';
export const AQUADOGGO_RPC_ENDPOINT = 'http://localhost:2021';

// Run `npm run schema` and paste the resulting schema ids into `schemas.json`
export const USER_SCHEMA_ID = schemas.user;
export const ORGANIZATION_SCHEMA_ID = schemas.organization;
