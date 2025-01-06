import React from "react";

const KnowledgeInterest = () => {
  const knowledgeContent = [
    {
      id: 1,
      colClass: "left",
      title: "Learning",
      content: [
        " React / JS",
        " Meditation",
        " How to keep a plant alive",
        " CAD modeling / Shapr3D",
      ],
    },
    {
      id: 2,
      colClass: "right",
      title: "Building",
      content: [
        " Floating living room shelves",
        " Custom fit record player cabinet",
        " A tolerance for cardio",
        " More features for this site",
      ],
    },
  ];

  return (
    <>
      {knowledgeContent.map((item) => (
        <div className={item.colClass} key={item.id}>
          <div className="tokyo_section_title">
            <h3>{item.title}</h3>
          </div>
          <div className="tokyo_tm_skill_list">
            <ul>
              {item.content.map((val, i) => (
                <li key={i}>
                  <span>
                    <img
                      className="svg"
                      src="assets/img/svg/rightarrow.svg"
                      alt="arrow"
                    />
                    {val}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default KnowledgeInterest;
