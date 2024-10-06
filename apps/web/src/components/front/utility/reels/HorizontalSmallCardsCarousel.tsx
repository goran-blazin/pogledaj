import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react'; //useSwiper
import HorizontalFilmStripWrapper from './HorizontalFilmStripWrapper';
import CardFilmStripWrapper from '../cards/CardFilmStripWrapper';
// import Box from '@mui/material/Box';
// import {styled} from '@mui/material';
// Import Swiper styles
import 'swiper/css/bundle';
// icons
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// const BoxStyledRight = styled(Box)(({theme}) => ({
//   width: 'fit-content',
//   height: '100%',
//   position: 'absolute',
//   right: 0,
//   top: 0,
//   zIndex: 1,
//   [theme.breakpoints.down('sm')]: {
//     display: 'none',
//   },
// }));
// const BoxStyledLeft = styled(Box)(({theme}) => ({
//   width: 'fit-content',
//   height: '100%',
//   position: 'absolute',
//   left: 0,
//   top: 0,
//   zIndex: 1,
//   [theme.breakpoints.down('sm')]: {
//     display: 'none',
//   },
// }));

// const BasicButton = styled('button')({
//   border: 'none',
//   background: 'none',
//   margin: 0,
//   padding: 0,
//   display: 'block',
//   height: '100%',
//   width: '58px',
//   backgroundColor: 'rgba(0,0,0,0.4)',
//   backdropFilter: 'blur(8px)',
//   '& .MuiSvgIcon-root': {
//     color: 'white',
//   },
// });

function HorizontalSmallCardsCarousel({children}: {children: React.ReactNode[]}) {
  const filmStripSizeModifier = 0.5;

  // const SlideNextButton = () => {
  //   const swiper = useSwiper();

  // const swiperWidth = swiper.width;
  // const swiperSlides = swiper.slides.map((element) => {
  //   return element.getBoundingClientRect().width
  // })

  // const sumOfAll = (swiperSlides: any) => {
  //   if(swiperSlides && swiperSlides.length > 0) {
  //     return swiperSlides.reduce((sum:any, num:any) => sum + num);
  //   }
  // }

  // var onOffButton = false

  // if(swiperWidth && swiperSlides && swiperSlides.length > 0) {
  //   onOffButton = swiperWidth < sumOfAll(swiperSlides)
  // }

  // console.log(onOffButton)

  //   return (
  //     <BoxStyledRight>
  //       <BasicButton onClick={() => swiper.slideNext()}>
  //         <ArrowForwardIosIcon />
  //       </BasicButton>
  //     </BoxStyledRight>
  //   );
  // };

  // const SlidePrevButton = () => {
  //   const swiper = useSwiper();

  //   return (
  //     <BoxStyledLeft>
  //       <BasicButton onClick={() => swiper.slidePrev()}>
  //         <ArrowBackIosIcon />
  //       </BasicButton>
  //     </BoxStyledLeft>
  //   );
  // };

  return (
    <HorizontalFilmStripWrapper modifier={filmStripSizeModifier}>
      <Swiper
        style={{
          paddingLeft: '21px',
          padding: '2px 0 2px 21px',
          position: 'relative',
        }}
        slidesPerView={3.5}
        spaceBetween={0}
        centerInsufficientSlides={false}
        grabCursor={true}
        // navigation={true}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 5.5,
            spaceBetween: 0,
            centerInsufficientSlides: false,
          },
          960: {
            slidesPerView: 7.5,
            spaceBetween: 0,
            centerInsufficientSlides: false,
          },
          1280: {
            slidesPerView: 9.5,
            spaceBetween: 0,
            centerInsufficientSlides: false,
          },
          1600: {
            slidesPerView: 11.5,
            spaceBetween: 0,
            centerInsufficientSlides: false,
          },
        }}
      >
        {/* <SlideNextButton />
        <SlidePrevButton /> */}
        {children.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <CardFilmStripWrapper modifier={filmStripSizeModifier}>{item}</CardFilmStripWrapper>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </HorizontalFilmStripWrapper>
  );
}

export default HorizontalSmallCardsCarousel;
