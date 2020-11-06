import logger from '../logger';

const loggerInstance = logger();

export default async (ctx: any, next: () => void) => {
  ctx.logger = loggerInstance;

  await next();
};
