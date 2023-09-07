import { KeywordItem } from '@/types'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const getClient = (baseURL: string) => {
  return axios.create({ baseURL: baseURL });
};

class ApiClient {
  client: AxiosInstance;
  queryString: { query?: string } = {};

  constructor(baseURL: string) {
    this.client = getClient(baseURL);

    this.client.interceptors.request.use((config) => {
      if (config.params && config.params.q) {
        this.queryString['query'] = config.params.q;
      }
      return config;
    });

    this.client.interceptors.response.use((response) => {
      const query = this.queryString.query;
      if (query) {
        response.data.sort((a: KeywordItem, b: KeywordItem) => {
          const startsWithA = a.sickNm.startsWith(query);
          const startsWithB = b.sickNm.startsWith(query);
          if (!startsWithA && startsWithB) {
            return 1;
          } else if (startsWithA && !startsWithB) {
            return -1;
          }
          return 0;
        });
      }
      return response;
    });
  }

  get(endPoint: string, config?: AxiosRequestConfig) {
    return this.client.get(endPoint, config);
  }
}

export { ApiClient };