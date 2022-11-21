import {api} from "./api";
import {IDisease, IPostResponse} from "../ts/types";



export const getAllDiseases = (): Promise<IDisease[]> =>
    api.get(`/disease`).then((res) => res.data);

export const createDisease = (disease: IDisease): Promise<IPostResponse> =>
    api.post(`/disease`, disease).then((res) => res.data);

export const updateDisease = (disease: IDisease): Promise<IPostResponse> =>
    api.put(`/disease`, disease).then((res) => res.data);

export const deleteDisease = (disease_code: string): Promise<IPostResponse> =>
    api.delete(`/disease/${disease_code}`).then((res) => res.data);

export const getDiseaseCodes = (): Promise<string[]> =>
    api.get(`/diseasecodelist`).then((res) => res.data);