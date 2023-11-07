import {useParams} from 'react-router-dom';
import {useQuery} from 'react-query';
import MovieProjectionsService from '../../../services/MovieProjectionsService';
import {Typography, styled, Box} from '@mui/material';
import React from 'react';
import {DateTime} from 'ts-luxon';

const formatDate = (date: string) => DateTime.fromISO(date).toFormat('dd.MM.yyyy / HH:mm');
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

interface BoardProps {
  rows: number;
  columns: number;
  squareMarginPercentage: number;
}

const CinemaSeatBoard: React.FC<BoardProps> = ({rows, columns, squareMarginPercentage}) => {
  const cols = columns + 1;
  const margin = `${squareMarginPercentage / cols}%`;
  const containerWidth = `calc(${100 / cols}% - ${margin})`;

  const getSquareColor = (rowIndex: number, colIndex: number): string => {
    return (rowIndex + colIndex) % 2 === 0 ? 'lightgray' : 'darkgray';
  };

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
              fontSize: '0.6rem',
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
                fontSize: '0.6rem',
              }}
            >
              {rowIndex + 1}
            </Box>
          ) : (
            <Box
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
                backgroundColor: getSquareColor(rowIndex, colIndex),
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

function MovieProjectionSingle() {
  const {movieProjectionId} = useParams();
  const movieProjection = movieProjectionId
    ? useQuery(['movieProjection', movieProjectionId], () => MovieProjectionsService.findOneById(movieProjectionId))
    : undefined;
  const movieProjectionData = movieProjection?.data;

  return (
    <div className="movie-projection-single-wrapper">
      {movieProjection?.isLoading ? (
        <Typography color={'text.primary'}>Učitava se, molimo sačekajte...</Typography>
      ) : (
        <React.Fragment>
          {movieProjectionData ? (
            <React.Fragment>
              <div className="movie-projection-single-header">
                <p>{movieProjectionData.movie.localizedTitle}</p>
                <p>
                  <span>Bioskop: </span> {movieProjectionData.cinemaTheater.cinema.name}
                </p>
                <p>
                  <span>Termin: </span> {formatDate(movieProjectionData.projectionDateTime)}
                </p>
                <p>
                  <span>Sala: </span> {movieProjectionData.cinemaTheater.name}
                </p>
              </div>
              <CinemaCanvasHolder>
                <img src="/img/cinemaCanvas.svg" alt="cinema canvas" className="container" />
              </CinemaCanvasHolder>
              <div style={{maxWidth: '100%', margin: 'auto'}}>
                <CinemaSeatBoard
                  rows={movieProjectionData.cinemaTheater.cinemaSeatGroups[0].rowCount}
                  columns={movieProjectionData.cinemaTheater.cinemaSeatGroups[0].columnCount}
                  squareMarginPercentage={30}
                />
              </div>
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
