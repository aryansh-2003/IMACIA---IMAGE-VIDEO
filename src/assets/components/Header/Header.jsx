import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../context/UserContext";
import Logo from "./logo of.png";

export default function Header() {
  const navigate = useNavigate();
  const { userdata, isloggedin, setisloggedin, setinputvalue } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (userdata?.user?.displayName) {
      setUsername(userdata.user.displayName);
      setisloggedin(true);
    } else {
      setisloggedin(false);
    }
  }, [userdata, setisloggedin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setinputvalue(query);
  };

  return (
    <header className="fixed top-0 w-full bg-white z-50 flex items-center px-4 py-3 h-20 shadow-sm border-b border-gray-100">
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
        <img src={Logo} alt="IMACIA logo" className="w-10 h-10 object-contain rounded-full bg-black/5" />
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-1 ml-4">
        <button onClick={() => navigate("/")} className="px-4 py-3 bg-black text-white rounded-full font-semibold text-sm">Home</button>
        <button className="px-4 py-3 hover:bg-gray-100 text-black rounded-full font-semibold text-sm transition">Explore</button>
        <button className="px-4 py-3 hover:bg-gray-100 text-black rounded-full font-semibold text-sm transition">Create</button>
      </nav>

      {/* Search Bar */}
      <div className="flex-1 max-w-6xl mx-4">
        <form onSubmit={handleSubmit} className="flex items-center w-full bg-[#e9e9e9] hover:bg-[#e1e1e1] rounded-full px-4 py-3 transition-colors">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search for anime, dark aesthetics, cars..." 
            className="w-full bg-transparent focus:outline-none text-black font-medium text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-1">
        <button className="p-3 hover:bg-gray-100 rounded-full text-gray-600 transition">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
        </button>
        <button className="p-3 hover:bg-gray-100 rounded-full text-gray-600 transition">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>
        </button>
        {!isloggedin ? (
          <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition ml-2">Log in</button>
        ) : (
          <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700 ml-2 overflow-hidden hover:bg-gray-300 transition">
             {username ? username.charAt(0).toUpperCase() : "U"}
          </button>
        )}
      </div>
    </header>
  );
}
