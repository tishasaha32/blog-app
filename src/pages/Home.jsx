import React from "react";
import BottomNavigationBar from "../common/BottomNavigationBar";
import HomePageTop from "../components/HomePageTop";
import TodayBlog from "../common/TodayBlog";
import Category from "../components/Category";

function Home() {
  return (
    <div>
      <HomePageTop />
      <BottomNavigationBar />
      <TodayBlog />
      <Category />
    </div>
  );
}

export default Home;
