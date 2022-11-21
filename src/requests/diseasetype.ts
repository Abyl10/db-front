import { api } from "./api";
import { IDiseaseType, IPostResponse } from "../ts/types";


export const getAllDiseaseTypes = (): Promise<IDiseaseType[]> =>
  api.get(`/diseasetypes`).then((res) => res.data);

export const createDiseaseType = (
  country: IDiseaseType
): Promise<IPostResponse> =>
  api.post(`/diseasetypes`, country).then((res) => res.data);

export const updateDiseaseType = (
  id: number, diseaseType: IDiseaseType
): Promise<IPostResponse> =>
  api.put(`/diseasetypes/${id}`, diseaseType).then((res) => res.data);

export const deleteDiseaseType = (id: number): Promise<IPostResponse> =>
  api.delete(`/diseasetypes/${id}`).then((res) => res.data);
