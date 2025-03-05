import IntroText from "./IntroText";
import React, { useState } from "react";



const Intro = () => {

  const introContent = {
    
    // image: "assets/img/slider/1.jpg", // Assuming this path is correct
    name: "Hey there, I'm Eric Rudawski.",
    // designation: <i>Never not learning.</i>,
    text: (
      <>
      <p>
          Thanks for visiting my small corner of the internet.<br></br> I built this website
          to add color to my professional resume (linked below), but also as a
        sort of digital shoebox for personal reflections and ventures.
        </p>
        
        <p style={{paddingBottom: '8px'}}></p>
      </>
    ),
  };

  return (
    <>
      <div className="top_author_image">
        <div
          className="image top_author_image"
          style={{
            backgroundImage: "url(assets/img/slider/1.jpg)",
          }}
        ></div>
      </div>
      <div className="about_title">
        <h3>{introContent.name}</h3>
        <span>{introContent.designation}</span>
      </div>
      <div className="about_text">{introContent.text} <IntroText /></div>
    </>
  );
};
export default Intro;
