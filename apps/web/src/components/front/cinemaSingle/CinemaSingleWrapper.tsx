import { useEffect, useState } from "react";
import { Cinema } from "../../../types/CinemaTypes";
import CinemasService from "../../../services/CinemasService";
import { Link, useParams, useSearchParams } from "react-router-dom";
import MovieProjectionsService from "../../../services/MovieProjectionsService";
import { ProjectionsGroupedPerDateAndMovieType } from "../../../types/MoviesTypes";
import { DateTime } from "ts-luxon";
import ProjectionsGroupedPerDateAndMovie from "./ProjectionsGroupedPerDateAndMovie";
import { Typography } from "@mui/material";

function CinemaSingleWrapper() {
  const [searchParams] = useSearchParams();
  const {cinemaId} = useParams();
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [cinema, setCinema] = useState<Cinema | undefined>(undefined);
  const [projectionsGroupedPerDateAndMovie, setProjectionsGroupedPerDateAndMovie] = useState<ProjectionsGroupedPerDateAndMovieType | undefined>(undefined);
  const selectedDate = searchParams.get("selectedDate");

  useEffect(() => {
    if (cinemaId !== undefined) {
      Promise.all([
        CinemasService.findById(cinemaId),
        MovieProjectionsService.findAllByCinema(cinemaId)
      ]).then(([cinema,movieProjections]) => {
        setCinema(cinema);
        if (cinema) {
          setProjectionsGroupedPerDateAndMovie(movieProjections.reduce((carry:ProjectionsGroupedPerDateAndMovieType, mp) => {
            // first try to find existing date
            const dateString = DateTime.fromISO(mp.dateTime).toFormat("yyyy-MM-dd");
            const movie = mp.movie;
            const timeObject = {
              movieProjectionId: mp.id,
              time: DateTime.fromISO(mp.dateTime).toFormat("HH:mm")
            };

            if (carry[dateString]) {
              if (carry[dateString].groupedByMovies[movie.id]) {
                // both date and cinema objects exist
                carry[dateString].groupedByMovies[movie.id].movieProjections.push(timeObject);
              } else {
                // date cinema objects exists but not cinema
                carry[dateString].groupedByMovies[movie.id] = {
                  movie,
                  movieProjections: [timeObject]
                }
              }
            } else {
              carry[dateString] = {
                groupedByMovies: {
                  [movie.id]: {
                    movie,
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
              cinema ? (
                <div>
                  <div>
                    <p>Ime: {cinema.name}</p>
                    <p>Opis: {cinema.description}</p>
                    <p>Grad: {cinema.city.name}</p>
                    <p>Adresa: {cinema.address}</p>
                    <p>Telefon: {cinema.phone.length ?
                      cinema.phone.join(", ") :
                      (<template>Nema telefona</template>)
                    }</p>
                  </div>
                  <div>
                    {
                      projectionsGroupedPerDateAndMovie && Object.keys(projectionsGroupedPerDateAndMovie).length > 0 ? (
                        <div>
                          <h2>Projekcije:</h2>
                          <div>
                            {Object.keys(projectionsGroupedPerDateAndMovie).map(date => {
                              return (
                                <span key={date}>
                                  <Link to={`/cinemas/${cinema.id}?selectedDate=${date}`}>
                                    {projectionsGroupedPerDateAndMovie[date].formattedDate}
                                  </Link>
                                  &nbsp;
                                </span>
                              )
                            })}
                          </div>
                          {selectedDate &&
                            <div>
                              <ProjectionsGroupedPerDateAndMovie
                                groupedMovieProjections={projectionsGroupedPerDateAndMovie[selectedDate].groupedByMovies}
                                date={projectionsGroupedPerDateAndMovie[selectedDate].formattedDate}
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
                <h2>Bioskop nije pronadjen</h2>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default CinemaSingleWrapper;