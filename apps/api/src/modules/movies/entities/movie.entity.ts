import { Movie } from '@prisma/client';
import {
  MovieAdditionalData,
  MoviePosterImages,
} from '../../../types/MovieTypes';

export type MovieExtended = Omit<Movie, 'additionalData' | 'posterImages'> & {
  additionalData: MovieAdditionalData;
  posterImages: MoviePosterImages;
};
