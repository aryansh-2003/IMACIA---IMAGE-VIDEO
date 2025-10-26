"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import UserContext from "../context/UserContext";
import Logo from "./logo of.png";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

// 🎇 Lightweight particle background (Canvas)
const ParticleBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let w, h;
    const num = 80;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particles = Array.from({ length: num }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      });
      requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      id="particle-canvas"
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default function Header() {
  const navigate = useNavigate();
  const { userdata, isloggedin, setisloggedin, setinputvalue } =
    useContext(UserContext);
  const [username, setUsername] = useState("");
  const [query, setQuery] = useState("");

  const placeholders = [
    "Neon Cities",
    "Ocean Shores",
    "Cyberpunk Dreams",
    "Nature",
    "Luxury Cars",
    "Space Art",
  ];

  useEffect(() => {
    if (userdata?.user?.displayName) {
      setUsername(userdata.user.displayName);
      setisloggedin(true);
    } else {
      setisloggedin(false);
    }
  }, [userdata, setisloggedin]);

  const handleSubmit = () => {
    if (!query.trim()) return;
    setinputvalue(query);
  };

  return (
    <header className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden text-white">
      {/* ⚡ Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]
 animate-gradient-x" />

      {/* ✨ Particles */}
      <ParticleBackground />

      {/* 🕶️ Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/60 pointer-events-none" />

      {/* 🔐 Login Overlay */}
      {isloggedin && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 backdrop-blur-xl bg-black/40">
          <div className="p-10 rounded-3xl bg-white/10 border border-white/20 shadow-2xl text-center">
            <p className="text-2xl font-semibold mb-4">Please log in first</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 text-white font-semibold hover:opacity-90 transition"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}

      {/* 🌐 Navigation */}
      <nav className="absolute top-0 w-full flex justify-between items-center px-10 py-6 z-10">
        <img src={Logo} alt="logo" className="w-20 opacity-90 hover:opacity-100 transition" />

        {!isloggedin && (
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-lg font-medium">
              <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="#f5a700"
                  d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"
                />
              </svg>
              <span>{username}</span>
            </button>
            <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition">
              Upload
            </button>
          </div>
        )}
      </nav>

      {/* 🧠 Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center mt-20"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
        >
          IMACIA
        </motion.h1>
        <p className="mt-3 text-lg text-gray-300 font-light tracking-wide">
          Your Dream Wallpapers, Reimagined.
        </p>

        <div className="mt-10 w-full flex justify-center">
          <div className="w-full max-w-xl">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={(e) => setQuery(e.target.value)}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </motion.div>
    </header>
  );
}
