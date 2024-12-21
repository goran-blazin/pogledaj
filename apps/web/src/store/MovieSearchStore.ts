import {create} from 'zustand';

type MovieSearchStore = {
  movieFilterQueryString: string | undefined;
  setMovieFilterQueryString: (queryString?: string) => void;
};

const useMovieSearchStore = create<MovieSearchStore>()((set) => {
  return {
    movieFilterQueryString: undefined,
    setMovieFilterQueryString(queryString) {
      set(() => {
        return {
          movieFilterQueryString: queryString,
        };
      });
    },
  };
});

export default useMovieSearchStore;
