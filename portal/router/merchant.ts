import Router from 'koa-router';
import MerchantController from '../controller/merchant';

export const merchant = new MerchantController();
const {
  getMerchantList,
  createMerchant,
  updateMerchant,
  getMerchant,
} = merchant;

const merchantRouter: Router = new Router();

merchantRouter.get('/list', getMerchantList);
merchantRouter.get('/:merchantId', getMerchant);

merchantRouter.post('/create', createMerchant);
merchantRouter.post('/:merchantId/update', updateMerchant);

export default merchantRouter;
