import React, { useState } from "react";
import Social from "./Social";

const Home = () => {
  // State to manage hover effect
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="tokyo_tm_home">
      <div className="home_content">
        <div className="avatar">
          <div
            className="image avatar_img"
            style={{
              backgroundImage: "url(assets/img/slider/1.jpg)",
            }}
          ></div>
          {/* END AVATAR IMAGE */}
        </div>
        {/* END AVATAR */}
        <div className="details">
          <h3 className="name">Eric Rudawski</h3>
          <p className="job">Experienced finance leader, voracious reader.</p>
          <div
            className="job latin_hover"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <p
              className={`original_latin_text ${isHovered ? "fadelatin" : ""}`}
            >
              ad astra per alia porci.
            </p>
            <p
              className={`hover_latin_text ${isHovered ? "fadelatin" : ""}`}
              style={{ opacity: isHovered ? 1 : 0 }}
            >
              to the stars on the wings of a pig.
            </p>
          </div>
          {/* END JOB */}
          <Social />
        </div>
        {/* END DETAILS */}
      </div>
      {/* END HOME CONTENT */}
    </div>
  );
};

export default Home;
