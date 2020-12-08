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

  public async getRequirements(ctx: any) {
    const { requireId } = ctx.params;
    console.log(requireId, 'requireId996');
    const data = {
      data: requirementList(1),
      msg: 'success'
    }
    
    const res = await setTimeOutData(data);
    // const res1 = await ctx.httpProxy.movie.getMovies(ctx.request.query);
    // console.log(res1, 'res1res1res1res1res1');
    
    ctx.sendSuccessResponse(res);
  }

  public async createRequirement(ctx: any) {
    console.log(ctx.request.body, 'body');
    const data = {
      data: requirementList(1),
      msg: 'success'
    }
    
    const res = await setTimeOutData(data);
    // const res1 = await ctx.httpProxy.movie.getMovies(ctx.request.query);
    // console.log(res1, 'res1res1res1res1res1');
    
    ctx.sendSuccessResponse(res);
  }

  public async updateRequirement(ctx: any) {
    const { requireId } = ctx.params;
    console.log(requireId, 'requireId996');
    console.log(ctx.request.body, 'body');
    const data = {
      data: requirementList(1),
      msg: 'success'
    }
    
    const res = await setTimeOutData(data);
    // const res1 = await ctx.httpProxy.movie.getMovies(ctx.request.query);
    // console.log(res1, 'res1res1res1res1res1');
    
    ctx.sendSuccessResponse(res);
  }
}
