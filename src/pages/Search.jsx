import React, { useState, useEffect } from "react";
import BottomNavigationBar from "../common/BottomNavigationBar";
import styles from "./Search.module.css";
import { CiSearch } from "react-icons/ci";
import MostViewedBlogs from "../components/MostViewedBlogs";
import axios from "axios";
import VerticalBlogBody from "../common/VerticalBlogBody";

function Search() {
  const [blogs, setBlogs] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // const searchFilter = blogs.filter((blog) => blog.title == e.target.value);
    const searchFilter = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(e.target.value)
    );
    setSearchResults(searchFilter);
    // console.log(searchResults);
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchBarContainer}>
        <CiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search for your blog..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchBar}
        />
      </div>
      {searchTerm !== "" ? (
        <p className={styles.searchTerm}>
          Search results for <i>"{searchTerm}"</i>
        </p>
      ) : null}
      {searchTerm !== "" ? (
        searchResults.map((searchResult) => (
          <VerticalBlogBody blog={searchResult} />
        ))
      ) : (
        <MostViewedBlogs blogs={blogs} />
      )}
      <BottomNavigationBar />
    </div>
  );
}

export default Search;
