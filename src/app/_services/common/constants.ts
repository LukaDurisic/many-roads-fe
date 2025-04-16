import type { AxiosRequestConfig } from "axios";

export const contentTypeHeader: Record<string, AxiosRequestConfig["headers"]> =
  {
    json: { "Content-type": "application/json" },
  };
