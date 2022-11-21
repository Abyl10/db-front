import React from "react";
import {
  DiseaseType,
  Country,
  Doctor,
  Disease,
  PublicServant,
  Users,
  Record,
  Specialize,
  Discover,
} from "../pages";

interface IRoute {
  path: string;
  component: React.ReactElement;
}

export const ROUTES: IRoute[] = [
  {
    path: "/diseasetype",
    component: <DiseaseType />,
  },
  {
    path: "/country",
    component: <Country />,
  },
  {
    path: "/discover",
    component: <Discover />,
  },
  {
    path: "/doctor",
    component: <Doctor />,
  },
  {
    path: "/disease",
    component: <Disease />,
  },
  {
    path: "/publicservant",
    component: <PublicServant />,
  },
  {
    path: "/users",
    component: <Users />,
  },
  {
    path: "/record",
    component: <Record />,
  },
  {
    path: "/specialize",
    component: <Specialize />,
  },
];
