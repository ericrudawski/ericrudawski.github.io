import React from "react";
import Slider from "react-slick";
import Modal from "react-modal";
import Social from "../Social";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Testimonial component displays a slider of testimonials using react-slick
const Testimonial = () => {

  // Settings for the slider component
  var settings = {
    dots: false, // Hide navigation dots
    arrow: false, // Hide navigation arrows
    infinite: true, // Enable infinite scrolling
    speed: 2000, // Transition speed in ms
    slidesToShow: 2, // Show 2 slides at a time
    slidesToScroll: 1, // Scroll 1 slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Autoplay interval in ms
    responsive: [
      {
        breakpoint: 991, // Tablet breakpoint
        settings: {
          slidesToShow: 2, // Show 2 slides on tablets
        },
      },
      {
        breakpoint: 576, // Mobile breakpoint
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile
        },
      },
    ],
  };

  // Array of testimonial content
  const testimonialContent = [
    {
      id: 1,
      text: `[Eric is] a pleasure to work with--flexible thinker, takes initiative, curious and interested in learning more about our practice; innovative.`,
      avatar: "url(assets/img/svg/person1.svg)", // Avatar image URL
      name: "Customer Feedback #1",
      // designation: "Graphic Designer", // Commented out designation
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
                  {/* Custom avatar display with person-specific class */}
                  <div
                    className={`main person-${item.id}`}
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
