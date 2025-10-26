import { motion, AnimatePresence } from "motion/react";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useParams } from "react-router";
import { ReactLenis } from "lenis/react";

export default function Sample2() {
  const { isloggedin, nextPageUrl, setnextPageUrl, inputvalue, Pagetype } = useContext(UserContext);
  const { encodedImage, description } = useParams();

  const [imagedata, setimagedata] = useState([]);
  const [videodata, setvideodata] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setloader] = useState(false);
  const [counter, setcounter] = useState(1);
  const [pageno, setpageno] = useState(1);
  const [query, setquery] = useState("trending");
  const [activetab, setactivetab] = useState("Home");
  const [enlargedImage, setEnlargedImage] = useState(null);

  const decodedImageUrl = encodedImage ? decodeURIComponent(encodedImage) : nextPageUrl;

  console.log("Encoded:", encodedImage);
  console.log("Decoded:", decodedImageUrl);
  console.log("Description:", description);

  useEffect(() => setquery(inputvalue), [inputvalue]);

  useEffect(() => {
    setloader(true);
    fetch(`https://api.pexels.com/v1/search/?page=${pageno}&query=${query}&per_page=10`, {
      headers: { Authorization: "VAet3ekIF1hWUIyVcVtDuLMguI7LB4gAlvFjpcfbhlipPP3mRyxD6eFc" }
    })
      .then(res => res.json())
      .then(data => {
        setimagedata(data.photos || []);
        setvideodata(data.videos || []);
        setError(null);
        setloader(false);
      })
      .catch(err => {
        console.error("fetch error:", err);
        setError("Failed to load content");
        setloader(false);
      });
  }, [query, counter]);

  const downloadImage = async () => {
    const urlToDownload = decodedImageUrl;
    
    try {
      const response = await fetch(urlToDownload);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pexels-image.jpg";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      setError("Failed to download image");
    }
  };

  const next = () => {
    setcounter(prev => prev + 1);
    setpageno(counter + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prev = () => {
    if (counter > 1) {
      setcounter(prev => prev - 1);
      setpageno(counter - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const imagesize = (index) => {
    setnextPageUrl(imagedata[index]?.src?.original);
    setEnlargedImage(imagedata[index]?.src?.original);
  };

  const rendering = (url) => {
    return Pagetype === "photo" ? (
      <img className="w-full h-full object-cover rounded-2xl" src={url} alt="Preview" />
    ) : (
      <video className="w-full h-full object-cover rounded-2xl" autoPlay muted loop src={url} />
    );
  };

  return (
    <>
      <ReactLenis root />
      <div className={`min-h-screen relative overflow-hidden text-white transition-all ${isloggedin ? "hidden" : "block"}`}>
        
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
          </div>
          
          {/* Nebula clouds */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[130px] animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Galaxy spiral gradient */}
          <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-blue-950/40"></div>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-3 py-6 md:px-8 md:py-12">
          
          {/* Hero Section with Main Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-1 shadow-2xl border border-white/10">
              <div className="bg-black/40 rounded-2xl md:rounded-3xl p-4 md:p-10">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent truncate">
                      {description ? decodeURIComponent(description) : "Featured Content"}
                    </h1>
                    <p className="text-slate-400 mt-1 md:mt-2 text-xs md:text-base">High quality visuals from Pexels</p>
                  </div>
                  
                  {/* Compact Download Button */}
                  <motion.button
                    onClick={downloadImage}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-medium text-xs md:text-sm shadow-lg hover:bg-white/15 transition-all whitespace-nowrap"
                  >
                    <span className="relative flex items-center gap-2">
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </span>
                  </motion.button>
                </div>

                {/* Main Image Display */}
                <div 
                  className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[21/9] w-full bg-black/50 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer"
                  onClick={() => decodedImageUrl && setEnlargedImage(decodedImageUrl)}
                >{console.log(decodedImageUrl)}
                  {decodedImageUrl ? (
                    rendering(decodedImageUrl)
                    
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-slate-400">No image available</p>
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  {decodedImageUrl && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                      
                      {/* Click to enlarge hint */}
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">
                        <p className="text-xs text-white flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                          Enlarge
                        </p>
                      </div>
                      
                      {/* Author Info Overlay */}
                      <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 flex items-center gap-2 md:gap-3 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 md:px-4 md:py-2 border border-white/20">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-xs md:text-sm">
                          S
                        </div>
                        <div>
                          <p className="font-semibold text-xs md:text-sm">Senorita</p>
                          <p className="text-[10px] md:text-xs text-slate-400">Photographer</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gallery Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-2xl font-bold text-white">Explore Gallery</h2>
              
              {/* Compact Pagination */}
              <div className="flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-2 md:px-3 py-1 md:py-1.5 shadow-lg">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prev}
                  disabled={counter === 1}
                  className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-all ${
                    counter === 1 
                      ? 'text-white/30 cursor-not-allowed' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <div className="px-2 md:px-3 text-xs md:text-sm font-medium text-white/90">
                  {pageno}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={next}
                  className="w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all"
                >
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
              {imagedata.map((photo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => imagesize(idx)}
                  className="group relative aspect-[3/4] cursor-pointer rounded-xl md:rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-lg"
                >
                  <img
                    src={photo.src?.portrait}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4">
                      <p className="text-xs md:text-sm font-medium text-white truncate">{photo.photographer}</p>
                      <p className="text-[10px] md:text-xs text-slate-300">Click to preview</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/10 border border-red-500/20 backdrop-blur-sm rounded-2xl p-4 mb-8"
            >
              <p className="text-red-400 text-center font-medium text-sm">{error}</p>
            </motion.div>
          )}

          {/* Loader */}
          {loader && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center gap-4 py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-6 h-6 md:w-8 md:h-8 border-4 border-purple-500/30 border-t-purple-400 rounded-full"
              ></motion.div>
              <p className="text-xs md:text-sm font-medium text-slate-300">Loading content...</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Enlarged Image Modal */}
      <AnimatePresence>
        {enlargedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setEnlargedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setEnlargedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <img
                src={enlargedImage}
                alt="Enlarged view"
                className="max-w-xl max-h-2xl object-contain rounded-2xl shadow-2xl border border-white/20"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}