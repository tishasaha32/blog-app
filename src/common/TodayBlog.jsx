import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./TodayBlog.module.css";
import { BiBookmark } from "react-icons/bi";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

function TodayBlog() {
  const [blogs, setBlogs] = useState([]);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/bookmark")
      .then((response) => {
        setBookmarkedBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const handleBlogClick = async (id) => {
    //Counting the clicks
    const newBlogs = [...blogs];
    const clickedBlog = newBlogs.find((blog) => blog.id === id);
    clickedBlog.clickCount = clickedBlog.clickCount + 1;
    setBlogs(newBlogs);

    try {
      await axios.put(`http://localhost:8000/blogs/${id}`, clickedBlog);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleClick = async (id) => {
    //Filtering the blogs which are need to be bookmarked
    const newBlogs = [...blogs];
    const bookmarkedBlog = newBlogs.find((blog) => blog.id === id);

    //Changing the isBookmarked property to true or false on click
    if (bookmarkedBlog.isBookmarked === true)
      bookmarkedBlog.isBookmarked = false;
    else bookmarkedBlog.isBookmarked = true;

    // Checking if blog is already exist in the bookmark blog list
    // if exist remove
    // if not add
    const isAlreadyBookmarked = bookmarkedBlogs.find((blog) => blog.id === id);

    if (!isAlreadyBookmarked) {
      setBookmarkedBlogs([...bookmarkedBlogs, bookmarkedBlog]);
      try {
        await axios.post("http://localhost:8000/bookmark", bookmarkedBlog);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    } else {
      const newBookmarkedBlogs = [...bookmarkedBlogs];
      const index = newBookmarkedBlogs.indexOf(bookmarkedBlog);
      newBookmarkedBlogs.splice(index, 1);
      setBookmarkedBlogs(newBookmarkedBlogs);
      console.log(
        index,
        "index",
        newBookmarkedBlogs,
        "new bookmarkedblogs blogs"
      );
      try {
        await axios.delete(`http://localhost:8000/bookmark/${id}`);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }

    setBlogs(newBlogs);

    // Update blogs is bookmarked status
    try {
      await axios
        .put(`http://localhost:8000/blogs/${id}`, bookmarkedBlog)
        .then((response) => {
          // setBookmarkedBlogs(response.data);
          console.log(response);
        });
    } catch (error) {
      console.error("Error fetchi-ng blogs:", error);
    }
  };
  return (
    <div className={styles.todayBlog}>
      {blogs ? (
        <div className={styles.blogContainer}>
          {blogs.map((blog) => (
            <ul>
              <Link
                to={`/blogs/${blog.id}`}
                key={blog.id}
                className={styles.linkStyle}
              >
                <img
                  src={blog.coverImage}
                  className={styles.blogImage}
                  onClick={() => handleBlogClick(blog.id)}
                />
              </Link>
              <div className={styles.titleandBookmarkContainer}>
                <p
                  className={styles.blogTitle}
                  onClick={() => handleBlogClick(blog.id)}
                >
                  {blog.title}
                </p>
                <div onClick={(e) => handleClick(blog.id)}>
                  {blog.isBookmarked ? (
                    <BsFillBookmarkCheckFill className={styles.bookmark} />
                  ) : (
                    <BiBookmark className={styles.bookmark} />
                  )}
                </div>
              </div>
            </ul>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TodayBlog;
