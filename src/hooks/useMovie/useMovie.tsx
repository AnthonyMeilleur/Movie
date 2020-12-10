import { useEffect, useState } from 'react';

import { getMovie, IMovieDetail } from "../../services/movie/movie";

function useSearch(id: string): IMovieDetail | null {
  const [movie, setMovie] = useState<IMovieDetail | null>(null);

  useEffect(() => {
    getMovie(id).then(setMovie);
  }, [id]);

  return movie;
}

export default useSearch;
