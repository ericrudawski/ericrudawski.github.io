import React, { useState } from "react";


const Intro = () => {

  const [isExpanded, setExpanded] = useState(false);

  function expandAboutMe() {
    setExpanded(!isExpanded);
  }
  const introContent = {
    // image: "assets/img/slider/1.jpg", // Assuming this path is correct
    name: "Hey there, I'm Eric Rudawski",
    designation: <i>Never not learning.</i>,
    text: (
      <>
        <p>
          Thanks for visiting my small corner of the internet.<br></br> I built this site
          to add color to my professional resume (linked below), but also as a
          harbor for assorted personal reflections and ventures.
        </p>
        <div className="tokyo_tm_read_more">
                    <a onClick={expandAboutMe}>
                      <span>Read More</span>
                    </a>
                  </div>
        <p>
          Not to wax too philosophically, but I believe the most enduring thing
          about humanity is its ability to acquire new knowledge. It’s truly a
          wonder to see learning in action, and it’s how we’ve domesticated
          animals, tamed landscapes, and shaped the world to be what it is today
          (for better or worse).<br></br>
          </p>
          <p>
          I like to learn, and then use my new insights or skills to solve the
          hardest problems; that has been the bedrock of my career. One learning
          that I utilize often is the importance of bringing the right people
          together and collaborating across teams. This allows knowledge to
          compound and novel approaches to come to light. I combine my
          interpersonal skills with the understanding that technical excellence
          lets teams perform at the highest level, and so am always aiming to
          keep my skills sharp.{" "}<br></br>
          </p>
          <p>
          I lean into what’s tough because what’s tough is worth doing. My
          clients and peers can and do rely on me as a thought partner so that
          we can move the needle together.<br></br>
          </p>
          <p>
          {"//end"}
        </p>
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
      <div className="about_text">{introContent.text}</div>
    </>
  );
};
export default Intro;
