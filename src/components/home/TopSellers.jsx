import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  // Initializing state to hold top sellers data
  const [topSellers, setTopSellers] = useState([]);

  // Function to fetch top seller data from the API
  const getTopSellerApiData = async () => {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );

    // Updating state with the fetched data
    setTopSellers(response.data);
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    getTopSellerApiData(); // Calling the data fetching function
  }, []); // Empty dependency array means this runs once after the initial render

  return (
    <section id="section-popular" className="pb-5">
      {" "}
      {/* Main section for top sellers */}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {" "}
            {/* Column for the list of top sellers */}
            {topSellers.length ? ( // Conditional rendering based on data availability (must not be 0)
              <ol className="author_list">
                {topSellers.map(
                  (
                    item,
                    index // Mapping through top sellers data
                  ) => (
                    <li key={index}>
                      {" "}
                      {/* Unique key for each list item ( 0-11)*/}
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}>
                          {" "}
                          {/* Link to author page */}
                          <img
                            className="lazy pp-author" // Lazy loading class for images
                            src={item.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.authorId}`}>
                          {" "}
                          {/* Link to author page */}
                          {item.authorName}
                        </Link>
                        <span>{item.price} ETH</span>{" "}
                        {/* Displaying price in ETH */}
                      </div>
                    </li>
                  )
                )}
              </ol>
            ) : (
              // Fallback rendering when no data is available (Skeleton State)
              <ol className="author_list">
                {" "}
                {/* Ordered list for loading skeletons */}
                {new Array(12).fill(0).map(
                  (
                    item,
                    index // Creating 12 skeletons, filled with 0
                  ) => (
                    <li key={index}>
                      {" "}
                      {/* Unique key for each skeleton item */}
                      <div className="author_list_pp">
                        <Link to={``}>
                          {" "}
                          {/* Empty link for skeleton */}
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={``}>
                          {" "}
                          {/* Empty link for skeleton */}
                          <Skeleton width="100px" height="20px" />
                        </Link>
                        <span>
                          <Skeleton width="40px" height="20px" />{" "}
                          {/* Skeleton for price */}
                        </span>
                      </div>
                    </li>
                  )
                )}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
