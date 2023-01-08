import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useTMDB from "../../hooks/useTMDB";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay } from "swiper";

function PosterSlideshow() {
  const posters = useTMDB();

  const slides =
    posters &&
    posters.map(({ id, original_title, posterUrl, images }, index) => (
      <SwiperSlide key={id}>
        <div className="flex flex-col w-screen h-screen">
          <div className="">
            <img src={posterUrl} alt="" className="object-cover" />
          </div>
          <div className="flex flex-col grow justify-center bg-gradient-to-r from-slate-900 to-slate-800">
            <p className="text-9xl text-white font-['Anton'] text-[14vw]">
              NOW PLAYING
            </p>
          </div>
        </div>
      </SwiperSlide>
    ));
  return (
    <>
      <Swiper
        // direction={"vertical"}
        speed={1000}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 15000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: false
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {slides}
      </Swiper>
    </>
  );
}

export default PosterSlideshow;
