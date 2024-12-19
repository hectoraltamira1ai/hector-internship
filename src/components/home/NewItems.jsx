import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import OwlCarousel from "react-owl-carousel";
import CountDown from "../CountDownTimer";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  // State to store the list of new items.

  //This is the main function to fetch data from the API and update the state with the response
  const getNewItemsApiData = async () => {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );

    //Update the state with the data recieved from the API call above.
    setNewItems(response.data);
  };

  // Configuration options for the OwlCarousel component to make it responsive
  const options = {
    loop: true, // Enables infinite looping of carousel items
    nav: true, // Displays navigation arrows
    margin: 10, // Adds a margin between carousel items
    responsive: {
      0: {
        items: 1, // displays only 1 item for screens smaller than 600px
      },
      600: {
        items: 2, // displays only 1 item for screens smaller than 600px and 900px
      },
      900: {
        items: 3, // displays only 1 item for screens smaller than 900px and 1200px
      },
      1200: {
        items: 4, // displays only 1 item for screens smaller than 1200px and larger
      },
    },
  };

  //useEffect hook to fetch data when the component mounts.
  useEffect(() => {
    getNewItemsApiData();
  }, []); //An empty dependency ensures this will run once only on mount.

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {/* Check if newItems array has data */}
          {newItems.length ? (
            <OwlCarousel className="owl-theme" {...options}>
              {/* Map through newItems and render each item */}
              {newItems.map((item, index) => (
                <div className="nft__item" key={index}>
                  {/* Author information */}
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${item.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={`Creator: ${item.authorName || "Unknown"}`}
                    >
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {/* Render Countdown component if item.expiryDate exists */}
                  {item.expiryDate && (
                    <CountDown expiryDate={item.expiryDate} />
                  )}
                  {/* NFT item image */}
                  <div className="nft__item_wrap">

                  {/* item extra code that is not being used */}
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* end of item extra block */}

                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  {/* NFT item details */}
                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            // Render skeleton loaders if no data is available
            <>
              <OwlCarousel className="owl-theme" {...options}>
                {new Array(8).fill(0).map((_, index) => (
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp">
                      <Link
                        to={``}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Unknown"
                      >
                        {/* Placeholder skeleton for author image */}
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">

                      {/* item extra code that is not being used */}
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* end of item extra block */}

                      {/* Placeholder skeleton for NFT image */}
                      <Link to={``}>
                        <Skeleton width="100%" height="350px" />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                    {/* Placeholder skeleton for NFT item info */}
                      <Link to={``}>
                        <Skeleton width="180px" height="30px" />
                      </Link>
                      {/* Placeholder skeleton for views and likes */}
                      <Skeleton width="100px" height="20px" />
                    </div>
                    <div className="nft__item_like">
                      <Skeleton width="30px" height="15px" />
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

export default NewItems;
