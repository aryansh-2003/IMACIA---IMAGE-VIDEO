import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
import { ReactLenis } from "lenis/react";
import UserContext from "../context/UserContext";
import ImageRender from "../ImageRender/ImageRender";

export default function Sample1() {
  const { inputvalue } = useContext(UserContext);
  
  // Randomize initial query to match Pinterest vibes requested by the user
  const initialQueries = ["anime aesthetic wallpaper", "dark luxury cars", "coding setup aesthetic", "cute cats", "cyberpunk aesthetic", "pinterest aesthetic wallpaper"];
  const [query, setQuery] = useState(() => initialQueries[Math.floor(Math.random() * initialQueries.length)]);
  
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Intersection Observer ref for infinite scroll
  const observer = useRef();
  const lastElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    }, { rootMargin: '400px' });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Reset when query changes
  useEffect(() => {
    if (inputvalue) {
      setQuery(inputvalue);
      setPage(1);
      setPhotos([]);
      setHasMore(true);
    }
  }, [inputvalue]);

  // Fetch data
  useEffect(() => {
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
        if (data.photos && data.photos.length > 0) {
          setPhotos(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newPhotos = data.photos.filter(p => !existingIds.has(p.id));
            return [...prev, ...newPhotos];
          });
          setHasMore(data.next_page != null);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Network error. Please try again.");
        setLoading(false);
      });
  }, [query, page]);

  return (
    <>
      <ReactLenis root />
      <section className="relative w-full min-h-screen bg-white text-black pt-24 pb-10 transition-colors duration-500">
        <div className="relative z-10 px-4 md:px-8 max-w-[2000px] mx-auto w-full">
          
          {/* Content Area */}
          <div className="w-full">
            {/* Initial Loading Skeletons */}
            {photos.length === 0 && loading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-pulse">
                {[...Array(18)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 rounded-[20px] w-full"
                    style={{ height: `${Math.floor(Math.random() * 200) + 200}px` }}
                  />
                ))}
              </div>
            )}

            {/* Masonry Grid */}
            {photos.length > 0 && (
              <div className="animate-in fade-in duration-700">
                <ImageRender photos={photos} />
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center mt-10">
                <div className="inline-block bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm">
                  <p className="text-red-500 mb-4 font-semibold">{error}</p>
                  <button
                    onClick={() => {
                      setError(null);
                      setPage(prev => prev); // retrigger fetch
                    }}
                    className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-300"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Infinite Scroll Sentinel / Loading Indicator */}
            <div ref={lastElementRef} className="py-10 flex justify-center w-full mt-4">
              {loading && photos.length > 0 && (
                <div className="flex gap-3 items-center text-gray-600 font-medium">
                  <div className="w-6 h-6 rounded-full border-[3px] border-gray-300 border-t-red-600 animate-spin" />
                  Loading more pins...
                </div>
              )}
              {!loading && !hasMore && photos.length > 0 && (
                <p className="text-gray-500 font-medium tracking-wide">You've reached the end of this feed!</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}