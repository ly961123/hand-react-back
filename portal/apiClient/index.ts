import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import logger from '../logger';
import httpProxyMapping from '../httpProxy';

export interface Iconfig {
  baseUrl: string;
  sn: string | undefined;
  proxy?: IProxyConfig;
}

type IHttpProxyConfigMapping = {
  [key in keyof typeof httpProxyMapping]: Iconfig;
};

export interface IProxyConfig {
  tcp?: string;
  http?: IHttpProxyConfigMapping;
}

interface IHttpErrorResponse {
  code: number;
  message: string;
}

const loggerInstance = logger();

class ApiClient {
  private baseUrl: string;
  private sn: string | undefined;

  public constructor(config: Iconfig) {
    this.baseUrl = config.baseUrl;
    this.sn = config.sn;
  }

  public async requst<T>(
    path: string,
    options: AxiosRequestConfig,
  ): Promise<T> {
    try {
      // const startTime = Date.now();

      loggerInstance.info(`baseUrl: ${this.baseUrl}`);
      loggerInstance.info(`[sn: ${this.sn}] Request ${this.baseUrl}/${path}, params: ${JSON.stringify(options.params)}, body: ${JSON.stringify(options.data)}`);

      const response = await axios({
        url: `${this.baseUrl}/${path}`,
        timeout: 20000,
        ...options,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          sn: this.sn || '',
          ...options.headers,
        },
      });

      // const endTime = Date.now();

      return response.data;
    } catch (error) {
      if (!error.response) {
        loggerInstance.error(`Request ${this.baseUrl}/${path} failed, options: ${JSON.stringify(options)} error:${error}`,
        );
        throw error;
      }

      const response = (error.response as AxiosResponse<IHttpErrorResponse>);
      const responseData = response.data;
      loggerInstance.error(`Request ${this.baseUrl}/${path} failed, options: ${JSON.stringify(options)} error:${error} data:${JSON.stringify(responseData)}`,
      );

      throw error;
    }
  }
}

export default ApiClient;
