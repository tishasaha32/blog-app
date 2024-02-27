import React from "react";
import styles from "./VerticalBlogBody.module.css";
import { Link } from "react-router-dom";

function VerticalBlogBody({ blog }) {
  return (
    <div className={styles.blogContainerWrapper}>
      <Link to={`/blogs/${blog.id}`} key={blog.id} className={styles.linkStyle}>
        <div className={styles.blogContainer}>
          <img src={blog.coverImage} className={styles.blogImage} />
          <div className={styles.titleAndBodyContainer}>
            <p className={styles.blogTitle}>{blog.title}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: blog.body.slice(0, 75).concat("..."),
              }}
              className={styles.blogBody}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default VerticalBlogBody;
