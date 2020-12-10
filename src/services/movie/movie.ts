import { getApiUrl } from '../api/api';

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieDetail extends IMovie {
  budget: number;
  homepage: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
}

export interface ISearch {
  results: IMovie[];
}

export function getMovie(id: string): Promise<IMovieDetail> {
  return fetch(getApiUrl(`/movie/${id}`))
    .then(result => result.json());
}

export function searchMovie(search: string): Promise<ISearch> {
  return fetch(getApiUrl(`/search/movie`, { query: search }))
    .then(result => result.json());
}
