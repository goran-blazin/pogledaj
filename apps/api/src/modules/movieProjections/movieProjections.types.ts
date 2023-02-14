import { MovieProjection } from '@prisma/client';

export type MovieProjectionExtended = Omit<MovieProjection, 'options'> & {
  options: MovieProjectionOptions;
};

export type MovieProjectionOptions = {
  is3D: boolean;
};
