import Router from 'koa-router';
import RequirementController from '../controller/requirement';

export const requirement = new RequirementController();
const {
  getRequirementList,
  getRequirements,
  createRequirement,
  updateRequirement,
} = requirement;

const requirementRouter: Router = new Router();

requirementRouter.get('/requirementList', getRequirementList);
requirementRouter.get('/:requireId/requirements', getRequirements);
requirementRouter.post('/create', createRequirement);
requirementRouter.post('/:requireId/update', updateRequirement);

export default requirementRouter;
