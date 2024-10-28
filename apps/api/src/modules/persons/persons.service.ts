import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class PersonsService {
  constructor(private prismaService: PrismaService) {}

  searchActorsByName({take, searchText}: {take: number; searchText: string}) {
    return this.prismaService.person.findMany({
      where: {
        name: {
          contains: searchText,
          mode: 'insensitive',
        },
        actorInMovies: {
          some: {},
        },
      },
      orderBy: {
        name: 'asc',
      },
      take,
    });
  }

  searchDirectorsByName({take, searchText}: {take: number; searchText: string}) {
    return this.prismaService.person.findMany({
      where: {
        name: {
          contains: searchText,
          mode: 'insensitive',
        },
        directorInMovies: {
          some: {},
        },
      },
      orderBy: {
        name: 'asc',
      },
      take,
    });
  }

  getByIds(personIds: string[]) {
    return this.prismaService.person.findMany({
      where: {
        id: {
          in: personIds,
        },
      },
    });
  }
}
