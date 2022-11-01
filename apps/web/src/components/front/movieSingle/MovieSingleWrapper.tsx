import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie, ProjectionsGroupedPerDateAndCinemaType } from "../../../types/MoviesTypes";
import PersonHelper from "../../../helpers/PersonHelper";
import MoviesService from "../../../services/MoviesService";
import MovieProjectionsService from "../../../services/MovieProjectionsService";
import { Link } from "react-router-dom";
import ProjectionsGroupedPerDateAndCinema from "./ProjectionsGroupedPerDateAndCinema";
import { DateTime } from "ts-luxon";
import { Typography } from "@mui/material";

function MovieSingleWrapper() {
  const [searchParams] = useSearchParams();
  const {movieId} = useParams()
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [projectionsGroupedPerDateAndCinema, setProjectionsGroupedPerDateAndCinema] = useState<ProjectionsGroupedPerDateAndCinemaType | undefined>(undefined);
  const selectedDate = searchParams.get("selectedDate");

  useEffect(() => {
    if (movieId !== undefined) {
      Promise.all([
        MoviesService.findById(movieId),
        MovieProjectionsService.findAllByMovie(movieId)
      ]).then(([movie, movieProjections]) => {
        setMovie(movie);
        if (movie) {
          setProjectionsGroupedPerDateAndCinema(movieProjections.reduce((carry:ProjectionsGroupedPerDateAndCinemaType, mp) => {
            // first try to find existing date
            const dateString = DateTime.fromISO(mp.dateTime).toFormat("yyyy-MM-dd");
            const cinema = mp.cinemaTheater.cinema;
            const timeObject = {
              movieProjectionId: mp.id,
              time: DateTime.fromISO(mp.dateTime).toFormat("HH:mm")
            };

            if (carry[dateString]) {
              if (carry[dateString].groupedByCinemas[cinema.id]) {
                // both date and cinema objects exist
                carry[dateString].groupedByCinemas[cinema.id].movieProjections.push(timeObject);
              } else {
                // date cinema objects exists but not cinema
                carry[dateString].groupedByCinemas[cinema.id] = {
                  cinema,
                  movieProjections: [timeObject]
                }
              }
            } else {
              // create whole new date object
              carry[dateString] = {
                groupedByCinemas: {
                  [cinema.id]: {
                    cinema,
                    movieProjections: [timeObject]
                  }
                },
                formattedDate: DateTime.fromISO(mp.dateTime).toFormat("LLL dd")
              };
            }

            return carry;
          }, {}));
        }
      }).finally(() => {
        setLoadingData(false);
      });
    }
  }, []);

  const mainActors = (movie ? movie.actors : []).filter(actor => actor.role === "Main");
  const supportingActors = (movie ? movie.actors : []).filter(actor => actor.role === "Supporting");

  return (
    <div>
      {
        loadingData ? (
          <Typography
            color={"text.primary"}
          >
            Učitava se, molimo sačekajte...
          </Typography>
        ) : (
          <div>
            {
              movie !== undefined ? (
                <div>
                  <div>
                    <h2>Detalji o filmu</h2>
                    <p>Ime: {movie.localizedName}</p>
                    <p>Originalno ime: {movie.originalName}</p>
                    <p>Sinopsis: {movie.plot}</p>
                    <p>Zanrovi: {movie.genres.map(genre => genre.localizedName).join(", ")}</p>
                    {mainActors.length &&
                      <p>Glavni glumci: {
                        mainActors.map(actor => PersonHelper.concatName(actor.person)).join(", ")
                      }</p>
                    }
                    {supportingActors.length > 0 &&
                      <p>Sporedni glumci: {
                        supportingActors.map(actor => PersonHelper.concatName(actor.person)).join(", ")
                      }</p>
                    }
                    <p>Reziser: {
                      PersonHelper.concatName(movie.director.person)
                    }</p>
                    <p>Duzina trajanja: {movie.runtimeMinutes} min</p>
                    <p>Jezik: {movie.language.name}</p>
                    <p>Drzava porekla: {movie.countryOfOrigin.name}</p>
                    <p>Datum izdavanja: {DateTime.fromISO(movie.releaseDate).toFormat("yyyy LLL dd")}</p>
                  </div>
                  <div>
                    {
                      projectionsGroupedPerDateAndCinema !== undefined && Object.keys(projectionsGroupedPerDateAndCinema).length > 0 ? (
                        <div>
                          <h2>Projekcije:</h2>
                          <div>
                            {Object.keys(projectionsGroupedPerDateAndCinema).map(date => {
                              return (
                                <span key={date}>
                                  <Link to={`/movies/${movie.id}?selectedDate=${date}`}>
                                    {projectionsGroupedPerDateAndCinema[date].formattedDate}
                                  </Link>
                                  &nbsp;
                                </span>
                              )
                            })}
                          </div>
                          {selectedDate &&
                            <div>
                              <ProjectionsGroupedPerDateAndCinema
                                groupedMovieProjections={projectionsGroupedPerDateAndCinema[selectedDate].groupedByCinemas}
                              />
                            </div>
                          }
                        </div>
                      ) : (
                        <h2>Projekcije nisu pronadjene</h2>
                      )
                    }
                  </div>
                </div>
              ) : (
                <h2>Film nije pronadjen</h2>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default MovieSingleWrapper;