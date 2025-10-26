import React, { useContext, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { ReactLenis } from "lenis/react";
import { Image } from "@heroui/react";
import UserContext from "../context/UserContext";
import ImageRender from "../ImageRender/ImageRender";
import Masonry from "../ImageRender/Masonry";
import { BackgroundGradient } from "../ui/background-gradient";

function usePexelsSearch(query, page = 1) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(3);

  const fetchImages = useCallback(() => {
    if (!query) return;
    setLoading(true);
    setError(null);

    fetch(`https://api.pexels.com/v1/search?page=${page}&query=${query}&per_page=30`, {
      headers: {
        Authorization: "VAet3ekIF1hWUIyVcVtDuLMguI7LB4gAlvFjpcfbhlipPP3mRyxD6eFc",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Network error. Retrying...");
        setLoading(false);

        if (retryCount > 0) {
          setTimeout(() => setRetryCount((r) => r - 1), 1500);
        } else {
          setError("Failed to load. Please refresh.");
        }
      });
  }, [query, page, retryCount]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return { data, loading, error, retryCount };
}

export default function Sample1() {
  const { isloggedin, inputvalue } = useContext(UserContext);
  const [query, setQuery] = useState("trending");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputvalue) {
      setQuery(inputvalue);
      setPage(1); // Reset to page 1 on new search
    }
  }, [inputvalue]);

  const { data, loading, error } = usePexelsSearch(query, page);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ReactLenis root />
      <section
        className={`relative w-full min-h-screen overflow-hidden text-white transition-all duration-500 ${
          isloggedin ? "hidden" : "visible"
        }`}
      >
        {/* Animated Galaxy Background */}
        <div className="fixed inset-0 bg-[#0a0118] -z-10">
          {/* Stars layer */}
          <div className="absolute inset-0 opacity-60">
            <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-[25%] left-[60%] w-1 h-1 bg-blue-200 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-[45%] left-[15%] w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-[60%] left-[70%] w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-[80%] left-[40%] w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-[15%] left-[85%] w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute top-[35%] left-[45%] w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
            <div className="absolute top-[70%] left-[80%] w-1 h-1 bg-blue-200 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
            <div className="absolute top-[50%] left-[90%] w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '1.8s'}}></div>
            <div className="absolute top-[90%] left-[25%] w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{animationDelay: '0.7s'}}></div>
          </div>
          
          {/* Nebula clouds */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[130px] animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Galaxy spiral gradient */}
          <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-blue-950/40"></div>
        </div>

        <div className="relative z-10 pt-20 pb-32 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Explore Stunning Visuals
            </h1>
            <p className="mt-3 text-slate-300 text-lg">
              {loading
                ? "Loading images..."
                : error
                ? error
                : `Showing results for "${query}"`}
            </p>
          </motion.div>

          {/* Content Area */}
          <div className="max-w-[1600px] mx-auto">
            {loading && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl h-60 w-full shadow-md border border-white/10"
                  ></div>
                ))}
              </div>
            )}

            {!loading && data && data.photos && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <ImageRender imageData={data} />
              </motion.div>
            )}

            {error && !loading && (
              <div className="text-center mt-10">
                <div className="inline-block bg-red-500/10 border border-red-500/20 backdrop-blur-sm rounded-2xl p-6">
                  <p className="text-red-400 mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 text-white font-medium transition-all duration-300"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            {!loading && data && data.photos && data.photos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center items-center gap-3 mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className={`group relative px-5 py-2.5 rounded-full font-medium text-sm shadow-lg transition-all duration-300 ${
                    page === 1
                      ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10'
                      : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </span>
                </motion.button>

                <div className="px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-white">
                    Page {page}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextPage}
                  className="group relative px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium text-sm shadow-lg hover:bg-white/15 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}