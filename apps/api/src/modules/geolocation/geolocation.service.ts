import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReturnList } from '../../types/CommonTypes';
import { City } from '@prisma/client';

@Injectable()
export class GeolocationService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllCities(): Promise<ReturnList<City>> {
    const data = await this.prismaService.city.findMany();

    return {
      data,
      dataCount: data.length,
      total: data.length,
    };
  }
}
