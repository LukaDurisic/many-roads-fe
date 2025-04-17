import axios from "axios";
import { contentTypeHeader } from "./constants";

export const axiosClient = axios.create({
  // default content type for all requests
  headers: contentTypeHeader.json,
});
