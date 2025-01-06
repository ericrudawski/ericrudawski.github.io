import React, { useEffect, useRef, useState } from "react";
import "./Playground.scss";

const Playground = () => {
  const [visibleLines, setVisibleLines] = useState([]);
  const lineRefs = useRef([]);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleLines(prev => [...prev, entry.target.dataset.index]);
        } else {
          setVisibleLines(prev => prev.filter(index => index !== entry.target.dataset.index));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5, // Trigger when 50% of the element is visible
      rootMargin: '-10% 0px' // Trigger slightly before the element comes into view
    });

    // Observe each line container
    lineRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

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
              {[
                "Never not learning",
                "Detail oriented innovator",
                "Dependably creative"
              ].map((text, index) => (
                <div 
                  key={index}
                  className="line-container"
                  ref={el => lineRefs.current[index] = el}
                  data-index={index}
                >
                  <div className={`line peek-line ${visibleLines.includes(index.toString()) ? 'hidden' : ''}`}>
                    <span className="line-text">{text}</span>
                  </div>
                  <div className={`line hover-line ${visibleLines.includes(index.toString()) ? 'visible' : ''}`}>
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