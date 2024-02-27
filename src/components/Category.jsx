import React, { useEffect, useState } from "react";
import styles from "./Category.module.css";
import CategoryWiseBlogs from "../common/CategoryWiseBlogs";

function Category() {
  const [activeTab, setActiveTab] = useState("design");

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.category}>
      <h2 className={styles.forYou}>For You</h2>
      <div className={styles.categoryContainer}>
        <button
          className={activeTab === "design" ? `${styles.active}` : ""}
          onClick={() => handleClick("design")}
        >
          Design
        </button>
        <button
          className={activeTab === "development" ? `${styles.active}` : ""}
          onClick={() => handleClick("development")}
        >
          Development
        </button>
        <button
          className={activeTab === "health" ? `${styles.active}` : ""}
          onClick={() => handleClick("health")}
        >
          Health
        </button>
        <button
          className={activeTab === "travel" ? `${styles.active}` : ""}
          onClick={() => handleClick("travel")}
        >
          Travel
        </button>
        <button
          className={activeTab === "technology" ? `${styles.active}` : ""}
          onClick={() => handleClick("technology")}
        >
          Technology
        </button>
      </div>
      <div className={styles.catBlogs}>
        {activeTab && <CategoryWiseBlogs activeTab={activeTab} />}
      </div>
    </div>
  );
}

export default Category;
