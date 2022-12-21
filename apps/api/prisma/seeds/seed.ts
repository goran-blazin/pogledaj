import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
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
    ]
  })

  // init languages
  await prisma.language.createMany({
    data: [
      {
        name: 'Engleski',
        code: 'EN',
      },
      {
        name: 'Srpski',
        code: 'RS',
      },
      {
        name: 'Francuski',
        code: 'FR',
      },
      {
        name: 'Korejski',
        code: 'KR',
      }
    ]
  });

  // init genres
  await prisma.genre.createMany({
    data: [
      {
        systemName: 'horror',
        localizedName: 'Horor',
      },
      {
        systemName: 'comedy',
        localizedName: 'Komedija',
      },
      {
        systemName: 'drama',
        localizedName: 'Drama',
      },
      {
        systemName: 'thriller',
        localizedName: 'Triler',
      },
      {
        systemName: 'action',
        localizedName: 'Akcija',
      },
      {
        systemName: 'documentary',
        localizedName: 'Dokumentarac',
      },
    ]
  })

  // init cities
  await prisma.city.createMany({
    data: [
      {
        name: 'Beograd',
        cityCode: 'BG',
        postalCode: '11000',
        countryCode: 'RS'
      },
      {
        name: 'Novi Sad',
        cityCode: 'NS',
        postalCode: '21000',
        countryCode: 'RS'
      },
      {
        name: 'Niš',
        cityCode: 'NI',
        postalCode: '18000',
        countryCode: 'RS'
      },
      {
        name: 'Zrenjanin',
        cityCode: 'ZR',
        postalCode: '23000',
        countryCode: 'RS'
      },
      {
        name: 'Subotica',
        cityCode: 'SU',
        postalCode: '24000',
        countryCode: 'RS'
      },
      {
        name: 'Kragujevac',
        cityCode: 'KG',
        postalCode: '34000',
        countryCode: 'RS'
      },
      {
        name: 'Smederevo',
        cityCode: 'SD',
        postalCode: '11300',
        countryCode: 'RS'
      },
    ]
  })
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