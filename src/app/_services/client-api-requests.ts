import { axiosClient } from "./common/axios-client";
import { getEndpointPathWith } from "./common/util";

export enum API_PATHS {
  /* I used https://api.restful-api.dev just to test the hook and it has /objects path. */
  tours = "/objects",
  login = "/accounts/login/",
  routes = "/routes/",
  imageUpload = "/routes/images/upload/",
  routeCreate = "/routes/create",
}

//TODO add zod validation and env.mjs for handling env vars
const getEndpointPath = getEndpointPathWith(
  process.env.NEXT_PUBLIC_MANY_ROADS_BACKEND as string
);

export const getAllTours = async () =>
  axiosClient.get(getEndpointPath(API_PATHS.tours));

export const getAllRoutes = async () =>
  axiosClient.get(getEndpointPath(API_PATHS.routes));

export const userLogIn = async (email: string, password: string) =>
  axiosClient.post(getEndpointPath(API_PATHS.login), { email, password });

export const uploadImage = async (image: FormData, authToken: string) => {
  try {
    const response = await axiosClient.post(
      getEndpointPath(API_PATHS.imageUpload),
      image,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

export const createRoute = async (routeData: any, authToken: string) =>
  axiosClient.post(getEndpointPath(API_PATHS.routeCreate), routeData, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
