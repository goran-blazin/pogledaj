import {MovieExtended} from '../modules/movies/entities/movie.entity';
import {MovieActor} from '@prisma/client';
import {MovieDirector, MovieProducer} from '.prisma/client';
import {PersonExtended} from '../modules/persons/entities/person.entity';

export type MovieLocalizedData = {
  localizedTitle: string;
  localizedPlot: string;
};

export type MovieAdditionalData = {
  imdbId?: string;
  homepage?: string;
  adult?: boolean;
  forChildren: boolean;
};

export type MoviePosterImages = {
  bigPoster: string;
  mediumPoster: string;
  smallPoster: string;
  thumbPoster: string;
  bigBackground: string;
  mediumBackground: string;
  smallBackground: string;
};

export type MovieVideo = {
  type: string;
  site: string;
  key: string;
};

export type PersonForMovieExternal = Omit<PersonExtended, 'id' | 'createdAt' | 'updatedAt'>;

export type MovieExternal = Omit<
  MovieExtended,
  | 'releaseDate'
  | 'id'
  | 'localizedTitle'
  | 'localizedPlot'
  | 'createdAt'
  | 'updatedAt'
  | 'originalLanguageId'
  | 'countryOfOriginId'
> & {
  originalLanguageCode: string;
  countryOfOrigin: {
    code: string;
    name: string;
  };
  genreCodes: string[];
  actors: (Omit<MovieActor, 'personId' | 'movieId'> & {
    person: PersonForMovieExternal;
  })[];
  directors: (Omit<MovieDirector, 'personId' | 'movieId'> & {
    person: PersonForMovieExternal;
  })[];
  producers: (Omit<MovieProducer, 'personId' | 'movieId'> & {
    person: PersonForMovieExternal;
  })[];
  releaseDate: string;
};

export const MovieLengthCategory = {
  to90Minutes: 'to90Minutes',
  from90To120Minutes: 'from90To120Minutes',
  from120To180Minutes: 'from120To180Minutes',
  over180Minutes: 'over180Minutes',
} as const;

export type MovieLengthCategory = (typeof MovieLengthCategory)[keyof typeof MovieLengthCategory];
