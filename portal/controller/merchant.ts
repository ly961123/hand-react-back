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
}
