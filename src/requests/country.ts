import { api } from "./api";
import { ICountry, IPostResponse } from "../ts/types";

export const getAllCountries = (): Promise<ICountry[]> =>
  api.get(`/country`).then((res) => res.data);

export const createCountry = (country: ICountry): Promise<IPostResponse> =>
  api.post(`/country`, country).then((res) => res.data);

export const updateCountry = (country: ICountry): Promise<IPostResponse> =>
  api.put(`/country`, country).then((res) => res.data);

export const deleteCountry = (cname: string): Promise<IPostResponse> =>
  api.delete(`/country/${cname}`).then((res) => res.data);

export const getCountryNames = (): Promise<string[]> =>
  api.get(`/countrynamelist`).then((res) => res.data);
