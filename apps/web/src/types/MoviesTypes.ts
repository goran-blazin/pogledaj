import {Country, Genre, Language} from "./GeneralTypes";
import { ActorMovie, DirectorMovie, ProducerMovie } from "./PeopleTypes";
import { Cinema, CinemaTheater } from "./CinemaTypes";

export type Movie = {
	id: string,
	originalName: string,
	localizedName: string,
	plot: string,
	genres: Genre[],
	actors: ActorMovie[],
	director: DirectorMovie,
	producers?: ProducerMovie[]
	runtimeMinutes: number,
	language: Language,
	countryOfOrigin: Country,
	releaseDate: string
};

export type MovieProjection = {
	id: string,
	movie: Movie,
	cinemaTheater: CinemaTheater,
	dateTime: string
}

export type ProjectionsGroupedPerCinemaType = {
	[cinemaId: string]: {
		cinema: Cinema,
		movieProjections: {
			movieProjectionId: string,
			time: string
		}[]
	}
}

export type ProjectionsGroupedPerDateAndCinemaType = {
	[date: string]: {
		formattedDate: string,
		groupedByCinemas: ProjectionsGroupedPerCinemaType
	}
}

export type ProjectionsGroupedPerMoviesType = {
	[movieId: string]: {
		movie: Movie,
		movieProjections: {
			movieProjectionId: string,
			time: string
		}[]
	}
}

export type ProjectionsGroupedPerDateAndMovieType = {
	[date: string]: {
		formattedDate: string,
		groupedByMovies: ProjectionsGroupedPerMoviesType
	}
}