
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('@prisma/client/runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.20.0
 * Query Engine version: 06fc58a368dc7be9fbbbe894adf8d445d208c284
 */
Prisma.prismaVersion = {
  client: "5.20.0",
  engine: "06fc58a368dc7be9fbbbe894adf8d445d208c284"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.GenreScalarFieldEnum = {
  systemName: 'systemName',
  localizedName: 'localizedName'
};

exports.Prisma.LanguageScalarFieldEnum = {
  code: 'code',
  name: 'name'
};

exports.Prisma.CountryScalarFieldEnum = {
  code: 'code',
  name: 'name'
};

exports.Prisma.CityScalarFieldEnum = {
  id: 'id',
  cityCode: 'cityCode',
  name: 'name',
  postalCode: 'postalCode',
  countryCode: 'countryCode'
};

exports.Prisma.CinemaScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  cityId: 'cityId',
  address: 'address',
  rating: 'rating',
  phone: 'phone',
  posterImages: 'posterImages',
  geoLatitude: 'geoLatitude',
  geoLongitude: 'geoLongitude'
};

exports.Prisma.CinemaTheaterScalarFieldEnum = {
  id: 'id',
  name: 'name',
  cinemaId: 'cinemaId',
  supports3D: 'supports3D',
  posterImages: 'posterImages'
};

exports.Prisma.CinemaSeatGroupScalarFieldEnum = {
  id: 'id',
  cinemaTheaterId: 'cinemaTheaterId',
  name: 'name',
  rowCount: 'rowCount',
  columnCount: 'columnCount',
  position: 'position',
  options: 'options'
};

exports.Prisma.CinemaSeatScalarFieldEnum = {
  id: 'id',
  cinemaSeatGroupId: 'cinemaSeatGroupId',
  seatRow: 'seatRow',
  seatColumn: 'seatColumn',
  options: 'options'
};

exports.Prisma.MovieScalarFieldEnum = {
  id: 'id',
  title: 'title',
  originalTitle: 'originalTitle',
  localizedTitle: 'localizedTitle',
  plot: 'plot',
  localizedPlot: 'localizedPlot',
  runtimeMinutes: 'runtimeMinutes',
  originalLanguageId: 'originalLanguageId',
  countryOfOriginId: 'countryOfOriginId',
  posterImages: 'posterImages',
  videos: 'videos',
  rating: 'rating',
  releaseDate: 'releaseDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  externalId: 'externalId',
  externalType: 'externalType',
  additionalData: 'additionalData'
};

exports.Prisma.PersonScalarFieldEnum = {
  id: 'id',
  name: 'name',
  biography: 'biography',
  dateOfBirth: 'dateOfBirth',
  dateOfDeath: 'dateOfDeath',
  gender: 'gender',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  externalId: 'externalId',
  externalType: 'externalType',
  additionalData: 'additionalData'
};

exports.Prisma.MovieActorScalarFieldEnum = {
  personId: 'personId',
  movieId: 'movieId',
  characterName: 'characterName',
  castOrder: 'castOrder'
};

exports.Prisma.MovieDirectorScalarFieldEnum = {
  personId: 'personId',
  movieId: 'movieId',
  type: 'type'
};

exports.Prisma.MovieProducerScalarFieldEnum = {
  personId: 'personId',
  movieId: 'movieId',
  type: 'type'
};

exports.Prisma.MovieCinemaOverrideScalarFieldEnum = {
  movieId: 'movieId',
  cinemaId: 'cinemaId',
  movieDataOverrides: 'movieDataOverrides',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MovieProjectionScalarFieldEnum = {
  id: 'id',
  movieId: 'movieId',
  cinemaTheaterId: 'cinemaTheaterId',
  projectionDateTime: 'projectionDateTime',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  dubbedLanguageId: 'dubbedLanguageId',
  options: 'options'
};

exports.Prisma.ProjectionPriceScalarFieldEnum = {
  projectionId: 'projectionId',
  groupId: 'groupId',
  type: 'type',
  price: 'price',
  currencyCode: 'currencyCode'
};

exports.Prisma.AdminUserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  fullName: 'fullName',
  role: 'role',
  cinemaIds: 'cinemaIds',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReservationScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  customerInformation: 'customerInformation',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  options: 'options',
  deletedAt: 'deletedAt'
};

exports.Prisma.ReservationSeatsScalarFieldEnum = {
  id: 'id',
  reservationId: 'reservationId',
  eventId: 'eventId',
  seatId: 'seatId',
  options: 'options',
  deletedAt: 'deletedAt',
  validatedAt: 'validatedAt',
  validatedByAdminUserId: 'validatedByAdminUserId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.CinemaSeatGroupPositionEnum = exports.$Enums.CinemaSeatGroupPositionEnum = {
  TopLeft: 'TopLeft',
  TopCenter: 'TopCenter',
  TopRight: 'TopRight',
  CenterLeft: 'CenterLeft',
  Center: 'Center',
  CenterRight: 'CenterRight',
  BottomLeft: 'BottomLeft',
  BottomCenter: 'BottomCenter',
  BottomRight: 'BottomRight'
};

exports.InputProvider = exports.$Enums.InputProvider = {
  Tmdb: 'Tmdb',
  Imdb: 'Imdb',
  AdminInput: 'AdminInput'
};

exports.Gender = exports.$Enums.Gender = {
  Male: 'Male',
  Female: 'Female',
  Other: 'Other'
};

exports.DirectorType = exports.$Enums.DirectorType = {
  Main: 'Main',
  Assistant: 'Assistant'
};

exports.ProducerType = exports.$Enums.ProducerType = {
  Executive: 'Executive',
  Assistant: 'Assistant'
};

exports.PriceType = exports.$Enums.PriceType = {
  Normal: 'Normal'
};

exports.CurrencyCode = exports.$Enums.CurrencyCode = {
  RSD: 'RSD',
  USD: 'USD',
  EUR: 'EUR',
  CHF: 'CHF'
};

exports.AdminRole = exports.$Enums.AdminRole = {
  SuperAdmin: 'SuperAdmin',
  Manager: 'Manager',
  Employee: 'Employee'
};

exports.Prisma.ModelName = {
  Genre: 'Genre',
  Language: 'Language',
  Country: 'Country',
  City: 'City',
  Cinema: 'Cinema',
  CinemaTheater: 'CinemaTheater',
  CinemaSeatGroup: 'CinemaSeatGroup',
  CinemaSeat: 'CinemaSeat',
  Movie: 'Movie',
  Person: 'Person',
  MovieActor: 'MovieActor',
  MovieDirector: 'MovieDirector',
  MovieProducer: 'MovieProducer',
  MovieCinemaOverride: 'MovieCinemaOverride',
  MovieProjection: 'MovieProjection',
  ProjectionPrice: 'ProjectionPrice',
  AdminUser: 'AdminUser',
  Reservation: 'Reservation',
  ReservationSeats: 'ReservationSeats'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
