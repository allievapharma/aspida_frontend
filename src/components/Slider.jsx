import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import slider1 from "../assets/image/slider/Online Pharmacy Services.jpg";
import slider2 from "../assets/image/slider/Online Pharmacy Services (1).png";
import slider3 from "../assets/image/slider/Online Pharmacy Services.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Slider = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="relative ">
          <img
           src={slider1}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
             src={slider2}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={slider3}
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
