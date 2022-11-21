import {api} from './api';
import {IDoctor, IPostResponse} from '../ts/types';

export const getAllDoctors = (): Promise<IDoctor[]> =>
    api.get(`/doctor`).then((res) => res.data);

export const createDoctor = (doctor: IDoctor): Promise<IPostResponse> =>
    api.post(`/doctor`, doctor).then((res) => res.data);

export const updateDoctor = (email: string, doctor: IDoctor): Promise<IPostResponse> =>
    api.put(`/doctor/${email}`, doctor).then((res) => res.data);

export const deleteDoctor = (email: string): Promise<IPostResponse> =>
    api.delete(`/doctor/${email}`).then((res) => res.data);
    