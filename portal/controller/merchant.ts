import { setTimeOutData } from '../util/function';
import { merchantList } from '../mock/mercahnt.mock';

export default class MerchantController {
  public async getMerchantList(ctx: any) {
    const data = {
      data: merchantList(685),
      msg: 'success'
    }
    
    const res = await setTimeOutData(data);
    // const res1 = await ctx.httpProxy.movie.getMovies(ctx.request.query);
    // console.log(res1, 'res1res1res1res1res1');
    
    ctx.sendSuccessResponse(res);
  }

  public async createMerchant(ctx: any) {
    const data = {
      code: 0,
      msg: 'success',
    }
    
    const res = await setTimeOutData(data);
    // const res1 = await ctx.httpProxy.movie.getMovies(ctx.request.query);
    // console.log(res1, 'res1res1res1res1res1');
    
    ctx.sendSuccessResponse(res);
  }

  public async updateMerchant(ctx: any) {
    const { merchantId } = ctx.params;
    console.log(merchantId, 'merchantId996');
    const data = {
      code: 0,
      msg: 'success',
    }
    
    const res = await setTimeOutData(data);
    // const res1 = await ctx.httpProxy.movie.getMovies(ctx.request.query);
    // console.log(res1, 'res1res1res1res1res1');
    
    ctx.sendSuccessResponse(res);
  }

  public async getMerchant(ctx: any) {
    const data = {
      data: merchantList(1),
      msg: 'success',
    }
    
    const res = await setTimeOutData(data);
    // const res1 = await ctx.httpProxy.movie.getMovies(ctx.request.query);
    // console.log(res1, 'res1res1res1res1res1');
    
    ctx.sendSuccessResponse(res);
  }
}
