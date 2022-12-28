import {Country, Genre, IntRange, Language} from './GeneralTypes';
import {Actor, Director, Producer} from './PeopleTypes';
import {Cinema, CinemaTheater} from './CinemaTypes';

export type Movie = {
  id: string;
  originalName: string;
  localizedName: string;
  plot: string;
  genres: Genre[];
  runtimeMinutes: number;
  originalLanguage: Language;
  dubbedLanguage?: Language;
  countryOfOrigin: Country;
  releaseDate: string;
  posterImages: string[];
  rating?: IntRange<0, 101>;
};

export type MovieWithPersons = Movie & {
  producers?: Producer[];
  actors: Actor[];
  directors: Director[];
};

export type MovieProjection = {
  id: string;
  movie: Movie;
  cinemaTheater: CinemaTheater;
  dateTime: string;
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
