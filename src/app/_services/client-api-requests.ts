import { Route } from "../_types";
import { axiosClient } from "./common/axios-client";
import { getEndpointPathWith } from "./common/util";

export enum API_PATHS {
  /* I used https://api.restful-api.dev just to test the hook and it has /objects path. */
  login = "/accounts/login/",
  routes = "/routes/",
}

//TODO add zod validation and env.mjs for handling env vars
const getEndpointPath = getEndpointPathWith(
  process.env.NEXT_PUBLIC_MANY_ROADS_BACKEND as string
);

export const getAllRoutes = async () =>
  axiosClient.get<Route[]>(getEndpointPath(API_PATHS.routes));

export const getSingleRoute = async (id: string) =>
  axiosClient.get<Route>(getEndpointPath(`${API_PATHS.routes + id}`));

export const userLogIn = async (email: string, password: string) =>
  axiosClient.post(getEndpointPath(API_PATHS.login), { email, password });
