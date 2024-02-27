import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./AddBlogs.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function AddBlogs() {
  const [blogBody, setBlogBody] = useState("");

  const initialBlogState = {
    title: "",
    coverImage: "",
    category: "",
    body: "",
    isBookmarked: false,
    clickCount: 0,
  };

  const [blog, setBlog] = useState(initialBlogState);

  //Function to Handle Change
  const handleChange = (e) => {
    setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle adding a new blog
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/blogs", { ...blog, body: blogBody })
        .then((response) => {
          setBlog(response.data);
          console.log(response);
        });
      setBlog(initialBlogState);
      setBlogBody("");
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div>
      <h1 className={styles.addBlogText}>Add New Blog</h1>
      <div className={styles.inputFieldContainer}>
        <input
          type="text"
          placeholder="Enter the Title"
          name="title"
          value={blog.title}
          onChange={(e) => handleChange(e)}
          maxLength={45}
        />
        <input
          type="text"
          value={blog.coverImage}
          placeholder="Enter the image URL"
          name="coverImage"
          onChange={(e) => handleChange(e)}
        />
        <select
          name="category"
          value={blog.category}
          onChange={(e) => handleChange(e)}
        >
          <option value="" disabled selected hidden>
            Select the Category
          </option>
          <option value="design"> Designing</option>
          <option value="development">Web/App Development</option>
          <option value="health">Health</option>
          <option value="travel">Travel</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      <div className={styles.editorAndButtonContainer}>
        <ReactQuill
          theme="snow"
          value={blogBody}
          onChange={setBlogBody}
          placeholder="Describe your blog here...."
          className={styles.editor}
        />
        <button
          className={styles.addBlogButton}
          onClick={(e) => handleClick(e)}
        >
          Add Blog
        </button>
        <Link to="/">
          <p className={styles.homeButton}>Go to Home</p>
        </Link>
      </div>
    </div>
  );
}

export default AddBlogs;
