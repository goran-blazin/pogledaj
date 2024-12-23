import {Country, Genre, IntRange, Language, PosterImages, ProjectionPrice} from './GeneralTypes';
import {Actor, Director, Producer} from './PeopleTypes';
import {Cinema, CinemaTheater} from './CinemaTypes';
import {Reservation} from './ReservationTypes';

export type MovieAdditionalData = {
  imdbId?: string;
  homepage?: string;
  adult?: boolean;
  forChildren: boolean;
};

export type Movie = {
  id: string;
  originalTitle: string;
  title: string;
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
  videos: {
    key: string;
    site: 'YouTube';
    type: 'Teaser' | 'Trailer' | 'Behind the Scenes';
  }[];
  createdAt: string;
};

export type MoviesBycategoryTypes = [string, Movie[]];

export type MovieWithPersons = Movie & {
  producers: Producer[];
  actors: Actor[];
  directors: Director[];
};

export type MovieWithMovieProjection = Movie & {
  movieProjections: MovieProjection[];
};

export type MovieProjectionOptions = {
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
  reservations: Reservation[];
};

export type ProjectionsDates = Record<
  string,
  {
    day: string;
    weekDay: string;
    month: string;
    date: string;
    movieProjections: MovieProjection[];
  }
>;

export type ProjectionsGroupedPerCinemaType = {
  [cinemaId: string]: {
    cinema: Cinema;
    dates: ProjectionsDates;
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
} & MovieProjectionDetailsDTO;

export type EditMovieProjectionDTO = {
  cinemaTheaterId: string;
} & MovieProjectionDetailsDTO;

type MovieProjectionDetailsDTO = {
  projectionDateTime: string;
  dubbedLanguageId?: string | null;
  is3D: boolean;
  price: number;
  currencyCode: CurrencyCode;
};

export type CreateMovieProjectionBulkDTO = {
  movieId: string;
  cinemaTheaterId: string;
  projectionDetails: MovieProjectionDetailsDTO[];
};

export type CreateCinemaTheaterDTO = {
  name: string;
  supports3D: boolean;
  cinemaId: string;
  rowCount: number;
  columnCount: number;
};

export const MovieLengthCategory = {
  to90Minutes: 'to90Minutes',
  from90To120Minutes: 'from90To120Minutes',
  from120To180Minutes: 'from120To180Minutes',
  over180Minutes: 'over180Minutes',
} as const;

export type MovieLengthCategory = (typeof MovieLengthCategory)[keyof typeof MovieLengthCategory];

export type MoviesFilters = Partial<{
  selectedGenres: string[];
  selectedCountries: string[];
  selectedDirectorPersonId: string;
  selectedActorPersonIds: string[];
  movieLengths: MovieLengthCategory[];
  selectedCityId: string;
  selectedCinemasIds: string[];
  selectedDateFrom: string;
  selectedDateTo: string;
}>;

export type MoviesFiltersQuery = Partial<{
  selectedGenres: string;
  selectedCountries: string;
  selectedDirectorPersonId: string;
  selectedActorPersonIds: string;
  movieLengths: string;
  selectedCityId: string;
  selectedCinemasIds: string;
  selectedDateFrom: string;
  selectedDateTo: string;
}>;
