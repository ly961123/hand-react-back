import Router from 'koa-router';
import { index } from '../controller/home';

const homeRouter: Router = new Router();

// 默认匹配路由，渲染前端层页面
homeRouter.get('/', index);

export default homeRouter;
