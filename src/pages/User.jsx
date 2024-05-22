import React, { useEffect, useState } from "react";
import BottomNavigationBar from "../common/BottomNavigationBar";
import VerticalBlogBody from "../common/VerticalBlogBody";
import styles from "./User.module.css";
import axios from "axios";
import nothingToShow from "../assets/nothingToShow.jpg";

function User() {
  const [bookmarkBlogs, setBookmarkBlogs] = useState();

  useEffect(() => {
    axios
      .get("https://blog-app-json-server.onrender.com/bookmark")
      .then((response) => {
        setBookmarkBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  return (
    <div className={styles.userPage}>
      <h2 className={styles.bookmarkBlogText}>Bookmarked Blogs</h2>
      {bookmarkBlogs?.length > 0 ? (
        bookmarkBlogs?.map((bookmarkBlog) => (
          <VerticalBlogBody blog={bookmarkBlog} />
        ))
      ) : (
        <div className={styles.nothingToShowImgContainer}>
          <img src={nothingToShow} className={styles.nothingToShowImg} />
          <h2>Nothing to show</h2>
        </div>
      )}
      <BottomNavigationBar />
    </div>
  );
}

export default User;
