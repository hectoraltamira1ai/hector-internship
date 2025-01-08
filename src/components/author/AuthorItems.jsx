import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

//Functional component (AuthorItems) defined
// destructuring to extract the AuthorData prop
// AuthorData prop comes from the Author.jsx page
const AuthorItems = ({ authorData }) => {
  //Skeleton Loading placeholder
  //Creates an array of 8 empty elements
  //Maps over it to generate 8 div elements,assigned a unique key using the index of the array
  const skeletonLoading = new Array(8).fill(0).map((_, index) => (
    <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <Skeleton width="100%" height="400px" />
    </div>
  ));

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!authorData || !authorData.nftCollection
            ? //Conditional rendering:
              //if authorData is not available or authorData.nftCollection is empty,
              //it renders the skeletonLoading placeholder.
              skeletonLoading
            : //Otherwise, it maps over the nftCollection array to render the actual NFT items.
              authorData.nftCollection.map((item, index) => (
                // Maps over the nftCollection array to render each NFT item
                // Each item is wrapped in a div with a uniqe key based on the index.
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    {" "}
                    {/* Container for each NFT item */}
                    <div className="author_list_pp">
                      {" "}
                      {/* Profile Picture */}
                      <Link to="">
                        {/* Clickable link (empty)wrapping the author's profile picture */}
                        <img
                          className="lazy"
                          src={authorData.authorImage} //Displays the author's profile picture
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        {" "}
                        {/* Link to the details page for the specific NFT item, using its nftId */}
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      {" "}
                      {/* Container NFT's metadata  title, ETH, likes */}
                      <Link to={`/item-details/${item.nftId}`}>
                        {" "}
                        {/* link to the details page for the specific NFT item, using its nftId */}
                        <h4>{item.title}</h4> {/*Title */}
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>{" "}
                      {/* Displays the price of NFT  in ETH */}
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i> {/* Heart Icon */}
                        <span>{item.likes}</span> {/* Number of likes */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
