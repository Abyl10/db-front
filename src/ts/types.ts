export interface ICountry {
  cname: string;
  population: number;
}

export interface IDiseaseType {
  id: number;
  description: string;
}

export interface IDisease {
  disease_code: string;
  pathogen: string;
  description: string;
  id: number;
}

export interface IDiscover {
  cname: string;
  disease_code: string;
  first_enc_date: Date;
}

export interface IUsers {
  email: string;
  name: string;
  surname: string;
  salary: number;
  phone: string;
  cname: string;
}

export interface IPublicServant {
  email: string;
  department: string;
}

export interface IDoctor {
  email: string;
  degree: string;
}

export interface ISpecialize {
  id: number;
  email: string;
}

export interface IRecord {
  email: string;
  cname: string;
  disease_code: string;
  total_deaths: number;
  total_patients: number;
}

export interface IPostResponse {
  message: string;
  success: boolean;
}
