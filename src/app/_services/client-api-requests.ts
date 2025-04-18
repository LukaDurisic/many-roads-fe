import { axiosClient } from "./common/axios-client";
import { getEndpointPathWith } from "./common/util";

export enum API_PATHS {
  /* I used https://api.restful-api.dev just to test the hook and it has /objects path */
  tours = "/objects",
}

//TODO add zod validation and env.mjs for handling env vars
const getEndpointPath = getEndpointPathWith(
  process.env.NEXT_PUBLIC_MANY_ROADS_BACKEND as string
);

export const getAllTours = async () =>
  axiosClient.get(getEndpointPath(API_PATHS.tours));
