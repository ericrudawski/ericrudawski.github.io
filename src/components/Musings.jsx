import React, { useState } from "react";
import Modal from "react-modal";
import Social from "./Social";

Modal.setAppElement("#root");

const Musings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  function toggleModalOne() {
    setIsOpen(!isOpen);
  }
  function toggleModalTwo() {
    setIsOpen2(!isOpen2);
  }
  function toggleModalThree() {
    setIsOpen3(!isOpen3);
  }
  function toggleModalFour() {
    setIsOpen4(!isOpen4);
  }

  return (
    <>
      <div className="container">
        <div className="tokyo_tm_news">
          <div className="tokyo_tm_title">
            <div className="title_flex">
              <div className="left">
                <span>Musings</span>
                <h3>Digital Shoebox</h3>
              </div>
            </div>
          </div>
          {/* END TITLE */}

          <ul>
            <li data-aos="fade-right" data-aos-duration="1200">
              <div className="list_inner">
                <div className="image" onClick={toggleModalOne}>
                  <img src="assets/img/thumbs/4-3.jpg" alt="thumb" />
                  <div
                    className="main"
                    style={{
                      backgroundImage: "url(assets/img/musings/Earl1.jpeg)",
                    }}
                  ></div>
                </div>
                {/* END IMAGE */}
                <div className="details">
                  <div className="extra">
                    <p className="date">
                      {/* By <a href="#">Alex Watson</a> */}
                      <span>Oct 23</span>
                    </p>
                  </div>
                  {/* END EXTRA */}

                  <h3 className="title" onClick={toggleModalOne}>
                    Culture // <br></br>The Strangest Secret; Earl Nightingale
                  </h3>
                  <div className="tokyo_tm_read_more">
                    <a onClick={toggleModalOne}>
                      <span>Read More</span>
                    </a>
                  </div>
                  {/* END READ MORE BUTTON */}
                </div>
                {/* END DETAILS */}

                {/* START MODAL */}
                <Modal
                  isOpen={isOpen}
                  onRequestClose={toggleModalOne}
                  contentLabel="My dialog"
                  className="mymodal"
                  overlayClassName="myoverlay"
                  closeTimeoutMS={500}
                >
                  <div className="tokyo_tm_modalbox_news">
                    <button className="close-modal" onClick={toggleModalOne}>
                      <img src="assets/img/svg/cancel.svg" alt="close icon" />
                    </button>
                    {/* END CLOSE ICON */}
                    <div className="box_inner">
                      <div className="description_wrap scrollable">
                        <div className="image">
                          <img src="assets/img/thumbs/4-3.jpg" alt="tumb" />
                          <div
                            className="main"
                            style={{
                              backgroundImage:
                                "url(assets/img/musings/Earl1.jpeg)",
                            }}
                          ></div>
                        </div>
                        {/* END IMAGE */}
                        <div className="details">
                          <div className="extra">
                            <p className="date">
                              {/* By <a href="#">Alex Watson</a> */}
                              Oct 23
                            </p>
                          </div>
                          <h3 className="title">
                            We become what we think about
                          </h3>
                        </div>
                        {/* END DETAILS */}
                        <div className="main_content ">
                          <div className="descriptions">
                            <p className="bigger">
                              <b>Why I'm writing about it:</b>
                              <br></br> It is not an exaggeration to say that
                              this is the most influential recording I have
                              listened to. It's a core part of my approach to
                              life, and I probably listen to it no less than four
                              times a year.
                            </p>
                            <p>
                              <b>Summary: </b> The six words at the top of this
                              write up are the big idea in this recording.
                              Nightingale, a military man turned radio host,
                              asserts that the key to success lies in setting a
                              goal and then working towards it each day. He goes
                              on to say that this is not knowledge he unearthed
                              on his own, but rather that history has been
                              trying to teach this lesson for ages. This
                              includes the bible in Galatians 6:7: "A man reaps
                              what he sows."
                            </p>
                            <p>
                              <b>Other thoughts:</b> This recording remains
                              relevant today not only because it re-introduces
                              this ancient truth, but also because it does so
                              casually. In today's world where attention is at a
                              premium, it is impressive how Nightingale is able
                              to distill so much information into a 30 minute
                              recording. That's why despite countless listens, I
                              still come away with something new each time.
                            </p>
                            <div className="quotebox">
                              <div className="icon">
                                <img
                                  className="svg"
                                  src="assets/img/svg/quote.svg"
                                  alt="quore"
                                />
                              </div>
                              <p>
                                ...the opposite of courage in our society is not
                                cowardice. It is conformity. And there you have
                                the trouble today. It’s conformity – people
                                acting like everyone else without knowing why,
                                without knowing where they’re going.<br></br>
                                -Earl Nightingale
                              </p>
                            </div>
                            {/* END QUOTEBOX */}
                            {/* <p>
                              In London, everyone is different, and that means
                              anyone can fit in.
                            </p> */}
                            {/* <p>
                              The trick here is to look slowly, and then look
                              again. Take the time to look in detail and to look
                              at the same thing from different angles, with
                              different light, long lenses and wide lenses. Then
                              move to the left a bit. You may never feel the
                              need to leave the house again.
                            </p> */}
                          </div>
                          {/* END DESCRIPTION */}
                          {/* <div className="news_share">
                            <span>Share:</span>
                            <Social /> */}
                          {/* END SOCIAL SHARE */}
                          {/* </div> */}
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
            </li>
            {/* END SINGLE BLOG */}

            <li
              data-aos="fade-right"
              data-aos-duration="1200"
              data-aos-delay="200"
            >
              <div className="list_inner">
                <div className="image" onClick={toggleModalTwo}>
                  <img src="assets/img/thumbs/4-3.jpg" alt="thumb" />
                  <div
                    className="main"
                    style={{
                      backgroundImage: "url(assets/img/musings/Table1.jpeg)",
                    }}
                  ></div>
                </div>
                {/* END IMAGE */}

                <div className="details">
                  <div className="extra">
                    <p className="date">
                      {/* By <a href="#">Brook Kennedy</a> */}
                      <span>Jun 23</span>
                    </p>
                  </div>
                  {/* END EXTRA */}

                  <h3 className="title" onClick={toggleModalTwo}>
                    Culture // <br></br>Setting the Table; Danny Meyer
                  </h3>
                  <div className="tokyo_tm_read_more">
                    <a onClick={toggleModalTwo}>
                      <span>Read More</span>
                    </a>
                  </div>
                  {/* END READ MORE BUTTON */}
                </div>

                <Modal
                  isOpen={isOpen2}
                  onRequestClose={toggleModalTwo}
                  contentLabel="My dialog"
                  className="mymodal"
                  overlayClassName="myoverlay"
                  closeTimeoutMS={500}
                >
                  <div className="tokyo_tm_modalbox_news">
                    <button className="close-modal" onClick={toggleModalTwo}>
                      <img src="assets/img/svg/cancel.svg" alt="close icon" />
                    </button>
                    {/* END CLOSE MODAL */}
                    <div className="box_inner">
                      <div className="description_wrap scrollable">
                        <div className="image">
                          <img src="assets/img/thumbs/4-3.jpg" alt="thumb" />
                          <div
                            className="main"
                            style={{
                              backgroundImage:
                                "url(assets/img/musings/Table1.jpeg)",
                            }}
                          ></div>
                        </div>
                        {/* END IMAGE */}
                        <div className="details">
                          <div className="extra">
                            {/* <p className="date"> */}
                            {/* By <a href="#">Brook Kennedy</a> */}
                            <span>Jun 23</span>
                            {/* </p> */}
                          </div>
                          <h3 className="title">
                            Some ingredients for success
                          </h3>
                        </div>
                        {/* END DETAILS */}
                        <div className="main_content ">
                          <div className="descriptions">
                            <p className="bigger">
                              <b>Why I'm writing about it:</b>
                              <br></br> I read a lot. This will probably be the
                              first of many book review-eque entries on this
                              page. That said, I couldn't have picked a better
                              book to be first. A recommendation from a friend,
                              I picked this one up and couldn't put it down.
                            </p>
                            <p>
                              <b>Summary: </b> Danny Meyer is a restauranteur,
                              and the brains behind the Union Square Hospitality
                              Group. Part autobiography, part memoir, and part
                              business playbook, Setting the Table aims to
                              provide a full course on managemnt, and does not
                              disappoint.
                            </p>
                            <p>
                              <b>Other thoughts:</b> I usually lean more toward
                              non-fiction, but I think even fiction lovers would
                              appreciate Meyer's storytelling in this book. He
                              is able to clarly explain and illustrate complex
                              leadership concepts by drawing from his own lived
                              experiences. For example, he is able to speak to
                              the importance (and value) of giving back to your
                              commuity by describing his own contributions and
                              how they have impacted his business.
                            </p>
                            <div className="quotebox">
                              <div className="icon">
                                <img
                                  className="svg"
                                  src="assets/img/svg/quote.svg"
                                  alt="quore"
                                />
                              </div>
                              <p>
                                The excellence reflex is rooted in instinct and
                                upbringing, and then constantly honed through
                                awareness, caring and practice. The overarching
                                concern to do the right thing well is something
                                we can't train for. Either it's there or it
                                isn't.<br></br>-Danny Meyer
                              </p>
                            </div>
                            {/* END QUOTEBOX */}
                            {/* <p>
                              In London, everyone is different, and that means
                              anyone can fit in.
                            </p> */}
                            {/* <p>
                              The trick here is to look slowly, and then look
                              again. Take the time to look in detail and to look
                              at the same thing from different angles, with
                              different light, long lenses and wide lenses. Then
                              move to the left a bit. You may never feel the
                              need to leave the house again.
                            </p> */}
                          </div>
                          {/* <div className="news_share">
                            <span>Share:</span>
                            <Social /> */}
                          {/* END SOCIAL */}
                          {/* </div> */}
                          {/* END NEWS SHARE */}
                        </div>
                        {/* END MAIN CONTENT */}
                      </div>
                    </div>
                  </div>
                </Modal>
                {/* END MODAL */}
              </div>
              {/* END LIST INNER */}
            </li>
            {/* END SINGLE BLOG */}

            <li
              data-aos="fade-right"
              data-aos-duration="1200"
              data-aos-delay="300"
            >
              <div className="list_inner">
                <div className="image" onClick={toggleModalThree}>
                  <img src="assets/img/thumbs/4-3.jpg" alt="thumb" />
                  <div
                    className="main"
                    style={{
                      backgroundImage: "url(assets/img/musings/Wood4.png)",
                    }}
                  ></div>
                </div>
                {/* END IMAGE */}

                <div className="details">
                  <div className="extra">
                    <p className="date">
                      {/* By <a href="#">Paola Atkins</a> */}
                      <span>Feb 2023</span>
                    </p>
                  </div>

                  <h3 className="title" onClick={toggleModalThree}>
                    For Fun // <br></br>Woodworking
                  </h3>
                  <div className="tokyo_tm_read_more">
                    <a onClick={toggleModalThree}>
                      <span>Read More</span>
                    </a>
                  </div>
                </div>
                {/* END DETAILS */}

                {/* START MODAL */}
                <Modal
                  isOpen={isOpen3}
                  onRequestClose={toggleModalThree}
                  contentLabel="My dialog"
                  className="mymodal"
                  overlayClassName="myoverlay"
                  closeTimeoutMS={500}
                >
                  <div className="tokyo_tm_modalbox_news">
                    <button className="close-modal" onClick={toggleModalThree}>
                      <img src="assets/img/svg/cancel.svg" alt="close icon" />
                    </button>
                    <div className="box_inner">
                      <div className="description_wrap scrollable">
                        <div className="image">
                          <img src="assets/img/thumbs/4-3.jpg" alt="thumb" />
                          <div
                            className="main"
                            style={{
                              backgroundImage:
                                "url(assets/img/musings/Wood4.png)",
                            }}
                          ></div>
                        </div>
                        <div className="details">
                          <div className="extra">
                            {/* <p className="date"> */}
                            {/* By <a href="#">Paola Atkins</a> */}
                            <span>Feb 2023</span>
                            {/* </p> */}
                          </div>
                          <h3 className="title">
                            Going against the grain (or with it?)
                          </h3>
                        </div>
                        <div className="main_content ">
                          <div className="descriptions">
                            <p className="bigger">
                              <b>Why I'm writing about it:</b>
                              <br></br> I am the latest entry in a long family
                              ledger of craftsmen. That said, I struggled with
                              this part of my identity for a long time, as it's
                              not congruent with the digital-first world we find
                              ourselves in. I had a conviction that "building"
                              anything using 1's and 0's was in someway,
                              cheating. I still feel that, to a degree, but have
                              softened my stance since discovering woodworking.
                            </p>
                            <p>
                              <b>Why I do it:</b> A tinkerer at heart, I have
                              always been compelled to do work with my hands.
                              This has led to me knowing my way around a
                              toolbox, an engine bay, and the odd IKEA
                              instruction manual. Growing up, I watched my dad
                              wake up at 5am six days a week to go to work at a
                              machine shop; this was an inspiration to me in
                              that I saw him manufacture actual value through
                              physical goods. In getting started with
                              woodworking, I aimed to do the same.
                            </p>
                            <p>
                              <b>Other thoughts:</b> Despite a generally steady
                              hand, I was no good at planning out projects with
                              pencil and paper. Instead, I turned to CAD
                              software like Fusion 360 (see image above). This
                              was a fun skill to learn, but it's a different
                              challenge entirely to translate those "drawings"
                              to physical projects. Working out of a one-car
                              garage adds it's own challenges as well, but I
                              feel blessed to have the space at all. Finally,
                              sourcing materials has been a fun exercise in
                              measuring once, buying twice.
                            </p>
                            <div className="quotebox">
                              <div className="icon">
                                <img
                                  className="svg"
                                  src="assets/img/svg/quote.svg"
                                  alt="quore"
                                />
                              </div>
                              <p>
                                The point of a venerated craft like woodworking
                                is to eschew the “rat race” mentality that is
                                the cause of so much frustration in modern
                                consumerist society.<br></br>-Nick Offerman
                              </p>
                            </div>
                            {/* END QUOTEBOX */}
                            {/* <p>
                              Pretend everything is new and that you haven’t
                              seen it before, and then you will be free to
                              notice the leading lines, the places where one
                              edge meets another in delightful geometric
                              harmony, and how the ordinary things in the
                              kitchen are transformed when the light is on or
                              off.
                            </p>
                            <p>
                              The trick here is to look slowly, and then look
                              again. Take the time to look in detail and to look
                              at the same thing from different angles, with
                              different light, long lenses and wide lenses. Then
                              move to the left a bit. You may never feel the
                              need to leave the house again.
                            </p> */}
                          </div>
                          {/* <div className="news_share">
                            <span>Share:</span>
                            <Social /> */}
                          {/* END SCCIAL SHARE */}
                          {/* </div> */}
                        </div>
                        {/* END MAIN CONTENT */}
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
              {/* END LIST INNER */}
            </li>
            {/* END SINGLE BLOG */}

            <li
              data-aos="fade-right"
              data-aos-duration="1200"
              data-aos-delay="400"
            >
              <div className="list_inner">
                <div className="image" onClick={toggleModalFour}>
                  <img src="assets/img/thumbs/4-3.jpg" alt="thumb" />
                  <div
                    className="main"
                    style={{
                      backgroundImage: "url(assets/img/musings/Paris1.jpg)",
                    }}
                  ></div>
                </div>
                {/* END IMAGE */}

                <div className="details">
                  <div className="extra">
                    <p className="date">
                      {/* By <a href="#">Kevin Stone</a> */}
                      <span>Dec 2022</span>
                    </p>
                  </div>
                  {/* END EXTRA */}

                  <h3 className="title" onClick={toggleModalFour}>
                    Travel // <br></br>London + Paris
                  </h3>
                  <div className="tokyo_tm_read_more">
                    <a onClick={toggleModalFour}>
                      <span>Read More</span>
                    </a>
                  </div>
                </div>
                {/* END DETAILS */}
                <Modal
                  isOpen={isOpen4}
                  onRequestClose={toggleModalFour}
                  contentLabel="My dialog"
                  className="mymodal"
                  overlayClassName="myoverlay"
                  closeTimeoutMS={500}
                >
                  <div className="tokyo_tm_modalbox_news">
                    <button className="close-modal" onClick={toggleModalFour}>
                      <img src="assets/img/svg/cancel.svg" alt="close icon" />
                    </button>
                    {/* END CLOSE ICON */}
                    <div className="box_inner">
                      <div className="description_wrap scrollable">
                        <div className="image">
                          <img src="assets/img/thumbs/Paris1.jpg" alt="thumb" />
                          <div
                            className="main"
                            style={{
                              backgroundImage:
                                "url(assets/img/musings/Paris1.jpg)",
                            }}
                          ></div>
                        </div>
                        {/* END IMAGE */}

                        <div className="details">
                          <div className="extra">
                            {/* <p className="date"> */}
                            {/* By <a href="#toggleButton">Eric Rudawski</a> */}
                            <span>Dec 2022</span>
                            {/* </p> */}
                          </div>
                          <h3 className="title">
                            Bits and bobs from our trip across the pond
                          </h3>
                        </div>
                        {/* END DETAILS */}

                        <div className="main_content ">
                          <div className="descriptions">
                            <p className="bigger">
                              <b>Why I'm writing about it:</b>
                              <br></br> Annie and I had been wanting to do an
                              international trip for a long time. When it
                              finally came to pass, we couldn't be more chuffed
                              with how it turned out.
                            </p>
                            <p>
                              <b>Summary:</b> We were in Europe for fourteen
                              days or so. We started out in London, and were
                              there for most of the time, before taking the
                              "chunnel" and spending our last few days in Paris.
                              We had no real itinerary besides eating and
                              drinking our way through these gastric meccas.
                            </p>
                            <p>
                              <b>Highlights:</b> Both cities are very easy to
                              manuver. Language was never a barrier. We loved
                              cancelling all the reservations we had made, just
                              to find more exciting things to do instead.
                            </p>
                            <p>
                              <b>Lowlights:</b> Me falling ill in London, and
                              Annie subdequently falling ill in Paris. We missed
                              a top 10 bar in the world in London due to just
                              running out of time. The broken lift in the London
                              Hotel...and our room on the 5th floor.
                            </p>
                            <div className="quotebox">
                              <div className="icon">
                                <img
                                  className="svg"
                                  src="assets/img/svg/quote.svg"
                                  alt="quote"
                                />
                              </div>
                              <p>
                                In London, everyone is different, and that means
                                anyone can fit in.<br></br>-Paddington Bear
                              </p>
                            </div>
                            {/* END QUOTEBOX */}
                            {/* <p>
                              Pretend everything is new and that you haven’t
                              seen it before, and then you will be free to
                              notice the leading lines, the places where one
                              edge meets another in delightful geometric
                              harmony, and how the ordinary things in the
                              kitchen are transformed when the light is on or
                              off.
                            </p>
                            <p>
                              The trick here is to look slowly, and then look
                              again. Take the time to look in detail and to look
                              at the same thing from different angles, with
                              different light, long lenses and wide lenses. Then
                              move to the left a bit. You may never feel the
                              need to leave the house again.
                            </p> */}
                          </div>
                          {/* <div className="news_share">
                            <span>Share:</span>
                            <Social /> */}
                          {/* END SOCIAL SHARE */}
                          {/* </div> */}
                        </div>
                        {/* END MAIN CONTENT */}
                      </div>
                    </div>
                  </div>
                </Modal>
                {/* END MODAL */}
              </div>
              {/* END LIST INNER */}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Musings;
