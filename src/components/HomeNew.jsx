import React from "react";
import "../assets/scss/main/Playground.scss"

const Playground = () => {
  return (
    <>
      <div className="container" style={{ paddingTop: "20px" }}>
        <div className="tokyo_tm_portfolio">
          <div className="title_flex">
            <div className="left">
            </div>
          </div>
          
          <div className="playground_content">
            <div className="sliding-lines">
              {[
                "Eric Rudawski",
                "Never not learning", 
                "Natural problem solver",
                "Dependably creative"
              ].map((text, index) => (
                <div 
                  key={index}
                  className="line-container"
                >
                  <div className="line peek-line">
                    <span className="line-text">{text}</span>
                  </div>
                  <div className="line hover-line">
                    <span className="line-text">{text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playground;