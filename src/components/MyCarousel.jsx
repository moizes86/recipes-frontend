import React from "react";
import { imageSrc } from "../App";
import Carousel from "react-bootstrap/Carousel";
import "../styles/styles.scss";

const MyCarousel = ({ urls }) => {
  return (
    <div className="carousel-container">
      <Carousel interval={null}>
        {urls.map((url, i) => (
          <Carousel.Item key={`${url}-${i}`}>
            <img className="d-block w-100" src={`${imageSrc}/${url}`} alt={`img-${i}`} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
