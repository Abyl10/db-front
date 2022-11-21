import {api} from "./api";
import {ISpecialize} from "../ts/types";

export const getAllSpecializes = (): Promise<ISpecialize[]> =>
    api.get(`/specialize`).then((res) => res.data);