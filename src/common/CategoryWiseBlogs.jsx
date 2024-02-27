import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CategoryWiseBlogs.module.css";
import { Link } from "react-router-dom";
import VerticalBlogBody from "./VerticalBlogBody";

function CategoryWiseBlogs({ activeTab }) {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

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
    const filteredBlog = blogs.filter((blog) => blog.category == activeTab);
    setFilteredBlogs(filteredBlog);
  }, [blogs, activeTab]);

  return (
    <div className={styles.categoryWiseBlog}>
      {filteredBlogs.map((blog) => (
        <VerticalBlogBody blog={blog} />
      ))}
    </div>
  );
}

export default CategoryWiseBlogs;
