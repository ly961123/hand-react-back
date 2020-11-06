import Koa from 'koa';
import bodyParser from 'koa-body';
// import serve from 'koa-static';
import views from 'koa-views';
import { userAgent } from 'koa-useragent';
import router from './router';
import requestMiddleware from './middleware/request';
import httpProxyMiddleware from './middleware/httpProxy';
import responseMiddleware from './middleware/response';
import loggerMiddleware from './middleware/logger';
import snMiddleware from './middleware/sn';
import configMiddleware from './middleware/config';

const rootDir = __dirname;
const app = new Koa();

app.use(userAgent);
app.use(bodyParser({ multipart: true }));
app.use(snMiddleware);
app.use(configMiddleware);
app.use(loggerMiddleware);
app.use(requestMiddleware);
app.use(async (ctx: Koa.ParameterizedContext, next: () => void) => {
  ctx.logger.log('verbose', ` sn: ${ctx.headers['x-tracer-id']} | ua: ${ctx.headers['user-agent']} `);
  await next();
});

// app.use(serve(`${rootDir}/static`, { index: false }));
app.use(httpProxyMiddleware);
app.use(responseMiddleware);
app.use(views(rootDir, { map: { html: 'ejs' } }));
app.use(router.routes());

export default app;
