import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'ts-luxon';

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
  //
  // // init languages
  // await prisma.language.createMany({
  //   data: [
  //     {
  //       name: 'Engleski',
  //       code: 'EN',
  //     },
  //     {
  //       name: 'Srpski',
  //       code: 'RS',
  //     },
  //     {
  //       name: 'Francuski',
  //       code: 'FR',
  //     },
  //     {
  //       name: 'Korejski',
  //       code: 'KR',
  //     },
  //   ],
  //   skipDuplicates: true,
  // });
  //
  // // init genres
  // await prisma.genre.createMany({
  //   data: [
  //     {
  //       systemName: 'horror',
  //       localizedName: 'Horor',
  //     },
  //     {
  //       systemName: 'comedy',
  //       localizedName: 'Komedija',
  //     },
  //     {
  //       systemName: 'drama',
  //       localizedName: 'Drama',
  //     },
  //     {
  //       systemName: 'thriller',
  //       localizedName: 'Triler',
  //     },
  //     {
  //       systemName: 'action',
  //       localizedName: 'Akcija',
  //     },
  //     {
  //       systemName: 'documentary',
  //       localizedName: 'Dokumentarac',
  //     },
  //   ],
  //   skipDuplicates: true,
  // });

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

  // // init persons
  // const personIds = new Array(7).fill(undefined).map(() => uuidv4());
  // await prisma.person.createMany({
  //   data: [
  //     {
  //       id: personIds[0],
  //       firstName: 'Robert',
  //       middleName: 'Džon',
  //       lastName: 'Dauni Jr',
  //       dateOfBirth: DateTime.fromObject({
  //         year: 1965,
  //         month: 4,
  //         day: 4,
  //       }).toJSDate(),
  //       gender: 'Male',
  //       countryOfOriginId: 'US',
  //       updatedAt: new Date(),
  //     },
  //     {
  //       id: personIds[1],
  //       firstName: 'Scarlett',
  //       lastName: 'Johansson',
  //       dateOfBirth: DateTime.fromObject({
  //         year: 1984,
  //         month: 11,
  //         day: 22,
  //       }).toJSDate(),
  //       gender: 'Female',
  //       countryOfOriginId: 'US',
  //       updatedAt: new Date(),
  //     },
  //     {
  //       id: personIds[2],
  //       firstName: 'Dragan',
  //       lastName: 'Nikolic',
  //       dateOfBirth: DateTime.fromObject({
  //         year: 1943,
  //         month: 8,
  //         day: 20,
  //       }).toJSDate(),
  //       gender: 'Male',
  //       countryOfOriginId: 'RS',
  //       updatedAt: new Date(),
  //     },
  //     {
  //       id: personIds[3],
  //       firstName: 'Milena',
  //       lastName: 'Dravic',
  //       dateOfBirth: DateTime.fromObject({
  //         year: 1940,
  //         month: 10,
  //         day: 14,
  //       }).toJSDate(),
  //       gender: 'Female',
  //       countryOfOriginId: 'RS',
  //       updatedAt: new Date(),
  //     },
  //     {
  //       id: personIds[4],
  //       firstName: 'Aleksandar',
  //       lastName: 'Djordjevic',
  //       gender: 'Male',
  //       countryOfOriginId: 'RS',
  //       updatedAt: new Date(),
  //     },
  //     {
  //       id: personIds[5],
  //       firstName: 'Jon',
  //       lastName: 'Favreau',
  //       gender: 'Male',
  //       countryOfOriginId: 'US',
  //       updatedAt: new Date(),
  //     },
  //     {
  //       id: personIds[6],
  //       firstName: 'Joss',
  //       lastName: 'Whedon',
  //       gender: 'Male',
  //       countryOfOriginId: 'US',
  //       updatedAt: new Date(),
  //     },
  //   ],
  //   skipDuplicates: true,
  // });

  const cinemaBigBelgrade = uuidv4();
  const cinemaSmallBelgrade = uuidv4();
  const cinemaNoviSad = uuidv4();
  // init cinemas
  await prisma.cinema.createMany({
    data: [
      {
        id: cinemaBigBelgrade,
        name: 'Bioskop Demo Beograd',
        description:
          'Bioskop demo Beograd je veliki bioskop u nasem glavnom gradu',
        cityId: belgradeUUID,
        address: 'Glavna 88',
        phone: ['011/555-1111', '011/555-2222'],
        rating: 55,
        posterImages: ['cinema1.png'],
      },
      {
        id: cinemaSmallBelgrade,
        name: 'Bioskop Demo Beograd Mali',
        description:
          'Bioskop demo Beograd Mali je mali bioskop u nasem glavnom gradu',
        cityId: belgradeUUID,
        address: 'Sporedna 99',
        phone: ['011/555-3333'],
        rating: 96,
        posterImages: ['cinema2.png'],
      },
      {
        id: cinemaNoviSad,
        name: 'Bioskop Demo Novi Sad',
        description:
          'Bioskop demo Novi Sad je u Novom Sad, poznatoj i kao srpska Atina',
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

  // const movieIds = new Array(3).fill(undefined).map(() => uuidv4());
  // await prisma.movie.createMany({
  //   data: [
  //     {
  //       id: movieIds[0],
  //       originalName: 'Iron Man',
  //       localizedName: 'Gvozdeni covek',
  //       plot: 'Toni Stark, milijarder industrijalista i izumitelj, otet je i primoran da napravi razarajuće oružje. Koristeći svoju domišljatost i genijalnost, Toni pravi visokotehnološki oklop i zaklinje se da će zaštititi svet kao Gvozdeni čovek.',
  //       runtimeMinutes: 126,
  //       originalLanguageId: 'EN',
  //       countryOfOriginId: 'US',
  //       releaseDate: DateTime.fromObject({
  //         year: 2008,
  //         month: 5,
  //         day: 2,
  //       }).toJSDate(),
  //       rating: 65,
  //       posterImages: ['iron-man.png'],
  //       dubbedLanguageId: 'RS',
  //       updatedAt: new Date(),
  //     },
  //     {
  //       id: movieIds[1],
  //       originalName: 'Avengers',
  //       localizedName: 'Osvetnici',
  //       plot: 'Marvel studio predstavlja Osvetnike – fantastičnu grupu superjunaka koju čine Ajron Men, Neverovatni Hulk, Tor, Kapetan Amerika, Jastrebovo Oko i Crna Udovica.',
  //       runtimeMinutes: 143,
  //       originalLanguageId: 'EN',
  //       countryOfOriginId: 'US',
  //       releaseDate: DateTime.fromObject({
  //         year: 2012,
  //         month: 5,
  //         day: 2,
  //       }).toJSDate(),
  //       rating: 91,
  //       posterImages: ['avengers.png'],
  //       updatedAt: new Date(),
  //     },
  //     {
  //       id: movieIds[2],
  //       originalName: 'Kako su se volele dve budale',
  //       localizedName: 'Kako su se volele dve budale',
  //       plot: 'Emotivna ljubavna prica dvoje mladih ljudi',
  //       runtimeMinutes: 30,
  //       originalLanguageId: 'RS',
  //       countryOfOriginId: 'RS',
  //       releaseDate: DateTime.fromObject({
  //         year: 1972,
  //       }).toJSDate(),
  //       rating: 33,
  //       posterImages: [],
  //       updatedAt: new Date(),
  //     },
  //   ],
  //   skipDuplicates: true,
  // });

  // await prisma.movieActor.createMany({
  //   data: [
  //     {
  //       movieId: movieIds[0],
  //       personId: personIds[0],
  //       role: 'Main',
  //     },
  //     {
  //       movieId: movieIds[0],
  //       personId: personIds[5],
  //       role: 'Supporting',
  //     },
  //     {
  //       movieId: movieIds[1],
  //       personId: personIds[0],
  //       role: 'Main',
  //     },
  //     {
  //       movieId: movieIds[1],
  //       personId: personIds[1],
  //       role: 'Main',
  //     },
  //     {
  //       movieId: movieIds[2],
  //       personId: personIds[2],
  //       role: 'Main',
  //     },
  //     {
  //       movieId: movieIds[2],
  //       personId: personIds[3],
  //       role: 'Main',
  //     },
  //   ],
  // });

  // await prisma.movieDirector.createMany({
  //   data: [
  //     {
  //       movieId: movieIds[0],
  //       personId: personIds[5],
  //       type: 'Main',
  //     },
  //     {
  //       movieId: movieIds[1],
  //       personId: personIds[6],
  //       type: 'Main',
  //     },
  //     {
  //       movieId: movieIds[2],
  //       personId: personIds[4],
  //       type: 'Main',
  //     },
  //   ],
  // });
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
