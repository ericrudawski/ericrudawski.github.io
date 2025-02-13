import React from "react";

const SocialShare = [
  {
    iconName: "mail",
    link: "mailto:erudawski@gmail.com",
  },
  {
    iconName: "linked",
    link: "https://www.linkedin.com/in/ericrudawski/",
  }, 
  { 
    iconName: "twitter", 
    link: "https://twitter.com/EricRudawski" 
  },
  // {
  //   iconName: "instagram",
  //   link: "https://www.instagram.com/",
  // },
  { 
    iconName: "discogs", 
    link: "https://www.discogs.com/user/Erudawski/collection?header=1" 
  },
];
const Social = () => {
  return (
    <>
      <ul className="social">
        {SocialShare.map((val, i) => (
          <li key={i}>
            <a href={`${val.link}`} target="_blank" rel="noreferrer">
              <img
                className="svg"
                src={`/assets/img/svg/social/${val.iconName}.svg`}
                alt="social"
              ></img>
            </a>
          </li>
        ))}
      </ul>
      {/* END SOCIAL */}
    </>
  );
};

export default Social;
