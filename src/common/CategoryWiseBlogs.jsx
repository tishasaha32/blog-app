import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CategoryWiseBlogs.module.css";
import { Link } from "react-router-dom";
import VerticalBlogBody from "./VerticalBlogBody";

function CategoryWiseBlogs({ activeTab }) {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Changed initial value to 0
  const [blogsPerPage] = useState(5); // Changed blogsPerPage to 5

  useEffect(() => {
    axios
      .get("https://blog-app-json-server.onrender.com/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredBlogs(blogs);
    } else {
      const filteredBlog = blogs.filter((blog) => blog.category === activeTab);
      setFilteredBlogs(filteredBlog);
    }
    setCurrentPage(0); // Reset to first page when activeTab changes
  }, [blogs, activeTab]);

  // Logic to get current blogs based on pagination
  const indexOfLastBlog = (currentPage + 1) * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page to next
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredBlogs.length / blogsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Change page to previous
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.categoryWiseBlog}>
      {currentBlogs.length > 0 ? (
        currentBlogs.map((blog) => (
          <VerticalBlogBody key={blog.id} blog={blog} />
        ))
      ) : (
        <p>No blogs found.</p>
      )}

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={styles.paginationButton}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(filteredBlogs.length / blogsPerPage) - 1
          }
          className={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CategoryWiseBlogs;
