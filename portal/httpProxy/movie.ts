const proxy = {
  async getMovies(apiClient: any, req: any) {
    return apiClient.request(`hand/movie/list`, {
      method: 'get',
      params: req,
    });
  },

  async getMovieDetail(apiClient: any, req: { movieId: string }) {
    return apiClient.request(`hand/movie/${req.movieId}/details`, {
      method: 'get',
      params: req,
    });
  },
}

export default proxy;
