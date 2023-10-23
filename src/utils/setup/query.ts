// import { theme } from "static/theme";
import {
  QueryClient,
  QueryClientConfig
} from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";

const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
};


export const QUERY_CLIENT = new QueryClient(queryConfig);
