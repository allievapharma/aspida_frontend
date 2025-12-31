import React from "react";
import brand1 from "../assets/image/brand/logo.jpeg"
import brand2 from "../assets/image/white.jpg"

const Brand = () => {
  return (
    <div>
      <div className="footeeer py-10">
        <div className="marquee">
          <div className="marquee-content">
            <div className="marquee-item">
              <img
                src={brand1}
                alt="1"
              />
            </div>

            <div className="marquee-item">
              <img
                src={brand2}
                alt="2"
              />
            </div>

            <div className="marquee-item">
              <img
                src={brand1}
                alt=""
              />
            </div>

            <div className="marquee-item">
              <img
                src={brand2}
                alt=""
              />
            </div>

            <div className="marquee-item">
              <img
                src={brand1}
                alt=""
              />
            </div>

            <div className="marquee-item">
              <img
                src={brand2}
                alt=""
              />
            </div>

            <div className="marquee-item">
              <img
                src={brand1}
                alt="last"
              />
            </div>

            {/* <!-- Repeat slides to make the animation seamless --> */}

            <div className="marquee-item">
              <img
                src={brand2}
                alt="1nd"
              />
            </div>

            <div className="marquee-item">
              <img
                src={brand1}
                alt="2nd"
              />
            </div>

            <div className="marquee-item">
              <img
                src={brand2}
                alt=""
              />
            </div>

            <div className="marquee-item">
              <img
                src={brand1}
                alt=""
              />
            </div>

            <div className="marquee-item">
              <img
                src={brand2}
                alt=""
              />
            </div>

            <div className="marquee-item">
              <img
                src={brand1}
                alt=""
              />
            </div>

            <div className="marquee-item">
              <img
                src={brand2}
                alt="lastphoto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
