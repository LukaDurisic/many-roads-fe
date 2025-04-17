import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../_lib/constants/query-keys";
import { getAllTours } from "../_services/client-api-requests";

export const useTours = () =>
  useQuery({
    queryKey: [QUERY_KEYS.trips],
    queryFn: () => getAllTours(),
  });
