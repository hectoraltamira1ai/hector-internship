import React, { useEffect, useState } from "react"; //React and hooks for state management and side effects
import { Link } from "react-router-dom"; // Link component for navigation
import axios from "axios";
import Skeleton from "../UI/Skeleton"; //Skeleton component for loading placeholders while api data is fetched
import CountDown from "../CountDownTimer"; // Countdown timer component used for items with expiry dates



//Defining Functional components
const ExploreItems = () => {

  //State variables
  const [itemCount, setItemCount] = useState(8); // Number of items to display initially
  const [exploreItems, setExploreItems] = useState([]); // Array to store fetched items from getExploreApiData call
  const [skeletonLoading, setSkeletonLoading] = useState(true); //Boolean to manage loading state i.e. Skeleton  or Data


  // Function to fetch data from the API
  // This is the Default fetch with no filtering selected
  const getExploreApiData = async () => {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
    );
    setExploreItems(response.data); // Update state with fetched data
  };


  // Function to filter items based on a selected filter
  async function filterItems(filter) {
    setSkeletonLoading(false); // Show skeleton loader while fetching filtered data
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );

    setExploreItems(response.data);  // Update state with filtered data
    setSkeletonLoading(true); // Hide skeleton loader after data is fetched
  }


  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    getExploreApiData(); // Fetch initial data (no filtering)
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
    {/* Dropdown Menu for filtering items */}
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {/* Display items or skeleton loaders */}
      {/* If the exploreItems.length is True and the SkeletionLoading is True then display the data */}
      {/* Otherwise display the Skeleton Loader which an array of 8 empty elements */}
      {exploreItems.length && skeletonLoading ? (
        exploreItems.slice(0, itemCount).map((item, index) => (
          //The slice is used to render the itemCount items, as this number increase then more are render, (incremental loading)
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
            {/* Author information */}
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`} // Link to the author's page
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" /> {/* Author's image */}
                  <i className="fa fa-check"></i> {/* Verified icon */}
                </Link>
              </div>

              {/* Countdown timer for items with expiry dates */}
              {item.expiryDate && <CountDown expiryDate={item.expiryDate} />}

              {/* NFT image */}
              <div className="nft__item_wrap">
                <Link to={`/item-details/${item.nftId}`}> {/* NFT image */}
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>

              {/* NFT information */}
              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}> {/* Link to item details */}
                  <h4>{item.title}</h4> {/* Item title */}
                </Link>
                <div className="nft__item_price">
                  {item.price} ETH<span>{item.date}</span> {/* Price and date */}
                </div>
                <div className="nft__item_like"> 
                  <i className="fa fa-heart"></i> {/* Like icon */}
                  <span>{item.likes}</span>{/* Number of likes */}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (

         // Skeleton loaders displayed while data is being fetched
         // A new Array of length 8 is created and filled with 0's
         // The map()method is used to iterate over the array and genterate
         // JSX elements dynamically.
         // Index is used to assign a unique key to each JSX element.
        <>
        
          {new Array(8).fill(0).map((_, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <Skeleton width="100%" height="400px" /> {/* Skeleton loader */}
            </div>
          ))}
        </>
      )}


      {/* Load more button */}
      <div className="col-md-12 text-center">
        {itemCount !== 16 && ( //This condition determines if the "Load More button should be displayed"
          <Link
            onClick={() => setItemCount(itemCount + 4)} // Load 4 more items on click
            to="" //the empty attribute, means it does not navigate to a new route, Instead, it functions as a clickable element for loading more items.
            id="loadmore"
            className="btn-main"
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};


// Exporting the component for use in other parts of the application
export default ExploreItems;

