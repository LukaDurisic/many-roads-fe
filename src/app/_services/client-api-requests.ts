import { axiosClient } from "./common/axios-client";
import { getEndpointPathWith } from "./common/util";

export enum API_PATHS {
  /* I used https://api.restful-api.dev just to test the hook and it has /objects path */
  tours = "/objects",
  login = "/accounts/login/",
}

//TODO add zod validation and env.mjs for handling env vars
const getEndpointPath = getEndpointPathWith(
  process.env.NEXT_PUBLIC_MANY_ROADS_BACKEND as string
);

export const getAllTours = async () =>
  axiosClient.get(getEndpointPath(API_PATHS.tours));

export const getAllRoutes = async () =>
  axiosClient.get("https://subway.pythonanywhere.com/api/routes/");

export const userLogIn = async (email: string, password: string) =>
  axiosClient.post("/api/login", { email, password });
