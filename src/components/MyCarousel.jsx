import React from "react";
import { origin } from "../DAL/http_Service";
import Carousel from "react-bootstrap/Carousel";
import "../styles/styles.scss";
import Image from "./Image";

const MyCarousel = ({ urls }) => {
  return (
    <div className="carousel-container">
      <Carousel interval={null}>
        {urls.map((url, i) => (
          <Carousel.Item key={`${url}-${i}`}>
            {/* <img className="d-block w-100" src={`${origin}/recipes/images/${url}`} alt={`img-${i}`} /> */}
            <Image urls={url} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
