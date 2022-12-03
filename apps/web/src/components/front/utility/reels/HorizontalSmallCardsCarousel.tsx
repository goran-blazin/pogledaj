import {Swiper, SwiperSlide} from 'swiper/react';
import React from 'react';
// Import Swiper styles
import 'swiper/css/bundle';
import HorizontalFilmStripWrapper from './HorizontalFilmStripWrapper';
import CardFilmStripWrapper from '../cards/CardFilmStripWrapper';

function HorizontalSmallCardsCarousel({children}: {children: React.ReactNode[]}) {
  const filmStripSizeModifier = 0.5;

  return (
    <HorizontalFilmStripWrapper modifier={filmStripSizeModifier}>
      <Swiper
        style={{
          paddingLeft: '21px',
        }}
        slidesPerView={3.5}
        spaceBetween={0}
        centerInsufficientSlides={true}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 5.5,
            spaceBetween: 0,
            centerInsufficientSlides: true,
          },
          960: {
            slidesPerView: 7.5,
            spaceBetween: 0,
            centerInsufficientSlides: true,
          },
          1280: {
            slidesPerView: 9.5,
            spaceBetween: 0,
            centerInsufficientSlides: true,
          },
          1600: {
            slidesPerView: 11.5,
            spaceBetween: 0,
            centerInsufficientSlides: true,
          },
        }}
      >
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
