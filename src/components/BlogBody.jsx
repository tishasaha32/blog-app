import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./BlogBody.module.css";
import BottomNavigationBar from "../common/BottomNavigationBar";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

function Blog({ match }) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch the blog data based on the ID
    axios
      .get(`https://blog-app-json-server.onrender.com/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
      });
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.blogBodyContainer}>
      <Link to="/">
        <IoMdArrowBack className={styles.backButton} />
      </Link>
      <div className={styles.blogImgContainer}>
        <img src={blog.coverImage} className={styles.blogImage} />
      </div>
      <h1 className={styles.blogTitle}>{blog.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: blog.body }}
        className={styles.blogBody}
      />
      <BottomNavigationBar />
    </div>
  );
}

export default Blog;
