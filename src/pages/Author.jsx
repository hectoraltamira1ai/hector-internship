import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import { useCallback } from "react";

const Author = () => {
  //Define functional component Author
  const [authorData, setAuthorData] = useState({}); //State set to an empty object
  const [isFollowing, setIsFollowing] = useState(false); //State set to not Following (false)
  const id = useParams().id; //Get the id from the URL (e.g. /author/:id)

  //useCallback memoizes the getAuthorData function and stores its reference in memory
  //The useEffect hook runs because it depends on the getAuthorData, and the function
  //is called to fetch the author data.
  //if the id doesn't change, useCallback returns the cached version of getAuthorData
  //if the id changes (e.g. navigating to a different author) useCallback recreates the
  //getAuthorData function with the new id.
  // the useEffect hook detects the change in getAuthorData and runs again to fetch the new
  //author data.

  const getAuthorData = useCallback(async () => {
    const response = await axios.get(
      //The id used to dynamically fetch data for a specific author.
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );

    setAuthorData(response.data);
  }, [id]); //id dependency,any changes will cause the function to recreate.

  useEffect(() => {
    window.scrollTo(0, 0);
    getAuthorData();
  }, [getAuthorData]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {authorData ? ( // If author Data is true then display author image
                        <img src={authorData.authorImage} alt="" />
                      ) : (
                        //  Else, Placeholder skeleton for author image
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        {authorData ? (
                          //If author Data is true then,
                          //dynamically populating authorName, tag, address from authorData
                          <h4>
                            {authorData.authorName}
                            <span className="profile_username">
                              @{authorData.tag} {/*profile username */}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorData.address} {/*profile address */}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        ) : (
                          // Else, use these placeholder skeleton for profile username, wallet if there is no
                          // authorData
                          <h4>
                            <Skeleton width="200px" />
                            <span className="profile_username">
                              <Skeleton width="100px" /> {/*profile username */}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width="250px" /> {/*profile wallet */}
                            </span>
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {authorData ? (
                        <>
                          {/* Takes the value of followers and either adds a 1 or 0 depending if user is already following */}
                          <div className="profile_follower">
                            {(authorData.followers || 0) +
                              (isFollowing ? 1 : 0)}{" "}
                            followers
                          </div>
                          {isFollowing ? ( //The isFollowing state determines which button to display (Follow / Unfollow)
                            <Link
                              to="#" // to='#' attribute is used to prevent navaigation,because the button's primary purpose is to toggle the isFollowing state.
                              className="btn-main"
                              onClick={() => setIsFollowing(!isFollowing)} // clicking it toggles isFollowing to false, effectively "unfollowing" the author.
                            >
                              Unfollow{" "}
                              {/* button displayed when isFollowing is true */}
                            </Link>
                          ) : (
                            <Link
                              to="#" // to='#' attribute is used to prevent navaigation,because the button's primary purpose is to toggle the isFollowing state.
                              className="btn-main"
                              onClick={() => setIsFollowing(!isFollowing)} // clicking it toggles isFollowing to true, effectively "following" the author.
                            >
                              Follow{" "}
                              {/* button displayed when isFollowing is fasle */}
                            </Link>
                          )}
                        </>
                      ) : (
                        // Placeholder skeleton for profile follower if there is no
                        // authorData
                        <div className="profile_follower">
                          <Skeleton width="150px" height="40px" />{" "}
                          {/*profile follower */}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {/*AuthorItems component dynamically renders author-related data using the authorData prop */}
                  <AuthorItems authorData={authorData} />{" "}
                  {/*displays 8 author NFT's */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Exporting the component for use in other parts of the application
export default Author;
