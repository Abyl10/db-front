import { api } from "./api";
import { IPostResponse, IUsers } from "../ts/types";

export const getAllUsers = (): Promise<IUsers[]> =>
  api.get(`/users`).then((res) => res.data);

export const createUser = (user: IUsers): Promise<IPostResponse> =>
  api.post(`/users`, user).then((res) => res.data);

export const deleteUser = (email: string): Promise<IPostResponse> =>
  api.delete(`/users/${email}`).then((res) => res.data);
