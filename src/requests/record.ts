import { api } from "./api";
import { IRecord, IPostResponse } from "../ts/types";

export const getAllRecords = (): Promise<IRecord[]> =>
  api.get(`/record`).then((res) => res.data);

export const createRecord = (record: IRecord): Promise<IPostResponse> =>
  api.post(`/record`, record).then((res) => res.data);

export const updateRecord = (
  cname: string,
  record: IRecord
): Promise<IPostResponse> =>
  api.put(`/record/${cname}`, record).then((res) => res.data);

export const deleteRecord = (cname: string): Promise<IPostResponse> =>
  api.delete(`/record/${cname}`).then((res) => res.data);
