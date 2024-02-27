import React from 'react'
import styles from './HomePageTop.module.css'
import { Link } from "react-router-dom";

function HomePageTop() {
  return (
    <div className={styles.homePageTop}>
        <h1>Today's Read</h1>
        <Link to="/blogs"><button className={styles.createBlogButton}>Create Blog</button> </Link>
    </div>
  )
}

export default HomePageTop