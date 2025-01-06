import React, { useState } from "react";

function IntroText() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the expansion state
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* <div className="tokyo_tm_read_more custom-read-more"> */}
      <div className="tokyo_tm_button" data-position="left">
        <a onClick={toggleExpansion}>
          <span>{isExpanded ? "Read Less" : "Read More"}</span>
        </a>
      </div>
      <div className="spacer"></div>
      <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
      {/* {isExpanded && ( */}
        {/* <div> */}
        <p style={{paddingBottom: '40px'}}></p>
          <p>
            Not to wax too philosophically, but I believe the most enduring
            thing about humanity is its ability to acquire new knowledge. It’s
            truly a wonder to see learning in action, and it’s how we’ve
            domesticated animals, tamed landscapes, and shaped the world to be
            what it is today (for better or worse).<br></br>
          </p>
          <p>
            I like to learn, and then use my new insights or skills to solve the
            hardest problems; that has been the bedrock of my career. One
            learning that I utilize often is the importance of bringing the
            right people together and collaborating across teams. This allows
            knowledge to compound and novel approaches to come to light. I
            combine my interpersonal skills with the understanding that
            technical excellence lets teams perform at the highest level, and so
            am always aiming to keep my skills sharp.<br></br>
          </p>
          <p>
            I lean into what is tough because what is tough is worth doing. My
            clients and peers can and do rely on me as a thought partner so that
            we can move the needle together.<br></br>
          </p>
          <p>{"//end"}</p>
      </div>
    </>
  );
}
export default IntroText;