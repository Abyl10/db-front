import { api } from "./api";
import { ICountry } from "../ts/types";
import country from "../pages/Country/Country";

interface IPostResponse {
  message: string;
  success: boolean;
}

export const getAllCountries = (): Promise<ICountry[]> =>
  api.get(`/country`).then((res) => res.data);

export const createCountry = (country: ICountry): Promise<IPostResponse> =>
  api.post(`/country`, country).then((res) => res.data);

export const updateCountry = (country: ICountry): Promise<IPostResponse> =>
  api.put(`/country`, country).then((res) => res.data);

export const deleteCountry = (cname: string): Promise<IPostResponse> =>
  api.delete(`/country/${cname}`).then((res) => res.data);
