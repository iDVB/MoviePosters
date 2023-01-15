import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useTMDB from "../../hooks/useTMDB";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import SwiperGL from '../../_vendor/Swiper/swiper-gl.esm';
import '../../_vendor/Swiper/swiper-gl.scss';
import '../../_vendor/Swiper/main.scss';

import { Pagination, Autoplay } from "swiper";

function PosterSlideshow() {
  const posters = useTMDB();

  const slides =
    posters &&

    posters.map(({ id, original_title, posterUrl, images }, index) => (
      <SwiperSlide key={id}>
        <img src={posterUrl} alt="" className="swiper-gl-image object-cover" />
      </SwiperSlide>
    ));
  return (
    <>
      <Swiper
        // direction={"vertical"}
        className="mySwiper"
        speed={1000}
        slidesPerView={1}
        // spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 15000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: false
        }}
        modules={[Autoplay, Pagination, SwiperGL]}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        effect="gl"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onBeforeInit={(swiper) => (swiper.params.gl.shader = 'morph-x')}
      >
        {slides}
      </Swiper>
    </>
  );
}

export default PosterSlideshow;
