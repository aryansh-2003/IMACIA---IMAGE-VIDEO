"use client";

import { useNavigate } from "react-router";

export default function Masonry({ items }) {
  const navigate = useNavigate();

  const handleClick = (img) => {
    const encodedUrl = encodeURIComponent(img.src?.portrait || "");
    const encodedQuery = encodeURIComponent(img.alt || img.photographer || "image");
    navigate(`sample2/${encodedUrl}/${encodedQuery}`);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 space-y-4 px-2 w-full mx-auto">
      {items.map((item, i) => (
        <div
          key={`${item.id}-${i}`}
          onClick={() => handleClick(item)}
          className="break-inside-avoid relative rounded-[20px] overflow-hidden cursor-pointer group mb-4 bg-gray-100 will-change-transform"
        >
          <img
            src={item.src.portrait}
            alt={item.alt || item.photographer || "Wallpaper"}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          
          {/* Action buttons (simulated Pinterest look) */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
             <button className="bg-red-600 text-white px-4 py-3 rounded-full font-bold text-sm hover:bg-red-700 transition">
               Save
             </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-between items-end z-10">
             <div className="bg-white/95 backdrop-blur text-black text-xs font-bold px-3 py-2 rounded-full truncate max-w-[70%] shadow-sm flex items-center gap-1 hover:bg-gray-100 transition">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                <span className="truncate">{item.photographer || "Creator"}</span>
             </div>
             <button className="bg-white/95 backdrop-blur p-2 rounded-full text-black hover:bg-gray-100 shadow-sm transition">
               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
             </button>
          </div>
        </div>
      ))}
    </div>
  );
}