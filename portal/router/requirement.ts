import Router from 'koa-router';
import RequirementController from '../controller/requirement';

export const requirement = new RequirementController();
const {
  getRequirementList,
} = requirement;

const requirementRouter: Router = new Router();

requirementRouter.get('/requirementList', getRequirementList);

export default requirementRouter;
