import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieProjectionDto } from './dto/createMovieProjection.dto';
import { MovieProjectionOptions } from './movieProjections.types';
import { DateTime } from 'ts-luxon';
import { Cinema, CinemaTheater, Movie } from '@prisma/client';
import * as _ from 'lodash';
import { Logger } from '@nestjs/common';

@Injectable()
export class MovieProjectionsService {
  private readonly logger = new Logger(MovieProjectionsService.name);

  constructor(private prismaService: PrismaService) {}

  create(data: CreateMovieProjectionDto) {
    const options: MovieProjectionOptions = {
      is3D: data.is3D,
    };

    return this.prismaService.movieProjection.create({
      data: {
        movieId: data.movieId,
        cinemaTheaterId: data.cinemaTheaterId,
        projectionDateTime: data.projectionDateTime,
        dubbedLanguageId: data.dubbedLanguageId || null,
        updatedAt: new Date(),
        options,
      },
    });
  }

  async findPerMovieCinema(movieId: string, cinemaId: string) {
    return this.prismaService.movieProjection.findMany({
      where: {
        movieId,
        cinemaTheater: {
          cinemaId,
        },
      },
    });
  }

  async generate(daysCount = 30) {
    // first delete all MovieProjections
    await this.prismaService.movieProjection.deleteMany();

    const generateProjections = (
      cinema: Cinema & { cinemaTheaters: CinemaTheater[] },
      movie: Movie,
      daysCount: number,
    ): CreateMovieProjectionDto[] => {
      const cinemaTheaterId = _.sample(cinema.cinemaTheaters)?.id;

      if (!cinemaTheaterId) {
        return [];
      }

      // generate 4 times in next two weeks
      const now = DateTime.now();
      const today = DateTime.fromObject({
        year: now.year,
        month: now.month,
        day: now.day,
        hour: 9,
      });
      const days = _.shuffle([...Array(daysCount).keys()])
        .slice(0, 6)
        .map((dayOffset) => {
          // for each day return 4 random times between 9 and 23
          return _.shuffle([...Array(daysCount).keys()])
            .slice(0, 4)
            .map((hourOffset) => {
              return today.plus({
                day: dayOffset,
                hour: hourOffset,
              });
            });
        });

      return _.flatten(days)
        .sort((a: DateTime, b: DateTime) => {
          return a < b ? -1 : a > b ? 1 : 0;
        })
        .map((dt) => {
          return {
            movieId: movie.id,
            cinemaTheaterId: cinemaTheaterId,
            projectionDateTime: dt.toJSDate(),
            is3D: _.sample([true, false]) as boolean,
          };
        })
        .filter((mp) => !!mp);
    };

    // get all movies and cinema theaters
    const [movies, cinemas] = await Promise.all([
      this.prismaService.movie.findMany(),
      this.prismaService.cinema.findMany({
        include: {
          cinemaTheaters: true,
        },
      }),
    ]);

    const mpIds: string[] = [];
    for (const movie of movies) {
      for (const cinema of cinemas) {
        const mpDtos = generateProjections(cinema, movie, daysCount);
        for (const mpDto of mpDtos) {
          const mp = await this.create(mpDto);
          this.logger.debug(`Created movieProjection ${mp.id}`);
          mpIds.push(mp.id);
        }
      }
    }

    return mpIds;
  }
}
