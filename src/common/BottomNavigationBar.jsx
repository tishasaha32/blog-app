import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BiSearch, BiSolidSearchAlt2, BiSolidUser } from "react-icons/bi";
import { BiBookmark } from "react-icons/bi";
import styles from "./BottomNavigationBar.module.css";
import { Link, useLocation } from "react-router-dom";

function BottomNavigationBar() {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState();
  // const [isTabClicked, setIsTabClicked] = useState(false);

  useEffect(() => {
    if (pathname === "/") setActiveTab("home");
    if (pathname === "/user") setActiveTab("user");
    if (pathname === "/search") setActiveTab("search");
  }, [pathname]);

  return (
    <div className={styles.navBar}>
      <Link
        to="/"
        className={activeTab === "home" ? styles.activeTab : styles.navLink}
      >
        {/* {isTabClicked ? <AiOutlineHome className={styles.homeIcon}/> : <AiFillHome className= {styles.homeIcon}/>} */}
        <AiOutlineHome className={styles.homeIcon} />
      </Link>
      <Link
        to="/search"
        className={activeTab === "search" ? styles.activeTab : styles.navLink}
      >
        {/* {isTabClicked ? <BiSolidSearchAlt2 className={styles.searchIcon}/> : <BiSearch className={styles.searchIcon}/>} */}
        <BiSearch className={styles.searchIcon} />
      </Link>
      <Link
        to="/user"
        className={activeTab === "user" ? styles.activeTab : styles.navLink}
      >
        {/* {isTabClicked ? <BiSolidUser className={styles.userIcon}/> : <HiOutlineUser className={styles.userIcon}/>} */}
        <BiBookmark className={styles.bookmarkIcon} />
      </Link>
    </div>
  );
}

export default BottomNavigationBar;
