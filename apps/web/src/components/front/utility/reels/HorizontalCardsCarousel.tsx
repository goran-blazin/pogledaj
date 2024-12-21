import {Swiper, SwiperSlide} from 'swiper/react';
import React from 'react';
// Import Swiper styles
import 'swiper/css/bundle';
import HorizontalFilmStripWrapper from './HorizontalFilmStripWrapper';
import CardFilmStripWrapper from './CardFilmStripWrapper';

function HorizontalCardsCarousel({children}: {children: React.ReactNode[]}) {
  return (
    <HorizontalFilmStripWrapper>
      <Swiper
        className={'horizontal-cards-carousel'}
        slidesPerView={1.15}
        spaceBetween={0}
        centeredSlides={false}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 2.2,
            spaceBetween: 0,
            centeredSlides: false,
            centerInsufficientSlides: false,
          },
          960: {
            slidesPerView: 3.4,
            spaceBetween: 0,
            centeredSlides: false,
            centerInsufficientSlides: false,
          },
          1280: {
            slidesPerView: 4.6,
            spaceBetween: 0,
            centeredSlides: false,
            centerInsufficientSlides: false,
          },
          1600: {
            slidesPerView: 5.8,
            spaceBetween: 0,
            centeredSlides: false,
            centerInsufficientSlides: false,
          },
        }}
      >
        {children.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <CardFilmStripWrapper>{item}</CardFilmStripWrapper>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </HorizontalFilmStripWrapper>
  );
}

export default HorizontalCardsCarousel;
