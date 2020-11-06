import Router from 'koa-router';
import moviesRouter from './movie';
import homeRouter from './home';

const router: Router = new Router();

router.use('/api/movie', moviesRouter.routes());
// 这里最最重要，监听的服务渲染前端页面，全靠这里
router.use('', homeRouter.routes());

export default router;
