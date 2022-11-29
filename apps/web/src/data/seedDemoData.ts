import {City, Country, Genre, Language} from '../types/GeneralTypes';
import {Cinema, CinemaTheater} from '../types/CinemaTypes';
import {Movie, MovieProjection} from '../types/MoviesTypes';
import {Person} from '../types/PeopleTypes';
import {DateTime} from 'ts-luxon';
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';

const RESET_SEED_DATA_IF_LOWER_THAN = 1669729906835;

type SeedDemoData = {
  countries: Country[];
  genres: Genre[];
  languages: Language[];
  cities: City[];
  persons: Person[];
  cinemas: Cinema[];
  cinemaTheaters: CinemaTheater[];
  movies: Movie[];
  movieProjections: MovieProjection[];
};

let seedDemoData: SeedDemoData | null = null;

function getSeedData(): SeedDemoData {
  if (seedDemoData) {
    // eslint-disable-next-line no-console
    console.log('returned cached seed data');
    return seedDemoData;
  }

  const seedDemoDataString = window.localStorage.getItem('seedDemoData');
  const seedDemoDataCachedOn = window.localStorage.getItem('seedDemoDataCachedOn');

  if (seedDemoDataString && seedDemoDataCachedOn && parseInt(seedDemoDataCachedOn) > RESET_SEED_DATA_IF_LOWER_THAN) {
    // eslint-disable-next-line no-console
    console.log('returned cached seed data from localStorage');
    seedDemoData = JSON.parse(seedDemoDataString);

    return seedDemoData as SeedDemoData;
  }

  const countries: Country[] = [
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
  ];

  const genres: Genre[] = [
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
  ];

  const languages: Language[] = [
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
    },
  ];

  const cities: City[] = [
    {
      name: 'Beograd',
      code: 'BG',
      postalCode: '11000',
    },
    {
      name: 'Novi Sad',
      code: 'NS',
      postalCode: '21000',
    },
    {
      name: 'Zrenjanin',
      code: 'ZR',
      postalCode: '23000',
    },
  ];

  const persons: Person[] = [
    {
      id: uuidv4(),
      firstName: 'Robert',
      middleName: 'Džon',
      lastName: 'Dauni Jr',
      dateOfBirth: DateTime.fromObject({
        year: 1965,
        month: 4,
        day: 4,
      }).toJSON() as string,
      gender: 'Male',
      countryOfOrigin: countries[0],
    },
    {
      id: uuidv4(),
      firstName: 'Scarlett',
      lastName: 'Johansson',
      dateOfBirth: DateTime.fromObject({
        year: 1984,
        month: 11,
        day: 22,
      }).toJSON() as string,
      gender: 'Female',
      countryOfOrigin: countries[0],
    },
    {
      id: uuidv4(),
      firstName: 'Dragan',
      lastName: 'Nikolic',
      dateOfBirth: DateTime.fromObject({
        year: 1943,
        month: 8,
        day: 20,
      }).toJSON() as string,
      gender: 'Male',
      countryOfOrigin: countries[1],
    },
    {
      id: uuidv4(),
      firstName: 'Milena',
      lastName: 'Dravic',
      dateOfBirth: DateTime.fromObject({
        year: 1940,
        month: 10,
        day: 14,
      }).toJSON() as string,
      gender: 'Female',
      countryOfOrigin: countries[1],
    },
    {
      id: uuidv4(),
      firstName: 'Aleksandar',
      lastName: 'Djordjevic',
      gender: 'Male',
      countryOfOrigin: countries[1],
    },
    {
      id: uuidv4(),
      firstName: 'Jon',
      lastName: 'Favreau',
      gender: 'Male',
      countryOfOrigin: countries[0],
    },
    {
      id: uuidv4(),
      firstName: 'Joss',
      lastName: 'Whedon',
      gender: 'Male',
      countryOfOrigin: countries[0],
    },
  ];

  const cinemas: Cinema[] = [
    {
      id: uuidv4(),
      name: 'Bioskop Demo Beograd',
      description: 'Bioskop demo Beograd je veliki bioskop u nasem glavnom gradu',
      city: cities[0],
      address: 'Glavna 88',
      phone: ['011/555-1111', '011/555-2222'],
    },
    {
      id: uuidv4(),
      name: 'Bioskop Demo Beograd Mali',
      description: 'Bioskop demo Beograd Mali je mali bioskop u nasem glavnom gradu',
      city: cities[0],
      address: 'Sporedna 99',
      phone: ['011/555-3333'],
    },
    {
      id: uuidv4(),
      name: 'Bioskop Demo Novi Sad',
      description: 'Bioskop demo Novi Sad je u Novom Sad, poznatoj i kao srpska Atina',
      city: cities[1],
      address: 'Dunavska 99',
      phone: ['021/555-8888', '021/555-9999'],
    },
  ];

  const cinemaTheaters: CinemaTheater[] = [
    {
      id: uuidv4(),
      localizedName: 'Sala 1',
      cinema: cinemas[0],
      seatNumber: 55,
      rowNumber: 5,
      supports3D: true,
    },
    {
      id: uuidv4(),
      localizedName: 'Sala 2',
      cinema: cinemas[0],
      seatNumber: 88,
      rowNumber: 7,
      supports3D: false,
    },
    {
      id: uuidv4(),
      localizedName: 'Decja sala',
      cinema: cinemas[0],
      seatNumber: 44,
      rowNumber: 5,
      supports3D: true,
    },
    {
      id: uuidv4(),
      localizedName: 'Velika sala',
      cinema: cinemas[1],
      seatNumber: 66,
      rowNumber: 6,
      supports3D: false,
    },
    {
      id: uuidv4(),
      localizedName: 'Mala sala',
      cinema: cinemas[1],
      seatNumber: 20,
      rowNumber: 3,
      supports3D: false,
    },
    {
      id: uuidv4(),
      localizedName: 'Sala 1',
      cinema: cinemas[2],
      seatNumber: 55,
      rowNumber: 5,
      supports3D: true,
    },
    {
      id: uuidv4(),
      localizedName: 'Sala 2',
      cinema: cinemas[2],
      seatNumber: 88,
      rowNumber: 7,
      supports3D: false,
    },
    {
      id: uuidv4(),
      localizedName: 'Decja sala',
      cinema: cinemas[2],
      seatNumber: 44,
      rowNumber: 5,
      supports3D: true,
    },
  ];

  const movies: Movie[] = [
    {
      id: uuidv4(),
      originalName: 'Iron Man',
      localizedName: 'Gvozdeni covek',
      plot: 'Toni Stark, milijarder industrijalista i izumitelj, otet je i primoran da napravi razarajuće oružje. Koristeći svoju domišljatost i genijalnost, Toni pravi visokotehnološki oklop i zaklinje se da će zaštititi svet kao Gvozdeni čovek.',
      genres: [genres[1], genres[4]],
      actors: [
        {
          person: persons[0],
          role: 'Main',
        },
        {
          person: persons[5],
          role: 'Supporting',
        },
      ],
      director: {
        person: persons[5],
        type: 'Main',
      },
      runtimeMinutes: 126,
      language: languages[0],
      countryOfOrigin: countries[0],
      releaseDate: DateTime.fromObject({
        year: 2008,
        month: 5,
        day: 2,
      }).toJSON() as string,
      rating: 65,
      moviePosterImageFilename: 'iron-man.png',
    },
    {
      id: uuidv4(),
      originalName: 'Avengers',
      localizedName: 'Osvetnici',
      plot: 'Marvel studio predstavlja Osvetnike – fantastičnu grupu superjunaka koju čine Ajron Men, Neverovatni Hulk, Tor, Kapetan Amerika, Jastrebovo Oko i Crna Udovica.',
      genres: [genres[1], genres[4]],
      actors: [
        {
          person: persons[0],
          role: 'Main',
        },
        {
          person: persons[1],
          role: 'Main',
        },
      ],
      director: {
        person: persons[6],
        type: 'Main',
      },
      runtimeMinutes: 143,
      language: languages[0],
      countryOfOrigin: countries[0],
      releaseDate: DateTime.fromObject({
        year: 2012,
        month: 5,
        day: 2,
      }).toJSON() as string,
      rating: 91,
      moviePosterImageFilename: 'avengers.png',
    },
    {
      id: uuidv4(),
      originalName: 'Kako su se volele dve budale',
      localizedName: 'Kako su se volele dve budale',
      plot: 'Emotivna ljubavna prica dvoje mladih ljudi',
      genres: [genres[2], genres[3]],
      actors: [
        {
          person: persons[2],
          role: 'Main',
        },
        {
          person: persons[3],
          role: 'Main',
        },
      ],
      director: {
        person: persons[4],
        type: 'Main',
      },
      runtimeMinutes: 30,
      language: languages[1],
      countryOfOrigin: countries[1],
      releaseDate: DateTime.fromObject({
        year: 1972,
      }).toJSON() as string,
      rating: 33,
    },
  ];

  const generateProjections = (cinema: Cinema, movie: Movie): MovieProjection[] => {
    // generate 4 times in next two weeks
    const now = DateTime.now();
    const today = DateTime.fromObject({
      year: now.year,
      month: now.month,
      day: now.day,
      hour: 9,
    });
    const days = _.shuffle([...Array(14).keys()])
      .slice(0, 6)
      .map((dayOffset) => {
        // for each day return 4 random times between 9 and 23
        return _.shuffle([...Array(14).keys()])
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
          id: uuidv4(),
          movie,
          cinemaTheater: _.sample(cinemaTheaters.filter((ct) => ct.cinema.id === cinema.id)) as CinemaTheater,
          dateTime: dt.toJSON() as string,
        };
      });
  };

  const movieProjections: MovieProjection[] = [
    ...generateProjections(cinemas[0], movies[0]),
    ...generateProjections(cinemas[0], movies[1]),
    ...generateProjections(cinemas[0], movies[2]),
    ...generateProjections(cinemas[1], movies[0]),
    ...generateProjections(cinemas[1], movies[1]),
    ...generateProjections(cinemas[1], movies[2]),
    ...generateProjections(cinemas[2], movies[0]),
    ...generateProjections(cinemas[2], movies[1]),
    ...generateProjections(cinemas[2], movies[2]),
  ];

  seedDemoData = {
    countries,
    genres,
    languages,
    cities,
    persons,
    cinemas,
    cinemaTheaters,
    movies,
    movieProjections,
  };

  window.localStorage.setItem('seedDemoData', JSON.stringify(seedDemoData));
  window.localStorage.setItem('seedDemoDataCachedOn', Date.now().toString());
  // eslint-disable-next-line no-console
  console.log('Cached seed data to local storage!');

  return seedDemoData;
}

export default getSeedData();
