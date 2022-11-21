import { api } from "./api";
import { IDiscover, IPostResponse } from "../ts/types";

export const getAllDiscover = (): Promise<IDiscover[]> =>
  api.get(`/discover`).then((res) => res.data);

export const createDiscover = (discover: IDiscover): Promise<IPostResponse> =>
  api.post(`/discover`, discover).then((res) => res.data);
