import React, { useState } from "react";
import Modal from "react-modal";
import Testimonial from "./Testimonial";
import TestimonialPopup from "./TestimonialPopup";
import Intro from "./Intro";
import KnowledgeInterest from "./KnowledgeInterest";
import PersonalInfo from "./PersonalInfo";
// import Resume from "./Resume";
import Skills from "./Skills";

Modal.setAppElement("#root");

const AboutMain = () => {
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal(e) {
      setIsOpen(!isOpen);
      e.preventDefault();
    }
  return (
    <>
      <div className="container">
        <div className="tokyo_tm_about">
          <div className="tokyo_tm_title">
            <div className="title_flex">
              <div className="left">
                <span>About</span>
                <h3>About Me</h3>
              </div>
            </div>
          </div>
          {/* End title */}

          <Intro />
          <div className="tokyo_tm_short_info">
            <PersonalInfo />
          </div>
          {/* End personal info */}

          <div className="tokyo_tm_button" data-position="left" style={{ marginBottom: '40px'}}>
          <a href="assets/img/cv.pdf" download>
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
      {/* End .container */}

      <div className="tokyo_tm_progressbox">
        <div className="container">
          <div className="in">
            <Skills />
          </div>
          {/* End in */}
        </div>
        {/* End .container */}
      </div>
      {/* End tokyo_tm_progressbox */}

      <div className="tokyo_tm_skillbox">
        <div className="container">
          <div className="in">
            <KnowledgeInterest />
          </div>
        </div>
      </div>
      {/* End .tokyo_tm_skillbox */}

      {/* <div className="tokyo_tm_resumebox">
        <div className="container">
          <div className="in">
            <Resume />
          </div>
        </div>
      </div> */}
      {/* End tokyo_tm_resumebox */}

      <div className="tokyo_tm_testimonials">
        <div className="container">
          <div className="tokyo_section_title">
            <h3>Testimonials</h3>
          </div>
          <div className="list">
            <Testimonial />
          {/* START MODAL */}
          <Modal
isOpen={isOpen}
onRequestClose={toggleModal}
contentLabel="My dialog"
className="mymodal"
overlayClassName="myoverlay"
closeTimeoutMS={500}
>
<div className="tokyo_tm_modalbox_news">
  <button className="close-modal" onClick={toggleModal}>
    <img src="assets/img/svg/cancel.svg" alt="close icon" />
  </button>
  {/* END CLOSE ICON */}
  <div className="box_inner">
    <div className="description_wrap scrollable">
      {/* END IMAGE */}
      <div className="details">
        <div className="extra">
          <p className="date">
            Selection of kind words || 
            Last updated: October 2023
          </p>
        </div>
        <h3 className="title">
          Testimonials
        </h3>
      </div>
      {/* END DETAILS */}
      <div className="main_content ">
        <div className="descriptions">
            <TestimonialPopup/>
        </div>
        {/* END DESCRIPTION */}
        
        {/* END NEWS SHARE */}
      </div>
    </div>
  </div>
  {/* END BOX INNER */}
</div>
{/* END MODALBOX NEWS */}
</Modal>
{/* END MODAL */}

        



          </div>
            <div className="tokyo_tm_button" data-position="left">
                <a href="#" onClick={toggleModal}>
              <span>More Kind Words</span>
            </a>
            </div>
            </div>
            </div>



      {/* End tokyo_tm_testimonials */}
      
      
      {/* /ABOUT */}
    </>
  );
};

export default AboutMain;
