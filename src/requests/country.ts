import { api } from "./api";
import { ICountry } from "../ts/types";

export const getAllCountries = (): Promise<ICountry[]> =>
  api.get(`/country`).then((res) => res.data);
