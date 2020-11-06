import Koa from 'koa';

export default async (ctx: Partial<Koa.ParameterizedContext>, next: () => void) => {
  const request = ctx.request as Koa.Request;

  ctx.logger.info(`[sn: ${ctx.sn}] Access path: ${request.path} query: ${JSON.stringify(request.query)} body: ${JSON.stringify(request.body)} host: ${request.header.host} ip: ${request.ip}`); // tslint:disable-line

  await next();
};
