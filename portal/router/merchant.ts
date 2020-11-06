import Router from 'koa-router';
import MerchantController from '../controller/merchant';

export const merchant = new MerchantController();
const {
  getMerchantList,
} = merchant;

const merchantRouter: Router = new Router();

merchantRouter.get('/list', getMerchantList);

export default merchantRouter;
