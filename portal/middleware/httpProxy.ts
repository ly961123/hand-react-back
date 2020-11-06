// import Koa from 'koa';
// import Router from 'koa-router';
import ApiClient from '../apiClient';
import httpProxyMapping from '../httpProxy';
// import { Iconfig, IProxyConfig } from '../apiClient';


// interface IContextSn {
//   sn: string;
//   config: Iconfig;
//   httpProxy: TKeyOfProxyMapping;
// }

// interface ICommonHttpProxy<T> {
//   httpProxy: IHttpProxyMapping<typeof httpProxyMapping & T & Record<string, any>>;
// }

// interface ITencentCloud {
//   sendSuccessResponse(body: any): void;
// }

// type RestParamsType<T> = T extends (arg1: any, ...args: infer U) => any ? U : any;
// type GeneralReturnType<T> = T extends (...args: any) => infer U ? U : any;
// type TProxyHandler<T> = (...args: RestParamsType<T>) => GeneralReturnType<T>;
// type TProxyHandlerMapping<T> = {
//   [K in keyof T]: TProxyHandler<T[K]>;
// };
// type IHttpProxyMapping<T> = {
//   [K in keyof T]: TProxyHandlerMapping<T[K]>;
// };
type TKeyOfProxyMapping = keyof typeof httpProxyMapping;
// type TBaseContext = Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>;
// export type TCommonContext = TBaseContext & IContextSn & ITencentCloud;
// type TIndexedProxyMapping = Record<TKeyOfProxyMapping, any>;
interface IBaseUrl {
  baseUrl: string,
}

interface IHttp {
  http: Record<string, IBaseUrl> ,
}

interface IProxy {
  proxy: IHttp,
}

interface ICtx {
  sn: string,
  config: IProxy,
  httpProxy: string,
}

export default async (ctx: ICtx, next: () => void) => {
  ctx.httpProxy =Object.keys(httpProxyMapping)
    .reduce((item: any, key: string | TKeyOfProxyMapping) => {
      const config = ctx.config.proxy;
      const mappingKey = key as TKeyOfProxyMapping;

      if (!config.http) {
        return item;
      }

      // 这里输出对应某个服务的baseUrl的对象
      // movie: {
      //   // baseUrl: env.MOVIE_URL as string,
      //   baseUrl: 'http://epstest.oa.com' as string,
      // },
      const httpConfig = config.http[mappingKey];
      const apiClient = new ApiClient({
        ...httpConfig,
        sn: ctx.sn,
      });

      item[mappingKey] = Object.keys(httpProxyMapping[mappingKey])
        .reduce((proxyAcc: any, proxyKey: any) => {
          proxyAcc[proxyKey] = (req: any) =>
            (httpProxyMapping[mappingKey] as any)[proxyKey](apiClient, req);
          return proxyAcc;
        });

      return item;
    })

  await next();
};
