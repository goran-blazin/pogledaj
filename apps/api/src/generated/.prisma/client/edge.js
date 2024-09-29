
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('@prisma/client/runtime/edge.js')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

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
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/goran/Projects/pogledaj/apps/api/node_modules/@prisma/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [
      "typedSql"
    ],
    "sourceFilePath": "/Users/goran/Projects/pogledaj/apps/api/prisma/schema.prisma"
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../../../prisma",
  "clientVersion": "5.20.0",
  "engineVersion": "06fc58a368dc7be9fbbbe894adf8d445d208c284",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// prisma/schema.prisma\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"typedSql\"]\n}\n\n// ENUMS\n\nenum Gender {\n  Male\n  Female\n  Other\n}\n\nenum DirectorType {\n  Main\n  Assistant\n}\n\nenum ProducerType {\n  Executive\n  Assistant\n}\n\nenum ProjectionType {\n  Movie\n  TheaterPlay\n}\n\nenum CinemaSeatGroupPositionEnum {\n  TopLeft\n  TopCenter\n  TopRight\n  CenterLeft\n  Center\n  CenterRight\n  BottomLeft\n  BottomCenter\n  BottomRight\n}\n\nenum AdminRole {\n  SuperAdmin\n  Manager\n  Employee\n}\n\nenum InputProvider {\n  Tmdb\n  Imdb\n  AdminInput\n}\n\nenum PriceType {\n  Normal\n}\n\nenum CurrencyCode {\n  RSD\n  USD\n  EUR\n  CHF\n}\n\n// TABLES\n\nmodel Genre {\n  systemName    String  @id\n  localizedName String  @unique\n  movies        Movie[]\n}\n\nmodel Language {\n  code String @id\n  name String @unique\n\n  originalLanguageMovies         Movie[]           @relation(\"OriginalLanguage\")\n  dubbedLanguageMovieProjections MovieProjection[] @relation(\"DubbedLanguage\")\n}\n\nmodel Country {\n  code   String  @id\n  name   String  @unique\n  cities City[]\n  movies Movie[]\n}\n\nmodel City {\n  id          String   @id @default(uuid()) @db.Uuid\n  cityCode    String\n  name        String\n  postalCode  String\n  countryCode String\n  country     Country  @relation(fields: [countryCode], references: [code])\n  cinemas     Cinema[]\n\n  @@unique([cityCode, countryCode])\n}\n\nmodel Cinema {\n  id                   String                @id @default(uuid()) @db.Uuid\n  name                 String                @unique\n  description          String\n  cityId               String                @db.Uuid\n  city                 City                  @relation(fields: [cityId], references: [id])\n  address              String\n  rating               Int\n  phone                Json                  @default(\"[]\")\n  posterImages         Json                  @default(\"[]\")\n  geoLatitude          Decimal?              @db.Decimal(10, 6)\n  geoLongitude         Decimal?              @db.Decimal(10, 6)\n  cinemaTheaters       CinemaTheater[]\n  movieCinemaOverrides MovieCinemaOverride[]\n}\n\nmodel CinemaTheater {\n  id               String            @id @default(uuid()) @db.Uuid\n  name             String\n  cinemaId         String            @db.Uuid\n  cinema           Cinema            @relation(fields: [cinemaId], references: [id])\n  supports3D       Boolean           @default(false)\n  posterImages     Json              @default(\"[]\")\n  cinemaSeatGroups CinemaSeatGroup[]\n  movieProjections MovieProjection[]\n}\n\nmodel CinemaSeatGroup {\n  id               String                      @id @default(uuid()) @db.Uuid\n  cinemaTheaterId  String                      @db.Uuid\n  cinemaTheater    CinemaTheater               @relation(fields: [cinemaTheaterId], references: [id])\n  name             String\n  rowCount         Int\n  columnCount      Int\n  cinemaSeats      CinemaSeat[]\n  position         CinemaSeatGroupPositionEnum @default(Center)\n  options          Json                        @default(\"{}\")\n  projectionPrices ProjectionPrice[]           @relation(\"CinemaSeatGroupPrices\")\n\n  @@unique([position, cinemaTheaterId])\n}\n\nmodel CinemaSeat {\n  id                String             @id @default(uuid()) @db.Uuid\n  cinemaSeatGroupId String             @db.Uuid\n  cinemaSeatGroup   CinemaSeatGroup    @relation(fields: [cinemaSeatGroupId], references: [id])\n  seatRow           String\n  seatColumn        String\n  options           Json               @default(\"{}\")\n  reservation       ReservationSeats[] @relation(\"CinemaSeatReservations\")\n}\n\nmodel Movie {\n  id                   String                @id @default(uuid()) @db.Uuid\n  title                String?\n  originalTitle        String\n  localizedTitle       String?\n  plot                 String\n  localizedPlot        String?\n  genres               Genre[]\n  runtimeMinutes       Int\n  originalLanguageId   String\n  originalLanguage     Language              @relation(fields: [originalLanguageId], references: [code], name: \"OriginalLanguage\")\n  countryOfOriginId    String\n  countryOfOrigin      Country               @relation(fields: [countryOfOriginId], references: [code])\n  posterImages         Json                  @default(\"{}\")\n  videos               Json                  @default(\"[]\")\n  rating               Int\n  releaseDate          DateTime              @db.Date\n  createdAt            DateTime              @default(now())\n  updatedAt            DateTime\n  actors               MovieActor[]\n  directors            MovieDirector[]\n  producers            MovieProducer[]\n  movieCinemaOverrides MovieCinemaOverride[]\n  movieProjections     MovieProjection[]\n  externalId           String\n  externalType         InputProvider\n  additionalData       Json                  @default(\"{}\")\n\n  @@unique([externalId, externalType])\n}\n\nmodel Person {\n  id               String          @id @default(uuid()) @db.Uuid\n  name             String\n  biography        String          @default(\"\")\n  dateOfBirth      DateTime?       @db.Date\n  dateOfDeath      DateTime?       @db.Date\n  gender           Gender\n  createdAt        DateTime        @default(now())\n  updatedAt        DateTime\n  actorInMovies    MovieActor[]\n  directorInMovies MovieDirector[]\n  producerInMovies MovieProducer[]\n  externalId       String\n  externalType     InputProvider\n  additionalData   Json            @default(\"{}\")\n\n  @@unique([externalId, externalType])\n  @@index([name(ops: raw(\"gin_trgm_ops\"))], type: Gin)\n}\n\nmodel MovieActor {\n  personId      String @db.Uuid\n  person        Person @relation(fields: [personId], references: [id])\n  movieId       String @db.Uuid\n  movie         Movie  @relation(fields: [movieId], references: [id])\n  characterName String\n  castOrder     Int\n\n  @@id([personId, movieId])\n}\n\nmodel MovieDirector {\n  personId String       @db.Uuid\n  person   Person       @relation(fields: [personId], references: [id])\n  movieId  String       @db.Uuid\n  movie    Movie        @relation(fields: [movieId], references: [id])\n  type     DirectorType\n\n  @@id([personId, movieId])\n}\n\nmodel MovieProducer {\n  personId String       @db.Uuid\n  person   Person       @relation(fields: [personId], references: [id])\n  movieId  String       @db.Uuid\n  movie    Movie        @relation(fields: [movieId], references: [id])\n  type     ProducerType\n\n  @@id([personId, movieId])\n}\n\nmodel MovieCinemaOverride {\n  movieId            String   @db.Uuid\n  cinemaId           String   @db.Uuid\n  movie              Movie    @relation(fields: [movieId], references: [id])\n  cinema             Cinema   @relation(fields: [cinemaId], references: [id])\n  movieDataOverrides Json     @default(\"{}\")\n  createdAt          DateTime @default(now())\n  updatedAt          DateTime\n\n  @@id([movieId, cinemaId])\n}\n\nmodel MovieProjection {\n  id                 String            @id @default(uuid()) @db.Uuid\n  movieId            String            @db.Uuid\n  movie              Movie             @relation(fields: [movieId], references: [id])\n  cinemaTheaterId    String            @db.Uuid\n  cinemaTheater      CinemaTheater     @relation(fields: [cinemaTheaterId], references: [id])\n  projectionDateTime DateTime          @db.Timestamptz(3)\n  createdAt          DateTime          @default(now())\n  updatedAt          DateTime\n  dubbedLanguageId   String?\n  dubbedLanguage     Language?         @relation(fields: [dubbedLanguageId], references: [code], name: \"DubbedLanguage\")\n  options            Json              @default(\"{}\")\n  projectionPrices   ProjectionPrice[] @relation(\"MovieProjectionPrices\")\n  reservations       Reservation[]     @relation(\"MovieProjectionReservations\")\n}\n\nmodel ProjectionPrice {\n  projectionId    String          @db.Uuid\n  groupId         String          @db.Uuid\n  type            PriceType       @default(Normal)\n  price           Decimal         @db.Decimal\n  currencyCode    CurrencyCode\n  cinemaSeatGroup CinemaSeatGroup @relation(\"CinemaSeatGroupPrices\", fields: [groupId], references: [id])\n  movieProjection MovieProjection @relation(\"MovieProjectionPrices\", fields: [projectionId], references: [id])\n\n  @@id([projectionId, groupId])\n}\n\nmodel AdminUser {\n  id                        String             @id @default(uuid()) @db.Uuid\n  email                     String             @unique\n  password                  String\n  fullName                  String\n  role                      AdminRole\n  cinemaIds                 Json               @default(\"[]\")\n  createdAt                 DateTime           @default(now())\n  updatedAt                 DateTime\n  ValidatedReservationSeats ReservationSeats[]\n}\n\nmodel Reservation {\n  id                  String             @id @default(uuid()) @db.Uuid\n  eventId             String             @db.Uuid\n  movieProjection     MovieProjection    @relation(\"MovieProjectionReservations\", fields: [eventId], references: [id])\n  customerInformation Json               @default(\"{}\")\n  createdAt           DateTime           @default(now())\n  updatedAt           DateTime\n  options             Json               @default(\"{}\")\n  reservationSeats    ReservationSeats[]\n  deletedAt           DateTime?\n\n  @@index([eventId])\n}\n\nmodel ReservationSeats {\n  id                     String      @id @default(uuid()) @db.Uuid\n  reservationId          String      @db.Uuid\n  eventId                String      @db.Uuid\n  seatId                 String      @db.Uuid\n  reservation            Reservation @relation(fields: [reservationId], references: [id])\n  cinemaSeat             CinemaSeat  @relation(\"CinemaSeatReservations\", fields: [seatId], references: [id])\n  options                Json        @default(\"{}\")\n  deletedAt              DateTime?\n  validatedAt            DateTime?\n  validatedByAdminUserId String?     @db.Uuid\n  validatedByAdminUser   AdminUser?  @relation(fields: [validatedByAdminUserId], references: [id])\n\n  @@unique([reservationId, seatId])\n  @@unique([seatId, eventId, deletedAt])\n  @@index([reservationId])\n}\n",
  "inlineSchemaHash": "7bb39a4e1c17f44c1164b0df4c20f41107cb3fda062630fe5f918e9990391a8f",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Genre\":{\"dbName\":null,\"fields\":[{\"name\":\"systemName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"localizedName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movies\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Movie\",\"relationName\":\"GenreToMovie\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Language\":{\"dbName\":null,\"fields\":[{\"name\":\"code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"originalLanguageMovies\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Movie\",\"relationName\":\"OriginalLanguage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dubbedLanguageMovieProjections\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MovieProjection\",\"relationName\":\"DubbedLanguage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Country\":{\"dbName\":null,\"fields\":[{\"name\":\"code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cities\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"City\",\"relationName\":\"CityToCountry\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movies\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Movie\",\"relationName\":\"CountryToMovie\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"City\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cityCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"postalCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Country\",\"relationName\":\"CityToCountry\",\"relationFromFields\":[\"countryCode\"],\"relationToFields\":[\"code\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinemas\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Cinema\",\"relationName\":\"CinemaToCity\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"cityCode\",\"countryCode\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"cityCode\",\"countryCode\"]}],\"isGenerated\":false},\"Cinema\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cityId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"City\",\"relationName\":\"CinemaToCity\",\"relationFromFields\":[\"cityId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rating\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"[]\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"posterImages\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"[]\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"geoLatitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"geoLongitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinemaTheaters\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CinemaTheater\",\"relationName\":\"CinemaToCinemaTheater\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movieCinemaOverrides\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MovieCinemaOverride\",\"relationName\":\"CinemaToMovieCinemaOverride\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CinemaTheater\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinemaId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinema\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Cinema\",\"relationName\":\"CinemaToCinemaTheater\",\"relationFromFields\":[\"cinemaId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"supports3D\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"posterImages\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"[]\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinemaSeatGroups\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CinemaSeatGroup\",\"relationName\":\"CinemaSeatGroupToCinemaTheater\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movieProjections\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MovieProjection\",\"relationName\":\"CinemaTheaterToMovieProjection\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CinemaSeatGroup\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinemaTheaterId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinemaTheater\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CinemaTheater\",\"relationName\":\"CinemaSeatGroupToCinemaTheater\",\"relationFromFields\":[\"cinemaTheaterId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rowCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"columnCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinemaSeats\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CinemaSeat\",\"relationName\":\"CinemaSeatToCinemaSeatGroup\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"position\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CinemaSeatGroupPositionEnum\",\"default\":\"Center\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"options\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"projectionPrices\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProjectionPrice\",\"relationName\":\"CinemaSeatGroupPrices\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"position\",\"cinemaTheaterId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"position\",\"cinemaTheaterId\"]}],\"isGenerated\":false},\"CinemaSeat\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinemaSeatGroupId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinemaSeatGroup\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CinemaSeatGroup\",\"relationName\":\"CinemaSeatToCinemaSeatGroup\",\"relationFromFields\":[\"cinemaSeatGroupId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seatRow\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seatColumn\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"options\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reservation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ReservationSeats\",\"relationName\":\"CinemaSeatReservations\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Movie\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"originalTitle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"localizedTitle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"plot\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"localizedPlot\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"genres\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Genre\",\"relationName\":\"GenreToMovie\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"runtimeMinutes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"originalLanguageId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"originalLanguage\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Language\",\"relationName\":\"OriginalLanguage\",\"relationFromFields\":[\"originalLanguageId\"],\"relationToFields\":[\"code\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryOfOriginId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryOfOrigin\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Country\",\"relationName\":\"CountryToMovie\",\"relationFromFields\":[\"countryOfOriginId\"],\"relationToFields\":[\"code\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"posterImages\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"[]\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rating\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"releaseDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actors\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MovieActor\",\"relationName\":\"MovieToMovieActor\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"directors\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MovieDirector\",\"relationName\":\"MovieToMovieDirector\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"producers\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MovieProducer\",\"relationName\":\"MovieToMovieProducer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movieCinemaOverrides\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MovieCinemaOverride\",\"relationName\":\"MovieToMovieCinemaOverride\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movieProjections\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MovieProjection\",\"relationName\":\"MovieToMovieProjection\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"externalId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"externalType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"InputProvider\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"additionalData\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"externalId\",\"externalType\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"externalId\",\"externalType\"]}],\"isGenerated\":false},\"Person\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"biography\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dateOfBirth\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dateOfDeath\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gender\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Gender\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actorInMovies\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MovieActor\",\"relationName\":\"MovieActorToPerson\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"directorInMovies\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MovieDirector\",\"relationName\":\"MovieDirectorToPerson\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"producerInMovies\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MovieProducer\",\"relationName\":\"MovieProducerToPerson\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"externalId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"externalType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"InputProvider\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"additionalData\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"externalId\",\"externalType\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"externalId\",\"externalType\"]}],\"isGenerated\":false},\"MovieActor\":{\"dbName\":null,\"fields\":[{\"name\":\"personId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"person\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Person\",\"relationName\":\"MovieActorToPerson\",\"relationFromFields\":[\"personId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movieId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movie\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Movie\",\"relationName\":\"MovieToMovieActor\",\"relationFromFields\":[\"movieId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"characterName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"castOrder\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"personId\",\"movieId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"MovieDirector\":{\"dbName\":null,\"fields\":[{\"name\":\"personId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"person\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Person\",\"relationName\":\"MovieDirectorToPerson\",\"relationFromFields\":[\"personId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movieId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movie\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Movie\",\"relationName\":\"MovieToMovieDirector\",\"relationFromFields\":[\"movieId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DirectorType\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"personId\",\"movieId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"MovieProducer\":{\"dbName\":null,\"fields\":[{\"name\":\"personId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"person\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Person\",\"relationName\":\"MovieProducerToPerson\",\"relationFromFields\":[\"personId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movieId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movie\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Movie\",\"relationName\":\"MovieToMovieProducer\",\"relationFromFields\":[\"movieId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProducerType\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"personId\",\"movieId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"MovieCinemaOverride\":{\"dbName\":null,\"fields\":[{\"name\":\"movieId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinemaId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movie\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Movie\",\"relationName\":\"MovieToMovieCinemaOverride\",\"relationFromFields\":[\"movieId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinema\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Cinema\",\"relationName\":\"CinemaToMovieCinemaOverride\",\"relationFromFields\":[\"cinemaId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movieDataOverrides\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"movieId\",\"cinemaId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"MovieProjection\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movieId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movie\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Movie\",\"relationName\":\"MovieToMovieProjection\",\"relationFromFields\":[\"movieId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinemaTheaterId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinemaTheater\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CinemaTheater\",\"relationName\":\"CinemaTheaterToMovieProjection\",\"relationFromFields\":[\"cinemaTheaterId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"projectionDateTime\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dubbedLanguageId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dubbedLanguage\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Language\",\"relationName\":\"DubbedLanguage\",\"relationFromFields\":[\"dubbedLanguageId\"],\"relationToFields\":[\"code\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"options\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"projectionPrices\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProjectionPrice\",\"relationName\":\"MovieProjectionPrices\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reservations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Reservation\",\"relationName\":\"MovieProjectionReservations\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProjectionPrice\":{\"dbName\":null,\"fields\":[{\"name\":\"projectionId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groupId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"PriceType\",\"default\":\"Normal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currencyCode\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CurrencyCode\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinemaSeatGroup\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CinemaSeatGroup\",\"relationName\":\"CinemaSeatGroupPrices\",\"relationFromFields\":[\"groupId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movieProjection\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MovieProjection\",\"relationName\":\"MovieProjectionPrices\",\"relationFromFields\":[\"projectionId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"projectionId\",\"groupId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"AdminUser\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fullName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AdminRole\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinemaIds\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"[]\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ValidatedReservationSeats\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ReservationSeats\",\"relationName\":\"AdminUserToReservationSeats\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Reservation\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"movieProjection\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MovieProjection\",\"relationName\":\"MovieProjectionReservations\",\"relationFromFields\":[\"eventId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customerInformation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"options\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reservationSeats\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ReservationSeats\",\"relationName\":\"ReservationToReservationSeats\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deletedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ReservationSeats\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reservationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seatId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reservation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Reservation\",\"relationName\":\"ReservationToReservationSeats\",\"relationFromFields\":[\"reservationId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cinemaSeat\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CinemaSeat\",\"relationName\":\"CinemaSeatReservations\",\"relationFromFields\":[\"seatId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"options\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deletedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"validatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"validatedByAdminUserId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"validatedByAdminUser\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AdminUser\",\"relationName\":\"AdminUserToReservationSeats\",\"relationFromFields\":[\"validatedByAdminUserId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"reservationId\",\"seatId\"],[\"seatId\",\"eventId\",\"deletedAt\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"reservationId\",\"seatId\"]},{\"name\":null,\"fields\":[\"seatId\",\"eventId\",\"deletedAt\"]}],\"isGenerated\":false}},\"enums\":{\"Gender\":{\"values\":[{\"name\":\"Male\",\"dbName\":null},{\"name\":\"Female\",\"dbName\":null},{\"name\":\"Other\",\"dbName\":null}],\"dbName\":null},\"DirectorType\":{\"values\":[{\"name\":\"Main\",\"dbName\":null},{\"name\":\"Assistant\",\"dbName\":null}],\"dbName\":null},\"ProducerType\":{\"values\":[{\"name\":\"Executive\",\"dbName\":null},{\"name\":\"Assistant\",\"dbName\":null}],\"dbName\":null},\"ProjectionType\":{\"values\":[{\"name\":\"Movie\",\"dbName\":null},{\"name\":\"TheaterPlay\",\"dbName\":null}],\"dbName\":null},\"CinemaSeatGroupPositionEnum\":{\"values\":[{\"name\":\"TopLeft\",\"dbName\":null},{\"name\":\"TopCenter\",\"dbName\":null},{\"name\":\"TopRight\",\"dbName\":null},{\"name\":\"CenterLeft\",\"dbName\":null},{\"name\":\"Center\",\"dbName\":null},{\"name\":\"CenterRight\",\"dbName\":null},{\"name\":\"BottomLeft\",\"dbName\":null},{\"name\":\"BottomCenter\",\"dbName\":null},{\"name\":\"BottomRight\",\"dbName\":null}],\"dbName\":null},\"AdminRole\":{\"values\":[{\"name\":\"SuperAdmin\",\"dbName\":null},{\"name\":\"Manager\",\"dbName\":null},{\"name\":\"Employee\",\"dbName\":null}],\"dbName\":null},\"InputProvider\":{\"values\":[{\"name\":\"Tmdb\",\"dbName\":null},{\"name\":\"Imdb\",\"dbName\":null},{\"name\":\"AdminInput\",\"dbName\":null}],\"dbName\":null},\"PriceType\":{\"values\":[{\"name\":\"Normal\",\"dbName\":null}],\"dbName\":null},\"CurrencyCode\":{\"values\":[{\"name\":\"RSD\",\"dbName\":null},{\"name\":\"USD\",\"dbName\":null},{\"name\":\"EUR\",\"dbName\":null},{\"name\":\"CHF\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

