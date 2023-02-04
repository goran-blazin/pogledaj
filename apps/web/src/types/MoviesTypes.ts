import {Country, Genre, IntRange, Language, PosterImages} from './GeneralTypes';
import {Actor, Director, Producer} from './PeopleTypes';
import {Cinema, CinemaTheater} from './CinemaTypes';

export type Movie = {
  id: string;
  originalTitle: string;
  localizedTitle: string;
  plot: string;
  localizedPlot: string;
  genres: Genre[];
  runtimeMinutes: number;
  originalLanguage: Language;
  countryOfOrigin: Country;
  releaseDate: string;
  posterImages: PosterImages;
  rating?: IntRange<0, 101>;
};

export type MovieWithPersons = Movie & {
  producers: Producer[];
  actors: Actor[];
  directors: Director[];
};

type MovieProjectionOptions = {
  is3D: boolean;
};

export type MovieProjection = {
  id: string;
  movie: Movie;
  cinemaTheater: CinemaTheater;
  projectionDateTime: string;
  dubbedLanguage?: Language;
  options: MovieProjectionOptions;
};

export type ProjectionsGroupedPerCinemaType = {
  [cinemaId: string]: {
    cinema: Cinema;
    movieProjections: {
      movieProjectionId: string;
      time: string;
    }[];
  };
};

export type ProjectionsGroupedPerDateAndCinemaType = {
  [date: string]: {
    formattedDate: string;
    groupedByCinemas: ProjectionsGroupedPerCinemaType;
  };
};

export type ProjectionsGroupedPerMoviesType = {
  [movieId: string]: {
    movie: Movie;
    movieProjections: {
      movieProjectionId: string;
      time: string;
    }[];
  };
};

export type ProjectionsGroupedPerDateAndMovieType = {
  [date: string]: {
    formattedDate: string;
    groupedByMovies: ProjectionsGroupedPerMoviesType;
  };
};
