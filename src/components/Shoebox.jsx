import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import "./ShoeBox.css";  // We'll write the styling later

const ShoeBox = ({ items }) => {
  const [opened, setOpened] = useState(false);
  const [floating, setFloating] = useState(false);

  const boxSpring = useSpring({
    to: { transform: floating ? "translateY(0%)" : "translateY(-100%)" },
    config: { tension: 180, friction: 12 },
  });

  const lidSpring = useSpring({
    to: {
      transform: opened ? "rotateX(0deg)" : "rotateX(-120deg)",
      opacity: opened ? 0 : 1,
    },
    config: { tension: 180, friction: 12 },
  });

  const itemsSpring = useSpring({
    to: {
      opacity: opened ? 1 : 0,
      transform: opened ? "translateX(0px)" : "translateX(100%)",
    },
    config: { tension: 150, friction: 20 },
  });

  const handleClick = () => {
    setFloating(true); // Start the box floating into the middle
    setTimeout(() => {
      setOpened(true); // Open the box after it floats in
    }, 1000);
  };

  return (
    <div className="container">
      <animated.div className="shoe-box" style={boxSpring} onClick={handleClick}>
        <animated.div className="lid" style={lidSpring}></animated.div>
        <div className="shoe-box-body"></div>
      </animated.div>
      
      {/* The grid of items that will appear when the box opens */}
      <animated.div className="item-grid" style={itemsSpring}>
        {opened &&
          items.map((item, index) => (
            <div className="item" key={index}>
              <img src={item} alt={`item-${index}`} />
            </div>
          ))}
      </animated.div>
    </div>
  );
};

export default ShoeBox;
