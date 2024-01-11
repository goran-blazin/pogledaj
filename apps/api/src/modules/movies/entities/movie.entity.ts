import {Movie} from '@prisma/client';
import {MovieAdditionalData, MoviePosterImages, MovieVideo} from '../../../types/MovieTypes';

export type MovieExtended = Omit<Movie, 'additionalData' | 'posterImages' | 'videos'> & {
  additionalData: MovieAdditionalData;
  posterImages: MoviePosterImages;
  videos: MovieVideo[];
};
