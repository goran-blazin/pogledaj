import { PrismaClient } from '@prisma/client'
import {v4 as uuidv4} from 'uuid';
import {DateTime} from 'ts-luxon';
const prisma = new PrismaClient()
async function main() {
  // // init countries
  // await prisma.country.createMany({
  //   data: [
  //     {
  //       name: 'SAD',
  //       code: 'US',
  //     },
  //     {
  //       name: 'Srbija',
  //       code: 'RS',
  //     },
  //     {
  //       name: 'Nemačka',
  //       code: 'DE',
  //     },
  //     {
  //       name: 'Francuska',
  //       code: 'FR',
  //     },
  //     {
  //       name: 'Južna Koreja',
  //       code: 'KR',
  //     },
  //   ]
  // })
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
  //     }
  //   ]
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
  //   ]
  // })
  //
  // // init cities
  // await prisma.city.createMany({
  //   data: [
  //     {
  //       name: 'Beograd',
  //       cityCode: 'BG',
  //       postalCode: '11000',
  //       countryCode: 'RS'
  //     },
  //     {
  //       name: 'Novi Sad',
  //       cityCode: 'NS',
  //       postalCode: '21000',
  //       countryCode: 'RS'
  //     },
  //     {
  //       name: 'Niš',
  //       cityCode: 'NI',
  //       postalCode: '18000',
  //       countryCode: 'RS'
  //     },
  //     {
  //       name: 'Zrenjanin',
  //       cityCode: 'ZR',
  //       postalCode: '23000',
  //       countryCode: 'RS'
  //     },
  //     {
  //       name: 'Subotica',
  //       cityCode: 'SU',
  //       postalCode: '24000',
  //       countryCode: 'RS'
  //     },
  //     {
  //       name: 'Kragujevac',
  //       cityCode: 'KG',
  //       postalCode: '34000',
  //       countryCode: 'RS'
  //     },
  //     {
  //       name: 'Smederevo',
  //       cityCode: 'SD',
  //       postalCode: '11300',
  //       countryCode: 'RS'
  //     },
  //   ]
  // })

  // // init persons
  // await prisma.person.createMany({
  //   data: [
  //     {
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
  //       updatedAt: new Date()
  //     },
  //     {
  //       firstName: 'Scarlett',
  //       lastName: 'Johansson',
  //       dateOfBirth: DateTime.fromObject({
  //         year: 1984,
  //         month: 11,
  //         day: 22,
  //       }).toJSDate(),
  //       gender: 'Female',
  //       countryOfOriginId: 'US',
  //       updatedAt: new Date()
  //     },
  //     {
  //       firstName: 'Dragan',
  //       lastName: 'Nikolic',
  //       dateOfBirth: DateTime.fromObject({
  //         year: 1943,
  //         month: 8,
  //         day: 20,
  //       }).toJSDate(),
  //       gender: 'Male',
  //       countryOfOriginId: 'RS',
  //       updatedAt: new Date()
  //     },
  //     {
  //       firstName: 'Milena',
  //       lastName: 'Dravic',
  //       dateOfBirth: DateTime.fromObject({
  //         year: 1940,
  //         month: 10,
  //         day: 14,
  //       }).toJSDate(),
  //       gender: 'Female',
  //       countryOfOriginId: 'RS',
  //       updatedAt: new Date()
  //     },
  //     {
  //       firstName: 'Aleksandar',
  //       lastName: 'Djordjevic',
  //       gender: 'Male',
  //       countryOfOriginId: 'RS',
  //       updatedAt: new Date()
  //     },
  //     {
  //       firstName: 'Jon',
  //       lastName: 'Favreau',
  //       gender: 'Male',
  //       countryOfOriginId: 'US',
  //       updatedAt: new Date()
  //     },
  //     {
  //       firstName: 'Joss',
  //       lastName: 'Whedon',
  //       gender: 'Male',
  //       countryOfOriginId: 'US',
  //       updatedAt: new Date()
  //     },
  //   ]
  // })
  //
  // // init cinemas
  // await prisma.cinema.createMany({
  //   data: [
  //     {
  //       name: 'Bioskop Demo Beograd',
  //       description: 'Bioskop demo Beograd je veliki bioskop u nasem glavnom gradu',
  //       cityId: 'db44beff-fb7a-4078-a26d-1c219f501eff',
  //       address: 'Glavna 88',
  //       phone: ['011/555-1111', '011/555-2222'],
  //       rating: 55,
  //       posterImages: ['cinema1.png'],
  //     },
  //     {
  //       name: 'Bioskop Demo Beograd Mali',
  //       description: 'Bioskop demo Beograd Mali je mali bioskop u nasem glavnom gradu',
  //       cityId: 'db44beff-fb7a-4078-a26d-1c219f501eff',
  //       address: 'Sporedna 99',
  //       phone: ['011/555-3333'],
  //       rating: 96,
  //       posterImages: ['cinema2.png'],
  //     },
  //     {
  //       name: 'Bioskop Demo Novi Sad',
  //       description: 'Bioskop demo Novi Sad je u Novom Sad, poznatoj i kao srpska Atina',
  //       cityId: '999e4de9-90d1-4883-a6d2-f3f7bca7abf9',
  //       address: 'Dunavska 99',
  //       phone: ['021/555-8888', '021/555-9999'],
  //       rating: 12,
  //       posterImages: [],
  //     },
  //   ]
  // })

  // await prisma.cinemaTheater.createMany({
  //   data: [
  //     {
  //       name: 'Sala 1',
  //       cinemaId: '215435c2-acbb-4427-a2f8-352fe82abb1e',
  //       supports3D: true,
  //       posterImages: [],
  //     },
  //     {
  //       name: 'Sala 2',
  //       cinemaId: '215435c2-acbb-4427-a2f8-352fe82abb1e',
  //       posterImages: [],
  //       supports3D: false,
  //     },
  //     {
  //       name: 'Decja sala',
  //       cinemaId: '215435c2-acbb-4427-a2f8-352fe82abb1e',
  //       posterImages: [],
  //       supports3D: true,
  //     },
  //     {
  //       name: 'Velika sala',
  //       cinemaId: '480f27c1-6246-45f4-b983-ef280b844535',
  //       posterImages: [],
  //       supports3D: false,
  //     },
  //     {
  //       name: 'Mala sala',
  //       cinemaId: '480f27c1-6246-45f4-b983-ef280b844535',
  //       posterImages: [],
  //       supports3D: false,
  //     },
  //     {
  //       name: 'Sala 1',
  //       cinemaId: '24f6fbda-d4e2-424e-9e36-4c5acde26432',
  //       posterImages: [],
  //       supports3D: true,
  //     },
  //     {
  //       name: 'Sala 2',
  //       cinemaId: '24f6fbda-d4e2-424e-9e36-4c5acde26432',
  //       posterImages: [],
  //       supports3D: false,
  //     },
  //     {
  //       name: 'Decja sala',
  //       cinemaId: '24f6fbda-d4e2-424e-9e36-4c5acde26432',
  //       posterImages: [],
  //       supports3D: true,
  //     },
  //   ]
  // })

  // await prisma.movie.createMany({
  //   data: [
  //     {
  //       id: uuidv4(),
  //       originalName: 'Iron Man',
  //       localizedName: 'Gvozdeni covek',
  //       plot: 'Toni Stark, milijarder industrijalista i izumitelj, otet je i primoran da napravi razarajuće oružje. Koristeći svoju domišljatost i genijalnost, Toni pravi visokotehnološki oklop i zaklinje se da će zaštititi svet kao Gvozdeni čovek.',
  //       genreIds: ['action', 'thriller'],
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
  //       updatedAt: new Date()
  //     },
  //     {
  //       id: uuidv4(),
  //       originalName: 'Avengers',
  //       localizedName: 'Osvetnici',
  //       plot: 'Marvel studio predstavlja Osvetnike – fantastičnu grupu superjunaka koju čine Ajron Men, Neverovatni Hulk, Tor, Kapetan Amerika, Jastrebovo Oko i Crna Udovica.',
  //       genreIds: ['action', 'comedy'],
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
  //       updatedAt: new Date()
  //     },
  //     {
  //       id: uuidv4(),
  //       originalName: 'Kako su se volele dve budale',
  //       localizedName: 'Kako su se volele dve budale',
  //       plot: 'Emotivna ljubavna prica dvoje mladih ljudi',
  //       genreIds: ['drama'],
  //       runtimeMinutes: 30,
  //       originalLanguageId: 'RS',
  //       countryOfOriginId: 'RS',
  //       releaseDate: DateTime.fromObject({
  //         year: 1972,
  //       }).toJSDate(),
  //       rating: 33,
  //       posterImages: [],
  //       updatedAt: new Date()
  //     },
  //   ]
  // })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })