import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import Skeleton from "../components/UI/Skeleton";
import axios from "axios";

// Component to display details of a specific NFT item

const ItemDetails = () => {
  // State to store the NFT item details
  const [nftItem, setNftItem] = useState("");

// Extracting the NFT ID from the URL parameters
  const id = useParams().id;


  // Function to fetch NFT item details from the API
  const getNftItemDetails = async () => {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );


    // Updating the state with the fetched data
    setNftItem(response.data);
  };

// useEffect hook to perform actions when the component mounts
  useEffect(() => {
    // Scroll to the top of the page when the component loads
    window.scrollTo(0, 0);

// Fetch the NFT item details
    getNftItemDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Rendering the component
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
          {/* Check if the NFT item data is available */}
            {nftItem ? (
              <div className="row">
              {/* Left column: Display the NFT image */}
                <div className="col-md-6 text-center">
                  <img
                    src={nftItem.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>

                {/* Right column: Display NFT details */}
                <div className="col-md-6">
                  <div className="item_info">
                  {/* Display NFT title and tag */}
                    <h2>{nftItem.title + " #" + nftItem.tag}</h2>

                    {/* Display views and likes */}
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {nftItem.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {nftItem.likes}
                      </div>
                    </div>

                    {/* Display NFT description */}
                    <p>{nftItem.description}</p>

                    {/* Display owner details */}
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nftItem.ownerId}`}>
                              <img
                                className="lazy"
                                src={nftItem.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nftItem.ownerId}`}>
                              {nftItem.ownerName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>

                    {/* Display creator details */}
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nftItem.creatorId}`}>
                              <img
                                className="lazy"
                                src={nftItem.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nftItem.creatorId}`}>
                              {nftItem.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Spacer for layout */}
                      <div className="spacer-40"></div>

                      {/* Display NFT price */}
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{nftItem.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (

              // Display skeleton loaders while data is being fetched
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width="100%" height="100%" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="300px" height="40px" />
                    <div className="item_info_counts">
                      <Skeleton width="80px" height="30px" />
                      <Skeleton width="80px" height="30px" />
                    </div>
                    <Skeleton width="100%" height="80px" />
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                          {/* Placeholder skeleton for author image */}
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          </div>
                          <div className="author_list_info">
                          {/* Placeholder skeleton for author list info */}
                            <Skeleton width="125px" height="20px" />
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                          {/* Placeholder skeleton for author image */}
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          </div>
                          <div className="author_list_info">
                          {/* Placeholder skeleton for author list info */}
                            <Skeleton width="125px" height="20px" />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                      {/* Placeholder skeleton for NFT price */}
                        <Skeleton width="75px" height="20px" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
