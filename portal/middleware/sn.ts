import { v4 as uuidv4 } from 'uuid';

export default async (ctx: any, next: () => void) => {
  ctx.sn = ctx.headers['x-tracer-id'] || uuidv4();

  await next();
};
