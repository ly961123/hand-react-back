import { setTimeOutData } from '../util/function';
import { movieList } from '../mock/movie.mock';
import cityList from '../mock/city.mock.';

export default class MovieController {
  public async getAllMovies(ctx: any) {
    const data = {
      data: movieList(20),
      msg: 'success'
    }
    const res = await setTimeOutData(data);
    // const res1 = await ctx.httpProxy.movie.getMovies(ctx.request.query);
    // console.log(res1, 'res1res1res1res1res1');
    
    ctx.sendSuccessResponse(res);
  }

  public async moviesDetail(ctx: any) {
    const { movieId } = ctx.request.query;
    const params = ctx.params;
    console.log(movieId, 'movieId111');
    console.log(params, 'params11111');
    
    const data = {
      data: movieList(1),
      msg: 'success'
    }
    const res = await setTimeOutData(data);
    // const res1 = await ctx.httpProxy.movie.getMovies(ctx.request.query);
    // console.log(res1, 'res1res1res1res1res1');
    
    ctx.sendSuccessResponse(res);
  }

  public async getCity(ctx: any) {
    const params = ctx.params;
    console.log(params, 'params11111');
    const data = {
      data: cityList,
      msg: 'success'
    }
    const res = await setTimeOutData(data);
    // const res1 = await ctx.httpProxy.movie.getMovies(ctx.request.query);
    // console.log(res1, 'res1res1res1res1res1');
    
    ctx.sendSuccessResponse(res);
  }
}
