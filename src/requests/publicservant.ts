import { api } from "./api";
import { IPublicServant, IPostResponse } from "../ts/types";

export const getAllPublicServants = (): Promise<IPublicServant[]> =>
  api.get(`/publicservant`).then((res) => res.data);

export const createPublicServant = (publicservant : IPublicServant): Promise<IPostResponse> =>
    api.post(`/publicservant`, publicservant).then((res) => res.data);

export const updatePublicServant = (email: string, publicservant : IPublicServant): Promise<IPostResponse> =>
    api.put(`/publicservant/${email}`, publicservant).then((res) => res.data);

export const deletePublicServant = (email: string): Promise<IPostResponse> =>
    api.delete(`/publicservant/${email}`).then((res) => res.data);