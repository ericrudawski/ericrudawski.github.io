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
      <div
        className={`content ${isExpanded ? "expanded" : "collapsed"}`}
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* {isExpanded && ( */}
        {/* <div> */}
        <p style={{ paddingBottom: "40px" }}></p>
        <p>
          I like to learn. Humans have the unique advantage of learning and
          adapting over time - it's how we've tamed our landscapes and put
          people in space. Learning is how we make progress.<br></br> That said,
          learning doesn't stand on it's own - progress needs a vector. It's
          important to continuously ask what problem you're solving and think
          about what's would be gained if the problem didn't exist.<br></br>
          <br></br>
          Once there's a problem worth solving, it's time to get to work.{" "}
          <br></br>I believe in executing quickly, building relationships, and
          leveraging technical expertise to compound knowledge from diverse
          sources. This helps deliver consistent results without compromising on
          quality. <br></br>
          <br></br>I lean into what is tough because what is tough is worth
          doing. My teams know they can rely on me as a leader and thought
          partner to solve the hardest problems.<br></br>
        </p>
        <p>{"//end"}</p>
      </div>
    </>
  );
}
export default IntroText;
