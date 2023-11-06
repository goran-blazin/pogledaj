import {Country, Genre, IntRange, Language, PosterImages, ProjectionPrice} from './GeneralTypes';
import {Actor, Director, Producer} from './PeopleTypes';
import {Cinema, CinemaTheater} from './CinemaTypes';

export type MovieAdditionalData = {
  imdbId?: string;
  homepage?: string;
  adult?: boolean;
};

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
  additionalData: MovieAdditionalData;
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
  projectionPrices: ProjectionPrice[];
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

export const InputProvider = {
  Tmdb: 'Tmdb',
  Imdb: 'Imdb',
  AdminInput: 'AdminInput',
};

export type InputProvider = (typeof InputProvider)[keyof typeof InputProvider];

export type UpsertMovieFromExternalDTO = {
  externalType: InputProvider;
  externalId: string;
  localizedTitle: string;
  localizedPlot: string;
};

export const CurrencyCode = {
  RSD: 'RSD',
  USD: 'USD',
  EUR: 'EUR',
  CHF: 'CHF',
};

export type CurrencyCode = (typeof CurrencyCode)[keyof typeof CurrencyCode];

export type CreateMovieProjectionDTO = {
  movieId: string;
  cinemaTheaterId: string;
  projectionDateTime: string;
  dubbedLanguageId?: string | null;
  is3D: boolean;
  price: number;
  currencyCode: CurrencyCode;
};

export type CreateCinemaTheaterDTO = {
  name: string;
  supports3D: boolean;
  cinemaId: string;
  rowCount: number;
  columnCount: number;
};
