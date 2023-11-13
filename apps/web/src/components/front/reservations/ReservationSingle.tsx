import {ReservationWithMovieProjection} from '../../../types/ReservationTypes';
import {Box, Button, Card, CardContent, CardMedia, Typography} from '@mui/material';
import CustomerHelper from '../../../helpers/CustomerHelper';
import ImageHelper from '../../../helpers/ImageHelper';

function ReservationSingle({reservation}: {reservation: ReservationWithMovieProjection}) {
  const movie = reservation.movieProjection.movie;
  const cinemaTheater = reservation.movieProjection.cinemaTheater;
  const resizedImageSrc = ImageHelper.getImagePath({
    imageFilePath: movie.posterImages.mediumPoster || 'movie-big-card-placeholder.png',
    transformations: {
      width: 300,
      aspectRatio: {
        width: 1,
        height: 1,
      },
      defaultImage: ImageHelper.getPlaceholderImagePath({
        imageFilePath: 'movie-big-card-placeholder.png',
        omitCdnURL: true,
      }),
    },
  });

  const buttonStyle = {
    fontSize: '12px',
    padding: '0',
  };

  const typoStyle = {
    fontSize: '12px',
  };

  return (
    <Card sx={{display: 'flex', backgroundColor: 'white', border: 'none', boxShadow: 'none', pb: 3, borderRadius: 0}}>
      <CardMedia
        component="img"
        sx={{width: '40%', borderRadius: '12%', mr: 2}}
        image={resizedImageSrc}
        alt="Live from space album cover"
      />
      <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <CardContent sx={{flex: '1 0 auto', padding: '0'}}>
          <Typography sx={typoStyle}>{movie.localizedTitle}</Typography>
          <Typography sx={typoStyle}>Bioskop: {cinemaTheater.cinema.name}</Typography>
          <Typography sx={typoStyle}>
            Termin: {CustomerHelper.formatDateMovieProjection(reservation.movieProjection.projectionDateTime)}
          </Typography>
          <Typography sx={typoStyle}>Sala: {cinemaTheater.name}</Typography>
          <Typography sx={typoStyle}>Broj karata: {reservation.reservationSeats.length}</Typography>
          <Typography sx={typoStyle}>Placeno: Ne</Typography>
        </CardContent>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
          <Button sx={buttonStyle} variant={'outlined'}>
            Prikaži QR kod
          </Button>
          <Button sx={buttonStyle} variant={'outlined'}>
            Otkaži
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default ReservationSingle;
