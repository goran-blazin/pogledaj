import {PrismaClient} from '@prisma/client';
import {v4 as uuidv4} from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // init countries
  await prisma.country.createMany({
    data: [
      {
        name: 'SAD',
        code: 'US',
      },
      {
        name: 'Srbija',
        code: 'RS',
      },
      {
        name: 'Nemačka',
        code: 'DE',
      },
      {
        name: 'Francuska',
        code: 'FR',
      },
      {
        name: 'Južna Koreja',
        code: 'KR',
      },
    ],
    skipDuplicates: true,
  });

  const belgradeUUID = uuidv4();
  const noviSadUUID = uuidv4();
  // init cities
  await prisma.city.createMany({
    data: [
      {
        id: belgradeUUID,
        name: 'Beograd',
        cityCode: 'BG',
        postalCode: '11000',
        countryCode: 'RS',
      },
      {
        id: noviSadUUID,
        name: 'Novi Sad',
        cityCode: 'NS',
        postalCode: '21000',
        countryCode: 'RS',
      },
      {
        name: 'Niš',
        cityCode: 'NI',
        postalCode: '18000',
        countryCode: 'RS',
      },
      {
        name: 'Zrenjanin',
        cityCode: 'ZR',
        postalCode: '23000',
        countryCode: 'RS',
      },
      {
        name: 'Subotica',
        cityCode: 'SU',
        postalCode: '24000',
        countryCode: 'RS',
      },
      {
        name: 'Kragujevac',
        cityCode: 'KG',
        postalCode: '34000',
        countryCode: 'RS',
      },
      {
        name: 'Smederevo',
        cityCode: 'SD',
        postalCode: '11300',
        countryCode: 'RS',
      },
    ],
    skipDuplicates: true,
  });

  const cinemaBigBelgrade = uuidv4();
  const cinemaSmallBelgrade = uuidv4();
  const cinemaNoviSad = uuidv4();
  // init cinemas
  await prisma.cinema.createMany({
    data: [
      {
        id: cinemaBigBelgrade,
        name: 'Bioskop Demo Beograd',
        description: 'Bioskop demo Beograd je veliki bioskop u nasem glavnom gradu',
        cityId: belgradeUUID,
        address: 'Glavna 88',
        phone: ['011/555-1111', '011/555-2222'],
        rating: 55,
        posterImages: ['images/dynamic/cinema1.png'],
      },
      {
        id: cinemaSmallBelgrade,
        name: 'Bioskop Demo Beograd Mali',
        description: 'Bioskop demo Beograd Mali je mali bioskop u nasem glavnom gradu',
        cityId: belgradeUUID,
        address: 'Sporedna 99',
        phone: ['011/555-3333'],
        rating: 96,
        posterImages: ['images/dynamic/cinema2.png'],
      },
      {
        id: cinemaNoviSad,
        name: 'Bioskop Demo Novi Sad',
        description: 'Bioskop demo Novi Sad je u Novom Sad, poznatoj i kao srpska Atina',
        cityId: noviSadUUID,
        address: 'Dunavska 99',
        phone: ['021/555-8888', '021/555-9999'],
        rating: 12,
        posterImages: [],
      },
    ],
    skipDuplicates: true,
  });

  await prisma.cinemaTheater.createMany({
    data: [
      {
        name: 'Sala 1',
        cinemaId: cinemaBigBelgrade,
        supports3D: true,
        posterImages: [],
      },
      {
        name: 'Sala 2',
        cinemaId: cinemaBigBelgrade,
        posterImages: [],
        supports3D: false,
      },
      {
        name: 'Decja sala',
        cinemaId: cinemaBigBelgrade,
        posterImages: [],
        supports3D: true,
      },
      {
        name: 'Velika sala',
        cinemaId: cinemaSmallBelgrade,
        posterImages: [],
        supports3D: false,
      },
      {
        name: 'Mala sala',
        cinemaId: cinemaSmallBelgrade,
        posterImages: [],
        supports3D: false,
      },
      {
        name: 'Sala 1',
        cinemaId: cinemaNoviSad,
        posterImages: [],
        supports3D: true,
      },
      {
        name: 'Sala 2',
        cinemaId: cinemaNoviSad,
        posterImages: [],
        supports3D: false,
      },
      {
        name: 'Decja sala',
        cinemaId: cinemaNoviSad,
        posterImages: [],
        supports3D: true,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
