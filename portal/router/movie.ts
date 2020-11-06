import Router from 'koa-router';
import MovieController from '../controller/movie';

export const movie = new MovieController();
const {
  getAllMovies,
  moviesDetail,
  getCity,
} = movie;

const movieRouter: Router = new Router();

movieRouter.get('/', getAllMovies);
movieRouter.post('/:movieId/detail', moviesDetail);
movieRouter.get('/city', getCity);

export default movieRouter;
