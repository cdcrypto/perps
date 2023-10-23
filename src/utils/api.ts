import axios from "axios";

export enum ZetaApiRequests {
  Orderbook = "orderbooks",
  OpenInterest = "openInterest",
  TotalOpenInterest = "totalOpenInterest",
  PlatformMetrics = "global/stats",
}

export const zetaServerApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

const slotCache = {
  [ZetaApiRequests.OpenInterest]: 0,
  [ZetaApiRequests.Orderbook]: 0,
  [ZetaApiRequests.TotalOpenInterest]: 0,
  [ZetaApiRequests.PlatformMetrics]: 0,
};

interface ServerResponse {
  slot: number;
}

zetaServerApi.interceptors.response.use(
  (response) => {
    const slot = (response.data as ServerResponse).slot;
    if (!slot) return response;
    const route = response.config.url?.split("/")[1];

    for (const request of Object.values(ZetaApiRequests)) {
      if (request === route && slot > slotCache[request]) {
        slotCache[request] = slot;
        return response;
      }
    }

    throw new ZetaApiError("Data from response is from an old state.", true);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const zetaDataApi = axios.create({
  baseURL: import.meta.env.VITE_API_GATEWAY_URL,
});

export class ZetaApiError extends Error {
  constructor(message: string, public readonly staleData: boolean) {
    super(message);
    this.name = "ZetaDataError";
    Object.setPrototypeOf(this, ZetaApiError.prototype);
  }
}
