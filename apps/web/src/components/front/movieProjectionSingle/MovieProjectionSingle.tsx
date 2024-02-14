import {useNavigate, useParams} from 'react-router-dom';
import {useQuery} from 'react-query';
import MovieProjectionsService from '../../../services/MovieProjectionsService';
import {Typography, styled, Box} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, {useState} from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import {namedRoutes} from '../../../routes';
import useReservationsStore from '../../../store/ReservationsStore';
import CustomerHelper from '../../../helpers/CustomerHelper';
import BigInfoDialog from '../utility/BigInfoDialog';

const CinemaCanvasHolder = styled('div')({
  display: 'flex',
  width: '100%',
  minHeight: '150px',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  '& .container': {
    width: '90%',
  },
});

type ToggleSeat = (row: number, column: number) => void;

type BoardProps = {
  rows: number;
  columns: number;
  squareMarginPercentage: number;
  seats: Seat[][];
  toggleSeat: (row: number, column: number) => void;
};

type SeatState = 'available' | 'chosen' | 'unavailable' | 'disabled';

// type ReservedSeat = {
//   seatId: string;
//   reservationId: string;
// };

type Seat = {
  seatId?: string;
  state: SeatState;
  rowIndex: number;
  colIndex: number;
};

const seatColorMap: Record<SeatState, {color: string; verboseName: string}> = {
  available: {
    color: '#D6D6D6',
    verboseName: 'Slobodno',
  },
  chosen: {
    color: '#3274F6',
    verboseName: 'Vaš izbor',
  },
  unavailable: {
    color: '#F7DA68',
    verboseName: 'Zauzeto',
  },
  disabled: {
    color: '#FFFFFF',
    verboseName: 'Nedostupno',
  },
};

const CinemaSeatBoard: React.FC<BoardProps> = ({rows, columns, squareMarginPercentage, seats, toggleSeat}) => {
  const cols = columns + 1;
  const margin = `${squareMarginPercentage / cols}%`;
  const containerWidth = `calc(${100 / cols}% - ${margin})`;

  // Generate column headers
  const columnHeaders = Array.from({length: cols}, (_, i) => i);

  return (
    <Box sx={{maxWidth: '100%', overflowX: 'auto'}}>
      {/* Column numbering */}
      <Box sx={{display: 'flex'}}>
        {columnHeaders.map((number) => (
          <Box
            key={number}
            sx={{
              width: containerWidth,
              margin: `0 ${margin} ${margin} 0`,
              fontSize: '3vw',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center', // Center the text horizontally
            }}
          >
            {number > 0 ? number : ''} {/* Display the column number */}
          </Box>
        ))}
      </Box>

      {/* Chessboard squares */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          position: 'relative',
        }}
      >
        {Array.from({length: rows * cols}, (_, index) => {
          const rowIndex = Math.floor(index / cols);
          const colIndex = index % cols;

          return colIndex === 0 ? (
            <Box
              key={index}
              sx={{
                width: containerWidth,
                margin: `0 ${margin} ${margin} 0`, // Right and bottom margin
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center', // Center the text horizontally
                fontSize: '3vw',
              }}
            >
              {rowIndex + 1}
            </Box>
          ) : (
            <Box
              onClick={() => toggleSeat(rowIndex, colIndex - 1)}
              key={index}
              sx={{
                width: containerWidth,
                margin: `0 ${margin} ${margin} 0`, // Right and bottom margin
                '&:before': {
                  content: '""',
                  display: 'block',
                  paddingBottom: `calc(100% - ${margin})`, // Maintain aspect ratio
                },
                position: 'relative',
                backgroundColor: seatColorMap[seats[rowIndex][colIndex - 1].state].color,
                borderRadius: '30%', // Rounded corners
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderRadius: 'inherit', // Inherit borderRadius
                  backgroundColor: 'inherit', // Inherit backgroundColor
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

function StatusIndicator() {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%', // Set the width you prefer
        padding: '2vh 5px',
        borderRadius: '12px', // Adjust as needed
        backgroundColor: theme.customBackground.primary, // Adjust as needed
      })}
    >
      {Object.values(seatColorMap).map((seatColor, i) => {
        return (
          <Box sx={{display: 'flex', alignItems: 'center'}} key={i}>
            <Box
              sx={{
                width: '4vw',
                height: '4vw',
                borderRadius: '30%',
                backgroundColor: seatColor.color, // Use the correct color
                marginRight: '4px',
              }}
            />
            <Typography sx={{fontSize: '3vw'}}>{seatColor.verboseName}</Typography>
          </Box>
        );
      })}
    </Box>
  );
}

const SeatsSelected: React.FC<{seats: Seat[]; toggleSeat: ToggleSeat}> = ({seats, toggleSeat}) => {
  return (
    <Box>
      {seats.map((seat, index) => {
        return (
          <Box key={index}>
            Mesto {index + 1}: red {seat.rowIndex + 1} sedište {seat.colIndex + 1}
            <IconButton aria-label="remove" color="primary" onClick={() => toggleSeat(seat.rowIndex, seat.colIndex)}>
              <HighlightOffIcon />
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );
};

function MovieProjectionSingle() {
  const navigate = useNavigate();
  const {movieProjectionId} = useParams();
  const [seats, setSeats] = useState<Seat[][]>();
  const [successReservationDialogOpen, setSuccessReservationDialogOpen] = useState(false);
  const [reserveButtonLoading, setReserveButtonLoading] = React.useState(false);
  const reservationsStore = useReservationsStore();

  const getAllSeats = (state?: SeatState) => {
    const allSeats = seats?.flat() || [];
    return state ? allSeats.filter((seat) => seat.state === state) : allSeats;
  };

  const movieProjection = movieProjectionId
    ? useQuery(['movieProjection', movieProjectionId], () => MovieProjectionsService.findOneById(movieProjectionId), {
        onSuccess(movieProjection) {
          // set reserved seats
          const _reservedSeats = movieProjection.reservations
            .map((reservation) => {
              return reservation.reservationSeats.map((reservedSeat) => {
                return {
                  seatId: reservedSeat.seatId,
                  reservationId: reservation.id,
                };
              });
            })
            .flat();
          const reservedSeatIds = _reservedSeats.map((rs) => rs.seatId);
          // setReservedSeats(_reservedSeats);

          // set initial seats
          const cinemaSeatGroups = movieProjection.cinemaTheater.cinemaSeatGroups[0];
          const seatsFromApi: Seat[][] = Array.from({
            length: cinemaSeatGroups.rowCount,
          }).map((_, row) =>
            Array.from({length: cinemaSeatGroups.columnCount}).map((_, col) => {
              const cinemaSeat = cinemaSeatGroups.cinemaSeats.find(
                (s) => s.seatColumn === col.toString() && s.seatRow === row.toString(),
              );
              if (cinemaSeat) {
                const currentLocalSeat = getAllSeats().find((s) => s.seatId === cinemaSeat.id);

                return {
                  seatId: cinemaSeat.id,
                  state: (() => {
                    if (reservedSeatIds.includes(cinemaSeat.id)) {
                      return 'unavailable';
                    }

                    return currentLocalSeat ? currentLocalSeat.state : 'available';
                  })(),
                  rowIndex: row,
                  colIndex: col,
                };
              } else {
                return {
                  seatId: undefined,
                  state: 'unavailable',
                  rowIndex: row,
                  colIndex: col,
                };
              }
            }),
          );

          setSeats(seatsFromApi);
        },
      })
    : undefined;

  const movieProjectionData = movieProjection?.data;

  const toggleSeat = (row: number, column: number) => {
    if (seats) {
      const seat = seats[row][column];
      const newSeatState = (() => {
        if (seat.state === 'available') {
          return 'chosen';
        } else if (seat.state === 'chosen') {
          return 'available';
        } else {
          return seat.state;
        }
      })();

      const newSeats: Seat[][] = seats.map((seatRow) =>
        seatRow.map((seat) => {
          return {
            ...seat,
            state: row === seat.rowIndex && column === seat.colIndex ? newSeatState : seat.state,
          };
        }),
      );
      setSeats(newSeats);
    }
  };

  const reserveSeats = async () => {
    const chosenSeats = getAllSeats('chosen');
    if (chosenSeats.length && movieProjectionData) {
      setReserveButtonLoading(true);
      try {
        await reservationsStore.createNewReservation({
          eventId: movieProjectionData.id,
          seatIds: chosenSeats.map((s) => {
            if (!s.seatId) {
              throw new Error(`Seat ${s.rowIndex} ${s.colIndex} missing id!`);
            }

            return s.seatId;
          }),
        });

        setSuccessReservationDialogOpen(true);
      } finally {
        setReserveButtonLoading(false);
      }
    } else {
      alert('Nijedno sediste nije izabrano');
    }
  };

  return (
    <div className="movie-projection-single-wrapper">
      {movieProjection?.isLoading ? (
        <Typography color={'text.primary'}>Učitava se, molimo sačekajte...</Typography>
      ) : (
        <React.Fragment>
          {movieProjectionData && seats ? (
            <React.Fragment>
              <Box className="movie-projection-single-header">
                <p>{movieProjectionData.movie.localizedTitle || movieProjectionData.movie.originalTitle}</p>
                <p>
                  <span>Bioskop: </span> {movieProjectionData.cinemaTheater.cinema.name}
                </p>
                <p>
                  <span>Termin: </span>{' '}
                  {CustomerHelper.formatDateMovieProjection(movieProjectionData.projectionDateTime)}
                </p>
                <p>
                  <span>Sala: </span> {movieProjectionData.cinemaTheater.name}
                </p>
              </Box>
              <CinemaCanvasHolder>
                <img src="/img/cinemaCanvas.svg" alt="cinema canvas" className="container" />
              </CinemaCanvasHolder>
              <Box style={{maxWidth: '100%', margin: 'auto'}}>
                <CinemaSeatBoard
                  rows={movieProjectionData.cinemaTheater.cinemaSeatGroups[0].rowCount}
                  columns={movieProjectionData.cinemaTheater.cinemaSeatGroups[0].columnCount}
                  squareMarginPercentage={30}
                  seats={seats}
                  toggleSeat={toggleSeat}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  padding: '2vh 5px',
                }}
              >
                <Typography sx={{fontSize: '3vw'}}>Broj slobodnih mesta: {getAllSeats('available').length}</Typography>
                <Typography sx={{fontSize: '3vw'}}>Broj izabranih mesta: {getAllSeats('chosen').length}</Typography>
              </Box>
              <Box>
                <StatusIndicator />
              </Box>
              <Box>
                <SeatsSelected seats={getAllSeats('chosen')} toggleSeat={toggleSeat} />
              </Box>
              <Box>
                <LoadingButton
                  loading={reserveButtonLoading}
                  color={'primary'}
                  variant="outlined"
                  onClick={reserveSeats}
                >
                  Rezervacija
                </LoadingButton>
              </Box>
              <BigInfoDialog
                open={successReservationDialogOpen}
                imgSrc={'/img/couchPopcorn.svg'}
                header={'Uspešna rezervacija!'}
                text={`Uspešno ste rezervisali vaša mesta za željenu projekciju! Pri preuzimanju karata pokažite osoblju QR kod rezervacije.`}
                buttons={[{text: 'U redu', onClick: () => navigate(namedRoutes.reservations)}]}
              />
            </React.Fragment>
          ) : (
            <Typography color={'text.primary'}>Filmska projekcija nije pronadjena</Typography>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default MovieProjectionSingle;
