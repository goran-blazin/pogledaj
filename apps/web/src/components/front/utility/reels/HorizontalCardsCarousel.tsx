import {Swiper, SwiperSlide} from 'swiper/react';
import React from 'react';
// Import Swiper styles
import 'swiper/css/bundle';
import HorizontalFilmStripWrapper from './HorizontalFilmStripWrapper';

function HorizontalCardsCarousel({children}: {children: React.ReactNode[]}) {
  return (
    <HorizontalFilmStripWrapper>
      <Swiper
        slidesPerView={1.2}
        spaceBetween={9}
        centeredSlides={true}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 2.2,
            spaceBetween: 9,
            centeredSlides: false,
            centerInsufficientSlides: true,
          },
          960: {
            slidesPerView: 3.2,
            spaceBetween: 9,
            centeredSlides: false,
            centerInsufficientSlides: true,
          },
        }}
      >
        {children.map((item, i) => {
          return <SwiperSlide key={i}>{item}</SwiperSlide>;
        })}
      </Swiper>
    </HorizontalFilmStripWrapper>
  );
}

export default HorizontalCardsCarousel;
