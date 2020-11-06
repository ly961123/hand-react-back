interface Actors {
  name: string,
  role: string,
  avatarAddress: string,
}

interface FilmType {
  name: string,
  value: number,
}

export interface TopBars {
  title: string;
  key: string;
}

export interface NowPlayingData {
  id: string,
  name: string,
  nation: string,
  poster: string,
  grade: string,
  runtime: number,
  filmType: FilmType,
  actors: Actors[],
  premiereAt: number,
  synopsis: string,
  photos: string,
  stagePhoto: string[],
}

export interface NowPlaying {
  list: NowPlayingData[],
  count: number,
}

export interface IMovieList {
  msg: string,
  data: NowPlaying,
}

export interface IMovieDetail {
  msg: string,
  data: NowPlayingData,
}

export interface ICityList {
  cityId: number,
  isHot: number,
  name: string,
  pinyin: string,
}

export interface ICityDetail {
  msg: string,
  data: ICityList[],
}
