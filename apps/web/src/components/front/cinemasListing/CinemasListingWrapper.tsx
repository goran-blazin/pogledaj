import React, {useState, useEffect} from 'react';
import {Cinema} from '../../../types/CinemaTypes';
import CinemasService from '../../../services/CinemasService';
import { Box, Typography } from "@mui/material";
import PageHeader from '../utility/PageHeader';
import SearchTextField from '../utility/SearchTextField';
import CinemaBigCard from "../utility/cards/CinemaBigCard";
import FilterButton from "../utility/FilterButton";

function CinemasListingWrapper() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  useEffect(() => {
    CinemasService.findAll().then((cinemas) => {
      setCinemas(cinemas);
    });
  }, []);

  return (
    <Box>
      <PageHeader headerText={'Bioskopi'} />
      <Box mb={'20px'}>
        <SearchTextField
          id={'search-cinemas'}
          placeholder={'Pronađi bioskop'}
          EndAdornment={<FilterButton />}
        />
      </Box>
      {cinemas.length === 0 ? (
        <Typography color={'text.primary'}>Učitava se, molimo sačekajte...</Typography>
      ) : (
        <Box>
            {cinemas.map((cinema, i) => {
              return (
                <Box mb={"13px"} key={i}>
                  <CinemaBigCard cinema={cinema} key={i} />
                </Box>
              );
            })}
        </Box>
      )}
    </Box>
  );
}

export default CinemasListingWrapper;
