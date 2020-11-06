const getCommonConfig = (envConfig: NodeJS.ProcessEnv) => {
  const env = envConfig;
  console.log(env.NODE_ENV, 'env');

  return {
    proxy: {
      http: {
        movie: {
          // baseUrl: env.MOVIE_URL as string,
          baseUrl: 'http://epstest.oa.com' as string,
        },
        user: {
          // baseUrl: env.MOVIE_URL as string,
          baseUrl: 'http://user.oa.com' as string,
        },
      },
    }
  }
};

export default getCommonConfig;