import {Swiper, SwiperSlide} from 'swiper/react';
import React from 'react';
// Import Swiper styles
import 'swiper/css/bundle';
import './HorizontalCardsCarousel.css';
import HorizontalFilmStripWrapper from './HorizontalFilmStripWrapper';
import CardFilmStripWrapper from '../cards/CardFilmStripWrapper';

function HorizontalCardsCarousel({children}: {children: React.ReactNode[]}) {
  return (
    <HorizontalFilmStripWrapper>
      <Swiper
        className={'horizontal-cards-carousel'}
        slidesPerView={1.1}
        spaceBetween={0}
        centeredSlides={true}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 2.2,
            spaceBetween: 0,
            centeredSlides: false,
            centerInsufficientSlides: true,
          },
          960: {
            slidesPerView: 3.2,
            spaceBetween: 0,
            centeredSlides: false,
            centerInsufficientSlides: true,
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
