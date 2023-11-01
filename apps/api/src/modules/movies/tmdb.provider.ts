import MovieDB from 'node-themoviedb';
import * as process from 'process';
import * as _ from 'lodash';
import { Injectable, Logger } from '@nestjs/common';
import { InputProvider, ProducerType } from '@prisma/client';
import { MovieExternal, PersonForMovieExternal } from '../../types/MovieTypes';
import { DirectorType, Gender } from '.prisma/client';

interface ExtendedVideos {
  id: number;
  results: {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: 360 | 480 | 720 | 1080;
    type:
      | 'Trailer'
      | 'Teaser'
      | 'Clip'
      | 'Featurette'
      | 'Behind the Scenes'
      | 'Bloopers';
    official: boolean;
  }[];
}

type TmdbPersonGender = 0 | 1 | 2;

const GenderMapper = {
  0: Gender.Other,
  1: Gender.Female,
  2: Gender.Male,
};

type TmdbPerson = {
  birthday?: string;
  deathday?: string;
  id: number;
  name: string;
  also_known_as: string[];
  gender: TmdbPersonGender;
  biography: string;
  popularity: number;
  place_of_birth?: string;
  profile_path?: string;
  imdb_id: string;
  homepage?: string;
};

@Injectable()
export class TmdbProvider {
  private tmdbClient;

  constructor() {
    this.tmdbClient = new MovieDB(process.env.TMDB_V3_API_KEY as string, {});
  }

  async getApiConfiguration() {
    const res = await this.tmdbClient.configuration.getAPIConfiguration();

    return res.data;
  }

  async getPerson(personId: number): Promise<TmdbPerson> {
    const res = await this.tmdbClient.person.getDetails({
      pathParameters: {
        person_id: personId,
      },
    });

    return res.data as unknown as TmdbPerson;
  }

  async getMovieByTMDBId(tmdbId: string): Promise<MovieExternal> {
    const [
      apiConf,
      externalMovieRes,
      externalMovieCreditsRes,
      externalMovieVideosRes,
    ] = await Promise.all([
      this.getApiConfiguration(),
      this.tmdbClient.movie.getDetails({
        pathParameters: {
          movie_id: tmdbId,
        },
      }),
      this.tmdbClient.movie.getCredits({
        pathParameters: {
          movie_id: tmdbId,
        },
      }),
      this.tmdbClient.movie.getVideos({
        pathParameters: {
          movie_id: tmdbId,
        },
      }),
    ]);
    const externalMovie = externalMovieRes.data;
    const externalMovieCredits = externalMovieCreditsRes.data;
    const externalMovieVideos = externalMovieVideosRes.data as ExtendedVideos;
    // get first 5 actors
    const creditActors = externalMovieCredits.cast.slice(0, 5);
    const creditActorPersons = await Promise.all(
      creditActors.map(async (creditActor) => {
        return {
          creditActor,
          tmdbPerson: await this.getPerson(creditActor.id),
        };
      }),
    );

    // get first 3 directors
    const creditDirectors = externalMovieCredits.crew
      .filter((crewMember) => crewMember.job.toLowerCase().includes('director'))
      .slice(0, 2);
    const creditDirectorPersons = await Promise.all(
      creditDirectors.map(async (creditDirector) => {
        return {
          creditDirector,
          tmdbPerson: await this.getPerson(creditDirector.id),
        };
      }),
    );

    // get first 2 producers
    const creditProducers = externalMovieCredits.crew
      .filter((crewMember) => crewMember.job.toLowerCase().includes('producer'))
      .slice(0, 2);
    const creditProducerPersons = await Promise.all(
      creditProducers.map(async (creditProducer) => {
        return {
          creditProducer,
          tmdbPerson: await this.getPerson(creditProducer.id),
        };
      }),
    );

    const getMoviePersonFromTmdbPerson = (
      tmdbPerson: TmdbPerson,
    ): PersonForMovieExternal => ({
      name: tmdbPerson.name,
      biography: tmdbPerson.biography,
      dateOfBirth: tmdbPerson.birthday ? new Date(tmdbPerson.birthday) : null,
      dateOfDeath: tmdbPerson.deathday ? new Date(tmdbPerson.deathday) : null,
      gender: GenderMapper[tmdbPerson.gender],
      externalId: tmdbPerson.id.toString(),
      externalType: InputProvider.Tmdb,
      additionalData: {
        imdbId: tmdbPerson.imdb_id,
        homepage: tmdbPerson.homepage,
      },
    });

    return {
      actors: creditActorPersons.map(({ creditActor, tmdbPerson }) => {
        return {
          person: getMoviePersonFromTmdbPerson(tmdbPerson),
          characterName: creditActor.character,
          castOrder: creditActor.order,
        };
      }),
      directors: creditDirectorPersons.map(({ creditDirector, tmdbPerson }) => {
        return {
          person: getMoviePersonFromTmdbPerson(tmdbPerson),
          type:
            creditDirector.job.toLowerCase() === 'director'
              ? DirectorType.Main
              : DirectorType.Assistant,
        };
      }),
      producers: creditProducerPersons.map(({ creditProducer, tmdbPerson }) => {
        return {
          person: getMoviePersonFromTmdbPerson(tmdbPerson),
          type:
            creditProducer.job.toLowerCase() === 'producer'
              ? ProducerType.Executive
              : ProducerType.Assistant,
        };
      }),
      additionalData: {
        imdbId: externalMovie.imdb_id || undefined,
        homepage: externalMovie.homepage || undefined,
        adult: externalMovie.adult,
      },
      countryOfOrigin: {
        code: externalMovie.production_countries[0].iso_3166_1,
        name: externalMovie.production_countries[0].name,
      },
      externalId: externalMovie.id.toString(),
      externalType: InputProvider.Tmdb,
      genreCodes: externalMovie.genres.map((genre) => genre.name.toLowerCase()),
      originalLanguageCode: externalMovie.original_language,
      originalTitle: externalMovie.original_title,
      plot: externalMovie.overview || '',
      posterImages: {
        bigPoster: `${apiConf.images.base_url}${_.nth(
          apiConf.images.poster_sizes,
          -1,
        )}${externalMovie.poster_path}`,
        mediumPoster: `${apiConf.images.base_url}${_.nth(
          apiConf.images.poster_sizes,
          -2,
        )}${externalMovie.poster_path}`,
        smallPoster: `${apiConf.images.base_url}${_.nth(
          apiConf.images.poster_sizes,
          -3,
        )}${externalMovie.poster_path}`,
        thumbPoster: `${apiConf.images.base_url}${_.nth(
          apiConf.images.poster_sizes,
          1,
        )}${externalMovie.poster_path}`,
        bigBackground: `${apiConf.images.base_url}${_.nth(
          apiConf.images.backdrop_sizes,
          -1,
        )}${externalMovie.backdrop_path}`,
        mediumBackground: `${apiConf.images.base_url}${_.nth(
          apiConf.images.backdrop_sizes,
          -2,
        )}${externalMovie.backdrop_path}`,
        smallBackground: `${apiConf.images.base_url}${_.nth(
          apiConf.images.backdrop_sizes,
          -3,
        )}${externalMovie.backdrop_path}`,
      },
      videos: externalMovieVideos.results
        .sort((v1, v2) => {
          return Number(v2.official) - Number(v1.official);
        })
        .map((video) => {
          return {
            type: video.type as string,
            site: video.site,
            key: video.key,
          };
        }),
      rating: Math.ceil(
        parseFloat(externalMovie.vote_average.toString()) * 100,
      ),
      releaseDate: externalMovie.release_date,
      runtimeMinutes: externalMovie.runtime || 0,
    };
  }
}
