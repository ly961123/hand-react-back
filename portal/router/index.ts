import Router from 'koa-router';
import moviesRouter from './movie';
import homeRouter from './home';
import merchantRouter from './merchant';

const router: Router = new Router();

router.use('/api/movie', moviesRouter.routes());
router.use('/api/merchant', merchantRouter.routes());
// 这里最最重要，监听的服务渲染前端页面，全靠这里
router.use('', homeRouter.routes());

export default router;
