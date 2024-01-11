import {ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';

@ValidatorConstraint({name: 'MovieExistsRule', async: true})
@Injectable()
export class MovieExistsRule implements ValidatorConstraintInterface {
  constructor(private prismaService: PrismaService) {}

  async validate(movieId: string): Promise<boolean> {
    try {
      await this.prismaService.movie.findUniqueOrThrow({
        where: {
          id: movieId,
        },
      });
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return `Passed movie does not exist`;
  }
}
