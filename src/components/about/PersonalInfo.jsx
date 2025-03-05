import React from "react";

const PersonalInfo = () => {
  const personalInfoContent = [
    {
      id: 1,
      colClass: "left",
      info: [
        {
          id: 2,
          name: "Languages",
          content: "English, Polish, Spanish (B1), French (A1)",
        },
        // {
        //   // id: 2,
        //   // name: "Height",
        //   // content: "6'7\"",
        // },
        {
          id: 1,
          name: "Located In",
          content: "California",
        },
        {
          id: 4,
          name: "Email",
          content: (
            <>
              <a href="mailto:erudawski@gmail.com">erudawski@gmail.com</a>
            </>
          ),
        },
        // {
        //   id: 5,
        //   name: "Phone",
        //   content: (
        //     <>
        //       {/* <a href="tel:+1 408 693 9389">408-693-9389</a> */}
        //     Available upon request
        //     </>
        //   ),
        // },
      ],
    },
    {
      id: 2,
      colClass: "right",
      info: [
        // {
        //   id: 1,
        //   name: "Nationality",
        //   content: "Poland",
        // },
        {
          id: 2,
          name: "College",
          content: "San Jose State University",
        },
        {
          id: 3,
          name: "Degree",
          content: "BS, Finance",
        },
        // {
        //   id: 4,
        //   name: "Interests",
        //   content: "🪚 🎧 ⚾️",
        // },
        {
          id: 4,
          name: "Now Reading",
          content: "The Perfectionist's Guide to Losing Control",
        },
      ],
    },
  ];
  return (
    <>
      {personalInfoContent.map((item) => (
        <div className={item.colClass} key={item.id}>
          <div className="tokyo_tm_info">
            <ul>
              {item?.info?.map((value) => (
                <li key={value.id}>
                  <span>{value.name}:</span>
                  <span>{value.content}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default PersonalInfo;
