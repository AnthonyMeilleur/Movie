import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';

import { searchMovie, ISearch } from '../../services/movie/movie';


function useSearch(search: string): ISearch | null {
  const [result, setResult] = useState<ISearch | null>(null);

  const debounced = useMemo(() => debounce((search) => {
    if (search.length > 3) {
      searchMovie(search).then(data => setResult(data));
    } else {
      setResult(null);
    }
  }, 200), []);
  
  useEffect(() => {
    debounced(search);
  }, [debounced, search]);

  return result;
}

export default useSearch;
