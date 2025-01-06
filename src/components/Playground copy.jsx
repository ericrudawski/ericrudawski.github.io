import React from "react";
import "./Playground.scss";

const Playground = () => {
  return (
    <>
      <div className="container">
        <div className="tokyo_tm_portfolio">
          <div className="title_flex">
            <div className="left">
            </div>
          </div>
          
          <div className="playground_content">
            <div className="sliding-lines">
              <div className="line-container">
                <div className="line peek-line">
                  <span className="line-text">Never not learning</span>
                </div>
                <div className="line hover-line">
                  <span className="line-text">Never not learning</span>
                </div>
              </div>
              <div className="line-container">
                <div className="line peek-line">
                  <span className="line-text">Detail oriented innovator</span>
                </div>
                <div className="line hover-line">
                  <span className="line-text">Detail oriented innovator</span>
                </div>
              </div>
              <div className="line-container">
                <div className="line peek-line">
                  <span className="line-text">Dependably creative</span>
                </div>
                <div className="line hover-line">
                  <span className="line-text">Dependably creative</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playground;