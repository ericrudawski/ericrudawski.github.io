import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import Home from "../../components/HomeNew";
import About from "../../components/about/AboutMain";
// import Portfolio from "../../components/PortfolioCreative";
// import Musings from "../../_archive/Musings";
import ServiceMain from "../../components/service/ServiceMain";
import Contact from "../../components/Contact";
// import CopyRight from "../../components/CopyRight";
import PageTitle from "../../components/PageTitle";
// import Playground from "../../components/Playground";

const HomeLight = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("isDarkModeEnabled", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <PageTitle title="Eric Rudawski" />
      {/* End page title for seo */}

      <button className="theme-switcher-label" onClick={toggleDarkMode}>
        {isDarkMode ? (
          <>
            <FaSun />
          </>
        ) : (
          <>
            <FaMoon />
          </>
        )}
      </button>

      <Tabs>
        <TabList>
          {/* START LEFT MENU CONTENT */}
          <div className="leftpart">
            <div className="leftpart_inner">
              <div className="logo">
                <Link className="navbar-brand" to="/">
                  <img src="/assets/img/logo/dark.png" alt="brand" />
                </Link>
              </div>
              {/* END LOGO */}

              <div className="menu">
                <ul>
                  <Tab>
                    <img
                      className="svg"
                      src="/assets/img/svg/home-run.svg"
                      alt="homerun"
                    />
                    <span className="menu_content">Home</span>
                  </Tab>
                  <Tab>
                    <img
                      className="svg"
                      src="/assets/img/svg/avatar.svg"
                      alt="avatar"
                    />
                    <span className="menu_content">About</span>
                  </Tab>
                  {/* <Tab>
                    <img
                      className="svg"
                      src="/assets/img/svg/setting.svg"
                      alt="avatar"
                    />
                    <span className="menu_content">Values</span>
                  </Tab> */}
                  {/* <Tab>
                    <img
                      className="svg"
                      src="/assets/img/svg/briefcase.svg"
                      alt="briefcase"
                    />
                    <span className="menu_content">Portfolio</span>
                  </Tab> */}
                  {/* <Tab>
                    <img
                      className="svg"
                      src="/assets/img/svg/musings.svg"
                      alt="paper"
                    />
                    <span className="menu_content">Musings</span>
                  </Tab>
                  <Tab>
                    <img
                      className="svg"
                      src="/assets/img/svg/musings.svg"
                      alt="paper"
                    />
                    <span className="menu_content">Playground</span>
                  </Tab> */}
                  <Tab>
                    <img
                      className="svg"
                      src="/assets/img/svg/mail.svg"
                      alt="mail"
                    />
                    <span className="menu_content"> Contact</span>
                  </Tab>
                </ul>
              </div>
              {/* END MENU */}

              {/* <CopyRight /> */}
              {/* END COPYRIGHT */}
            </div>
          </div>
          {/* END LEFT MENU CONTENT */}
        </TabList>
        {/* END SIDEBAR TABLIST */}

        {/* START RIGHT PART CONTENT */}
        <div className="rightpart">
          <div className="rightpart_in">
            <div className="tokyo_tm_section">
              <TabPanel>
                <div data-aos="fade-right" data-aos-duration="1200">
                  <Home />
                </div>
              </TabPanel>

              <TabPanel>
                <div
                  data-aos="fade-right"
                  data-aos-duration="1200"
                  data-aos-delay="100"
                >
                  <About />
                </div>
              </TabPanel>

              {/* <TabPanel>
                <div
                  data-aos="fade-right"
                  data-aos-duration="1200"
                  data-aos-delay="100"
                >
                  <ServiceMain />
                </div>
              </TabPanel>

              <TabPanel>
                <Musings />
              </TabPanel>

              <TabPanel>
                <div
                  data-aos="fade-right"
                  data-aos-duration="1200"
                  data-aos-delay="100"
                >
                  <Playground />
                </div>
              </TabPanel> */}

              <TabPanel>
                <div
                  data-aos="fade-right"
                  data-aos-duration="1200"
                  data-aos-delay="200"
                >
                  <Contact />
                </div>
              </TabPanel>
            </div>
          </div>
        </div>
        {/* END RIGHT PART CONTENT */}
      </Tabs>
      {/* END TABS */}
    </>
  );
};

export default HomeLight;
