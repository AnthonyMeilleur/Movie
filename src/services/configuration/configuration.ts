import { getApiUrl } from '../api/api';
import { IMovie } from '../movie/movie';

export interface IConfiguration {
  images: {
    base_url: string;
    poster_sizes: string[];
  };
}

export function getConfiguration(): Promise<IConfiguration> {
  return fetch(getApiUrl(`/configuration`))
    .then(result => result.json());
}

export function getPoster(configuration: IConfiguration, movie: IMovie, index = 0) {
  return `${configuration.images.base_url}${configuration.images.poster_sizes[index]}${movie.poster_path}`;
}

export function getBackdrop(configuration: IConfiguration, movie: IMovie, index = 0) {
  return `${configuration.images.base_url}${configuration.images.poster_sizes[index]}${movie.backdrop_path}`;
}
