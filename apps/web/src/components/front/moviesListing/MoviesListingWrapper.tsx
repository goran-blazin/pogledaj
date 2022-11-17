import {useState, useEffect} from "react";
import { Movie } from "../../../types/MoviesTypes";
import MoviesService from "../../../services/MoviesService";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import React from "react";
import PageHeader from "../utility/PageHeader";
import SearchTextField from "../utility/SearchTextField";

function MoviesListingWrapper() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    MoviesService.findAll().then(movies => {
      setMovies(movies);
    })
  }, []);

  return (
    <Box>
      <PageHeader headerText={"Filmovi"} />
      <Box mb={'20px'}>
        <SearchTextField
          id={"search-movies"}
          placeholder={"Pronađi filmski naslov"}
        />
      </Box>
      <Box>
        {
          movies.length === 0 ? (
            <Typography
              color={"text.primary"}
            >
              Učitava se, molimo sačekajte...
            </Typography>
          ) : (
            <React.Fragment>
              <Box>
                {movies.map((movie, i) => {
                  return (
                    <div key={movie.id}>
                      <Link to={`/movies/${movie.id}`}>Film broj #{i + 1} - {movie.localizedName}</Link>
                    </div>
                  )
                })}
              </Box>
            </React.Fragment>
          )
        }
      </Box>
    </Box>
  )
}

export default MoviesListingWrapper;
