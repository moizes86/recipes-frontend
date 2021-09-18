import React, { useState, useEffect } from "react";
import { validationsAPI } from "../../DAL/validations";
import { useLocation } from "react-router";
import { imageSrc } from "../../App";

const ImageUpload = ({ images = [], handleChange, errors }) => {
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  // In edit mode - previews are the image-urls
  useEffect(() => {
    if (images.length) {
      const previewAddresses = images.map((image) => imageSrc + "/" + image);
      return setPreviews(previewAddresses);
    }
  }, [images]);

  useEffect(() => {
    if (location.pathname === "/add-recipe") setPreviews([]);;
  }, [location]);

  const popImage = ({ target: { id } }) => {
    images.splice(+id, 1);
    previews.splice(+id, 1);
    return handleChange({ target: { name: "images", value: images } });
  };

  const addImage = ({ target: { files } }) => {
    if (files[0]) {
      try {
        if (images.length === 4) throw Error("Maximun 4 images");
        validationsAPI.image(files[0]);
      } catch (err) {
        setError(err.message);
      }
      images.push(files[0]);
      const objectUrl = URL.createObjectURL(files[0]);
      previews.push(objectUrl);
      return handleChange({ target: { name: "images", value: images } });
    }
  };

  return (
    <div className="image-upload">
      <div className="row justify-content-between">
        {/* ADD IMAGE BUTTON */}
        {images.length < 4 && (
          <div className="image-preview custom-file">
            <input type="file" name="images" id="customFile" onChange={addImage} accept="image/*" />
            <label htmlFor="customFile" className="">
              <div className="image-preview">
                <img src="/add-btn.png" alt="img" />
                <div className="pannel"></div>
              </div>
            </label>
          </div>
        )}

        {/* PREVIEWS */}
        {previews.map((preview, i) => (
          <div className="image-preview" key={preview}>
            <img src={preview} alt="" />
            <div className="pannel">
              <i
                className="fas fa-trash-alt text-danger"
                onClick={(e) => {
                  e.preventDefault();
                  popImage(e);
                }}
                id={i}
              ></i>
            </div>
          </div>
        ))}
      </div>
      <small>{errors || error}</small>
    </div>
  );
};

export default ImageUpload;
