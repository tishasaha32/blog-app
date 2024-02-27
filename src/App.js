import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import User from "./pages/User";
import AddBlogs from "./pages/AddBlogs";
import Blog from "./components/BlogBody";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/user" element={<User />} />
        <Route path="/blogs" element={<AddBlogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;
