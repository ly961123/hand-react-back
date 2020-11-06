import axios, { AxiosRequestConfig } from 'axios';
// import { v4 as uuidv4 } from 'uuid';
// import logout from '../component/Logout';

enum StatusCode {
  CasExpired = 418,
}

class ApiClient {
  private baseUrl: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  private defaultHeaders: object;

  constructor() {
    this.baseUrl = '/api';
    this.defaultHeaders = {
      'Content-Type': 'application/json; charset=utf-8',
      'X-TC-Language': 'zh-CN',
    };
  }

  public async get<T>(path: string, options?: Partial<AxiosRequestConfig>): Promise<T> {
    return this.request(path, {
      ...options,
      method: 'get',
    });
  }

  public async post<T>(path: string, body: any, options?: Partial<AxiosRequestConfig>): Promise<T> {
    return this.request(path, {
      ...options,
      method: 'post',
      data: body,
    });
  }

  public async put<T>(path: string, body: any, options?: Partial<AxiosRequestConfig>): Promise<T> {
    return this.request(path, {
      ...options,
      method: 'put',
      data: body,
    });
  }

  public async delete<T>(path: string, options?: Partial<AxiosRequestConfig>): Promise<T> {
    return this.request(path, {
      ...options,
      method: 'delete',
    });
  }

  public async request(path: string, options: Partial<AxiosRequestConfig>) {
    try {
      const response = await axios.request({
        url: `${this.baseUrl}/${path}`,
        ...options,
        headers: {
          // 'x-tracer-id': uuidv4(),
          ...this.defaultHeaders,
          ...options.headers,
        },
      });

      if (response.data.error) {
        throw response.data.error;
      }

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      if (error.response.status === StatusCode.CasExpired) {
        // logout.modal();
      }

      throw error.response.data;
    }
  }
}

export default new ApiClient();
