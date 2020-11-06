import getCommonConfig from '../config';

export default async (ctx: any, next: () => void) => {
  const env = process.env;
  const config = getCommonConfig(env);
  ctx.config = config;
  await next();
};
