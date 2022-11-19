import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Cinema} from '../../../types/CinemaTypes';
import CinemasService from '../../../services/CinemasService';
import {Box, Typography} from '@mui/material';
import PageHeader from '../utility/PageHeader';
import SearchTextField from '../utility/SearchTextField';

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
        <SearchTextField id={'search-cinemas'} placeholder={'Pronađi bioskop'} />
      </Box>
      {cinemas.length === 0 ? (
        <Typography color={'text.primary'}>Učitava se, molimo sačekajte...</Typography>
      ) : (
        <div>
          <div>
            {cinemas.map((cinema, i) => {
              return (
                <div key={cinema.id}>
                  <Link to={`/cinemas/${cinema.id}`}>
                    Bioskop broj #{i + 1} - {cinema.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Box>
  );
}

export default CinemasListingWrapper;
