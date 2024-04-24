import { init, cleanup } from "./grpc/request";
import { getUserByDocumentId, getUsers } from "./grpc/user";

export {
  cleanup,
  init,
  getUserByDocumentId,
  getUsers
}