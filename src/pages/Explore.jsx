import React, { useEffect } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

// Using useEffect to ensure that the page scrolls to the top when the component
// is mounted. 
const Explore = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); //empty dependency ensures that the effect will only run once.

  return (
    <div id="wrapper"> {/* Wrapper div for the entire page */}
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>


        {/* Subheader Section */}
        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }} //url to change background image
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1> {/* Page Title */}
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>


        {/* Main Content Section -starts with 2 rows of 4 each "more" will add 4 more until 8 total is reached*/}
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <ExploreItems /> {/* Child component that renders the items to explore */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};


// Exporting the component for use in other parts of the application
export default Explore;
