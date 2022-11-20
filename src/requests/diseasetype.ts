import { api } from "./api";
import { IDiseaseType } from "../ts/types";

interface IPostResponse {
  message: string;
  success: boolean;
}

export const getAllDiseaseTypes = (): Promise<IDiseaseType[]> =>
  api.get(`/diseasetypes`).then((res) => res.data);

export const createDiseaseType = (
  country: IDiseaseType
): Promise<IPostResponse> =>
  api.post(`/diseasetypes`, country).then((res) => res.data);

export const updateDiseaseType = (
  country: IDiseaseType
): Promise<IPostResponse> =>
  api.put(`/diseasetypes`, country).then((res) => res.data);

export const deleteDiseaseType = (id: number): Promise<IPostResponse> =>
  api.delete(`/diseasetypes/${id}`).then((res) => res.data);
