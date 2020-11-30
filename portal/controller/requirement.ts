import { setTimeOutData } from '../util/function';
import { requirementList } from '../mock/requirement.mock';

export default class RequirementController {
  public async getRequirementList(ctx: any) {
    const data = {
      data: requirementList(685),
      msg: 'success'
    }
    
    const res = await setTimeOutData(data);
    // const res1 = await ctx.httpProxy.movie.getMovies(ctx.request.query);
    // console.log(res1, 'res1res1res1res1res1');
    
    ctx.sendSuccessResponse(res);
  }
}
