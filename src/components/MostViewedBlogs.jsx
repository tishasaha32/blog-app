import React from "react";
import styles from "./MostViewedBlogs.module.css";
import VerticalBlogBody from "../common/VerticalBlogBody";

function MostViewedBlogs({ blogs }) {
  return (
    <div>
      <h2 className={styles.mostlyViewedText}>Mostly Viewed</h2>
      {blogs
        ?.sort((a, b) => b.clickCount - a.clickCount)
        .slice(0, 3)
        .map((blog) => (
          <VerticalBlogBody blog={blog} />
        ))}
    </div>
  );
}

export default MostViewedBlogs;
