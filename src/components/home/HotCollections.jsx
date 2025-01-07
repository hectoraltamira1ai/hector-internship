import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import OwlCarousel from "react-owl-carousel";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);

  // Configuration options for the OwlCarousel component to make it responsive
  const options = {
    loop: true, // Enables infinite looping of carousel items
    margin: 10, // Adds a margin between carousel items
    nav: true, // Displays navigation arrows
    responsive: {
      0: {
        items: 1, // displays only 1 item for screens smaller than 600px
      },
      600: {
        items: 2, // displays only 2 item for screens smaller than 600px and 900px
      },
      900: {
        items: 3, // displays only 3 item for screens smaller than 900px and 1200px
      },
      1200: {
        items: 4, // displays only 4 item for screens smaller than 1200px and larger
      },
    },
  };

  //This is the main function to fetch data from the API and update the state with the response
  const getApiData = async () => {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );

    //Update the state with the data recieved from the API call above.
    setHotCollections(response.data);
  };

  //useEffect hook to fetch data when the component is mounted.
  useEffect(() => {
    getApiData();
  }, []); //An empty dependency ensures this will run once only on mount.

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2
                data-aos="fade-in"
                data-aos-duration="1500"
                data-aos-delay="200"
                data-aos-offset="200"
                data-aos-once="true"
              >
                Hot Collections
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          
          {/* Render the carousel if hotCollections has data */}
          {hotCollections.length ? (
            <OwlCarousel className="owl-theme" {...options}>
              {/* Map over the hotCollections array to render each collection */}
              {hotCollections.map((item, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    {/* Link to the details page of the specific NFT */}
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>

                  <div className="nft_coll_pp">
                    {/* Link to the author's profile */}
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={item.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>

                  <div className="nft_coll_info">
                    {/* Link to the explore page */}
                    <Link to="/explore">
                      <h4>{item.title}</h4>
                    </Link>

                    <span>ERC-{item.code}</span>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            //Render a skeleton loader if hotCollections is empty
            <>
              <OwlCarousel className="owl-theme" {...options}>
                {new Array(8).fill(0).map((_, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      {/* Placeholder skeleton for NFT image */}
                      <Link to={``}>
                        <Skeleton width="100%" height="200px" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      {/* Placeholder skeleton for author image */}
                      <Link to={``}>
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      {/* Placeholder skeleton for NFT title */}
                      <Link to="">
                        <Skeleton width="100px" height="20px" />
                      </Link>
                      <br />

                      {/* Placeholder skeleton for NFT code */}
                      <Skeleton width="60px" height="20px" />
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
