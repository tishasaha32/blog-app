import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CategoryWiseBlogs.module.css";
import { Link } from "react-router-dom";
import VerticalBlogBody from "./VerticalBlogBody";

function CategoryWiseBlogs({ activeTab }) {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);

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
    if (activeTab === "all") {
      setFilteredBlogs(blogs);
    } else {
      const filteredBlog = blogs.filter((blog) => blog.category === activeTab);
      setFilteredBlogs(filteredBlog);
    }
    setCurrentPage(1); // Reset to first page when activeTab changes
  }, [blogs, activeTab]);

  // Logic to get current blogs based on pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <ul className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(filteredBlogs.length / blogsPerPage) },
          (_, i) => (
            <div key={i} className={currentPage === i + 1 ? styles.active : ""}>
              <button
                onClick={() => paginate(i + 1)}
                className={styles.paginationButton}
              >
                {i + 1}
              </button>
            </div>
          )
        )}
      </ul>
    </div>
  );
}

export default CategoryWiseBlogs;
