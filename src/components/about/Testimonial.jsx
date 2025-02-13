import React from "react";
import Slider from "react-slick";
import Modal from "react-modal";
import Social from "../Social";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {


  var settings = {
    dots: false,
    arrow: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };



  const testimonialContent = [
    {
      id: 1,
      text: `[Eric is] a pleasure to work with--flexible thinker, takes initiative, curious and interested in learning more about our practice; innovative.`,
      avatar: "url(assets/img/svg/person1.svg)",
      name: "Customer Feedback #1",
      // designation: "Graphic Designer",
    },
    {
      id: 2,
      text: `He has consistently been able to communicate issues related to numbers, systems, data, and formulas in ways that are clear, concise, and understandable.`,
      avatar: "url(assets/img/svg/person2.svg)",
      name: "Customer Feedback #2",
      // designation: "Content Manager",
    },
    {
      id: 3,
      text: `Eric is a true all-star. He fearlessly takes on projects and is never afraid to share his ideas. He combines superior work ethic and attention to detail.`,
      avatar: "url(assets/img/svg/person3.svg)",
      name: "Customer Feedback #3",
      // designation: "English Teacher",
    },
  ];

  return (
    <ul className="testimonila-slider-wrapper">
      <Slider {...settings} arrows={false}>
        {testimonialContent.map((item) => (
          <li key={item.id}>
            <div className="list_inner">
              <div className="text">
                <p>{item.text}</p>
              </div>
              <div className="details">
                <div className="image">
                  {/* <div
                    className="main"
                    style={{
                      backgroundImage: item.avatar,
                    }} */}
                    <div
            className={`main person-${item.id}`} // Add a custom class based on item.id
            style={{
              backgroundImage: item.avatar,
            }}

                  />
                </div>
                <div className="info">
                  <h3>{item.name}</h3>
                  <span>{item.designation}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </Slider>
    </ul>
    
  );
};



export default Testimonial;
