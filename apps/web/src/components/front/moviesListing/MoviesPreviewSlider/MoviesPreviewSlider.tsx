import {Box, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {namedRoutes} from '../../../../routes';
import {styled} from '@mui/system';
import {MovieWithMovieProjection} from '../../../../types/MoviesTypes';
// Swiper
import {Swiper, SwiperSlide} from 'swiper/react';

import {Autoplay, Pagination} from 'swiper';

// Import Swiper styles
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MoviesPreviewSliderWrap = styled(Box)({
  width: '100%',
  height: '100%',
});
const SingleSlideWrap = styled(Box)(({theme}) => ({
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  '& .slide-info': {
    margin: '0 auto',
    position: 'relative',
    bottom: '12px',
    alignSelf: 'end',
    height: 'fit-content',
    minWidth: '350px',
    maxWidth: '680px',
    textAlign: 'center',
    backgroundColor: 'rgba(9, 31, 62, 0.6)',
    borderRadius: '15px',
    padding: '15px 15px 30px 15px',
    backdropFilter: 'blur(8px)',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '100%',
      margin: '0 20px',
    },
  },
}));

type Slidesprop = {
  slides: MovieWithMovieProjection[];
  orientation: string;
};

function MoviesPreviewSlider({slides, orientation}: Slidesprop) {
  const navigate = useNavigate();

  return (
    <MoviesPreviewSliderWrap>
      <Swiper
        style={{
          height: '100%',
        }}
        slidesPerView={1}
        spaceBetween={0}
        centerInsufficientSlides={false}
        grabCursor={true}
        loop={true}
        pagination={{
          // for custom pagination
          // el: ".custom-swiper-pagination",
          // type: "bullets",
          // bulletClass: "custom-bullet-class",
          // bulletActiveClass: "custom-bullet-class-active",
          clickable: true,
        }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        // breakpoints={{
        //   // when window width is >= 640px
        //   640: {
        //     slidesPerView: 5.5,
        //     spaceBetween: 0,
        //     centerInsufficientSlides: false,
        //   },
        //   960: {
        //     slidesPerView: 7.5,
        //     spaceBetween: 0,
        //     centerInsufficientSlides: false,
        //   },
        //   1280: {
        //     slidesPerView: 9.5,
        //     spaceBetween: 0,
        //     centerInsufficientSlides: false,
        //   },
        //   1600: {
        //     slidesPerView: 11.5,
        //     spaceBetween: 0,
        //     centerInsufficientSlides: false,
        //   },
        // }}
      >
        {slides.slice(0, 6).map((slide: MovieWithMovieProjection, index: number) => {
          return (
            <SwiperSlide key={index}>
              <SingleSlideWrap
                style={{
                  backgroundImage: `${
                    orientation === 'Landscape'
                      ? `url(${slide.posterImages.bigBackground})`
                      : `url(${slide.posterImages.mediumPoster})`
                  }`,
                }}
                onClick={() => {
                  navigate(namedRoutes.movieSingle.replace(':movieId', slide.id));
                }}
              >
                <Box className="slide-info">
                  <Typography
                    component="p"
                    sx={{
                      color: '#CEE4FF',
                      fontSize: '14px',
                      letterSpacing: '0.2px',
                    }}
                  >
                    U bioskopima:
                  </Typography>
                  <Typography
                    component="h2"
                    sx={{
                      color: '#fff',
                      fontSize: '20px',
                      fointWeight: 'bold',
                      letterSpacing: '0.2px',
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      color: '#3274F6',
                      fontSize: '14px',
                      letterSpacing: '0.2px',
                    }}
                  >
                    {slide.originalTitle}
                  </Typography>
                </Box>
              </SingleSlideWrap>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </MoviesPreviewSliderWrap>
  );
}

export default MoviesPreviewSlider;
