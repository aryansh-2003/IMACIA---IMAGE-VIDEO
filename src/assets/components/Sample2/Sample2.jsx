import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useParams, useNavigate } from "react-router";
import { ReactLenis } from "lenis/react";

export default function Sample2() {
  const { nextPageUrl, setnextPageUrl, inputvalue } = useContext(UserContext);
  const { encodedImage, description } = useParams();
  const navigate = useNavigate();

  const [imagedata, setimagedata] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setloader] = useState(false);
  const [counter, setcounter] = useState(1);
  const [pageno, setpageno] = useState(1);
  const [query, setquery] = useState("aesthetic wallpapers");

  const [mainImageUrl, setMainImageUrl] = useState(() => {
    return encodedImage ? decodeURIComponent(encodedImage) : nextPageUrl;
  });

  const decodedDescription = description ? decodeURIComponent(description) : "Creator";

  useEffect(() => {
    if (inputvalue) {
      setquery(inputvalue);
    }
  }, [inputvalue]);

  useEffect(() => {
    setloader(true);
    fetch(
      `https://api.pexels.com/v1/search/?page=${pageno}&query=${query}&per_page=20`,
      {
        headers: {
          Authorization: "VAet3ekIF1hWUIyVcVtDuLMguI7LB4gAlvFjpcfbhlipPP3mRyxD6eFc"
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // if appending, we can append, but for simplicity we just set
        setimagedata(prev => pageno === 1 ? (data.photos || []) : [...prev, ...(data.photos || [])]);
        setError(null);
        setloader(false);
      })
      .catch((err) => {
        console.error("fetch error:", err);
        setError("Failed to load content");
        setloader(false);
      });
  }, [query, pageno]);

  useEffect(() => {
    const url = encodedImage ? decodeURIComponent(encodedImage) : nextPageUrl;
    setMainImageUrl(url);
  }, [encodedImage, nextPageUrl]);

  const [downloading, setDownloading] = useState(false);

  const downloadImage = async () => {
    const urlToDownload = mainImageUrl;
    if (!urlToDownload) return;
    setDownloading(true);
    try {
      const response = await fetch(urlToDownload);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `imacia-wallpaper-${Date.now()}.jpg`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      // Fallback: open image in new tab if CORS prevents blob download
      window.open(urlToDownload, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  const imagesize = (index) => {
    const selectedImageUrl = imagedata[index]?.src?.portrait;
    if (!selectedImageUrl) return;

    setnextPageUrl(selectedImageUrl);
    const encodedUrl = encodeURIComponent(selectedImageUrl);
    const encodedDesc = encodeURIComponent(imagedata[index]?.photographer || "");
    window.history.pushState({}, "", `/sample2/${encodedUrl}/${encodedDesc}`);
    setMainImageUrl(selectedImageUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <ReactLenis root />
      <div className="min-h-screen bg-white text-black pt-28 pb-12 font-sans transition-colors duration-500">
        
        {/* Back Button */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-12 h-12 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>

        {/* Main Pin Card */}
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 mb-16">
          <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col md:flex-row border border-gray-100">
            
            {/* Image Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center relative bg-gray-50 p-0 md:p-0">
               {mainImageUrl ? (
                 <img src={mainImageUrl} alt="Pin" className="w-full h-auto max-h-[80vh] object-cover" />
               ) : (
                 <div className="h-[500px] flex items-center justify-center text-gray-400">Loading Image...</div>
               )}
            </div>

            {/* Details Side */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
              
              <div>
                {/* Top Actions */}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-2">
                    <button className="p-3 hover:bg-gray-100 rounded-full transition">
                      <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                    </button>
                    <button className="p-3 hover:bg-gray-100 rounded-full transition">
                      <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
                    </button>
                    <button className="p-3 hover:bg-gray-100 rounded-full transition">
                      <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Pinterest Download Button implementation */}
                    <button 
                      onClick={downloadImage}
                      disabled={downloading}
                      className="px-5 py-3.5 bg-gray-200 text-gray-900 rounded-full font-semibold hover:bg-gray-300 transition flex items-center gap-2"
                    >
                      {downloading ? (
                        <span className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      )}
                      <span className="text-sm">Download</span>
                    </button>
                    <button className="px-6 py-3.5 bg-red-600 text-white rounded-full font-bold text-sm hover:bg-red-700 transition shadow-sm">
                      Save
                    </button>
                  </div>
                </div>

                {/* Title & Creator */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-8 line-clamp-3">
                    {decodedDescription || "Beautiful Wallpaper"}
                  </h1>
                  
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 text-2xl uppercase">
                        {decodedDescription.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{decodedDescription}</h3>
                        <p className="text-sm text-gray-500">20.4k followers</p>
                      </div>
                    </div>
                    <button className="px-5 py-3 bg-gray-200 rounded-full font-semibold text-gray-900 hover:bg-gray-300 transition text-sm">
                      Follow
                    </button>
                  </div>

                  <div className="border-t border-gray-100 pt-8 mt-4">
                    <div className="flex items-center justify-between mb-4">
                       <h3 className="font-bold text-xl text-gray-900">Comments</h3>
                       <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                    </div>
                    <p className="text-gray-500 text-base">No comments yet. Add one to start the conversation.</p>
                  </div>
                </div>
              </div>
              
              {/* Comment Input */}
              <div className="mt-12 flex gap-3 items-center border-t border-gray-100 pt-6">
                 <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 flex-shrink-0">
                    U
                 </div>
                 <input type="text" placeholder="Add a comment" className="flex-1 bg-gray-100 rounded-full px-5 py-3.5 outline-none focus:ring-2 focus:ring-gray-300 transition" />
              </div>

            </div>
          </div>
        </div>

        {/* More to explore */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">More like this</h2>
          
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 space-y-4 w-full">
            {imagedata.map((photo, idx) => (
              <div
                key={`${photo.id}-${idx}`}
                onClick={() => imagesize(idx)}
                className="break-inside-avoid relative rounded-[20px] overflow-hidden cursor-pointer group mb-4 bg-gray-100"
              >
                <img
                  src={photo.src?.portrait}
                  alt={photo.photographer}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                {/* Hover actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                   <button className="bg-red-600 text-white px-4 py-3 rounded-full font-bold text-sm hover:bg-red-700 transition">Save</button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-between items-end z-10">
                   <div className="bg-white/95 backdrop-blur text-black text-xs font-bold px-3 py-2 rounded-full truncate max-w-[70%] flex items-center gap-1 hover:bg-gray-100 transition">
                      <span className="truncate">{photo.photographer}</span>
                   </div>
                   <button className="bg-white/95 backdrop-blur p-2 rounded-full text-black hover:bg-gray-100 transition shadow-sm">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                   </button>
                </div>
              </div>
            ))}
          </div>

          {loader && (
            <div className="flex justify-center mt-10">
              <div className="w-8 h-8 border-[3px] border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
            </div>
          )}

          <div className="flex justify-center mt-12 mb-10">
            <button 
              onClick={() => { setpageno(p => p+1); }}
              className="px-8 py-4 bg-gray-200 text-gray-900 rounded-full font-bold hover:bg-gray-300 transition"
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
