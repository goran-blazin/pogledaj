import {ReservationWithMovieProjection} from '../../../types/ReservationTypes';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import CustomerHelper from '../../../helpers/CustomerHelper';
import ImageHelper from '../../../helpers/ImageHelper';
import useReservationsStore from '../../../store/ReservationsStore';
import LoadingButton from '@mui/lab/LoadingButton';
import {useState} from 'react';
import React from 'react';

function CancelReservationDialog({open, handleClose}: {open: boolean; handleClose: (cancel?: boolean) => void}) {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Brisanje rezervacije'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{color: 'rgba(0, 0, 0, 0.6)'}}>
          Da li ste sigurni da želite da otkažete rezervaciju?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>NE</Button>
        <Button onClick={() => handleClose(true)} autoFocus>
          DA
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function ReservationSingle({reservation}: {reservation: ReservationWithMovieProjection}) {
  const reservationsStore = useReservationsStore();
  const movie = reservation.movieProjection.movie;
  const cinemaTheater = reservation.movieProjection.cinemaTheater;
  const [loadingButtonCancel, setLoadingButtonCancel] = useState<boolean>(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);

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

  const cancelReservation = async (reservationId: string) => {
    try {
      setLoadingButtonCancel(true);
      await reservationsStore.cancelReservation(reservationId);
    } finally {
      setLoadingButtonCancel(false);
    }
  };

  return (
    <React.Fragment>
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
            <LoadingButton
              loading={loadingButtonCancel}
              onClick={() => setCancelDialogOpen(true)}
              sx={buttonStyle}
              variant={'outlined'}
            >
              Otkaži
            </LoadingButton>
          </Box>
        </Box>
      </Card>
      <CancelReservationDialog
        open={cancelDialogOpen}
        handleClose={(cancel) => {
          if (cancel) {
            cancelReservation(reservation.id);
          }

          setCancelDialogOpen(false);
        }}
      />
    </React.Fragment>
  );
}

export default ReservationSingle;
