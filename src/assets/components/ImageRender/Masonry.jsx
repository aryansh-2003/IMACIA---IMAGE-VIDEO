"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router";

// ✅ SSR-safe matchMedia hook
const useMedia = (queries, values, defaultValue) => {
  const get = () => {
    if (typeof window === "undefined") return defaultValue;
    const idx = queries.findIndex((q) => window.matchMedia(q).matches);
    return values[idx] ?? defaultValue;
  };
  const [value, setValue] = useState(get);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => setValue(get);
    const mqls = queries.map((q) => window.matchMedia(q));
    mqls.forEach((mql) => mql.addEventListener("change", handler));
    return () => mqls.forEach((mql) => mql.removeEventListener("change", handler));
  }, [queries]);
  return value;
};

// ✅ Hook for measuring container size
const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize(entry.contentRect);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
};

// ✅ Preload all images efficiently
const preloadImages = async (urls = []) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = resolve;
        })
    )
  );
};

export default function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.96,
  blurToFocus = true,
  colorShiftOnHover = true,
  gap = 14,
}) {
  const navigate = useNavigate();
  const columns = useMedia(
    ["(min-width:1500px)", "(min-width:1100px)", "(min-width:700px)", "(min-width:400px)"],
    [5, 4, 3, 2],
    1
  );
  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const ctx = useRef();

  // ✅ Layout calculation (responsive)
  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const totalGaps = (columns - 1) * gap;
    const colWidth = (width - totalGaps) / columns;

    return items.map((img) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (colWidth + gap);
      const ratio = img.width / img.height;
      const h = colWidth / ratio;
      const y = colHeights[col];
      colHeights[col] += h + gap;
      return { ...img, x, y, w: colWidth, h };
    });
  }, [columns, items, width, gap]);

  // ✅ Preload images
  useEffect(() => {
    preloadImages(items.map((i) => i.src?.portrait)).then(() => setImagesReady(true));
  }, [items]);

  // ✅ Animate layout
  useLayoutEffect(() => {
    if (!imagesReady || !containerRef.current) return;

    ctx.current = gsap.context(() => {
      grid.forEach((item, i) => {
        const target = `[data-key="${item.id}"]`;
        const fromVars = {
          opacity: 0,
          filter: blurToFocus ? "blur(8px)" : "none",
        };
        const toVars = {
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          opacity: 1,
          filter: "blur(0px)",
          duration,
          ease,
          delay: i * stagger,
        };
        gsap.fromTo(target, fromVars, toVars);
      });
    }, containerRef);

    return () => ctx.current?.revert();
  }, [grid, imagesReady, blurToFocus, duration, ease, stagger]);

  // ✅ Hover handlers
  const handleEnter = (id) => {
    if (scaleOnHover)
      gsap.to(`[data-key="${id}"]`, { scale: hoverScale, duration: 0.3 });
    if (colorShiftOnHover)
      gsap.to(`[data-overlay="${id}"]`, { opacity: 1, duration: 0.3 });
    // Show text overlay
    gsap.to(`[data-text="${id}"]`, { opacity: 1, y: 0, duration: 0.3 });
  };
  
  const handleLeave = (id) => {
    if (scaleOnHover)
      gsap.to(`[data-key="${id}"]`, { scale: 1, duration: 0.3 });
    if (colorShiftOnHover)
      gsap.to(`[data-overlay="${id}"]`, { opacity: 0, duration: 0.3 });
    // Hide text overlay
    gsap.to(`[data-text="${id}"]`, { opacity: 0, y: 10, duration: 0.3 });
  };

  // ✅ Compute dynamic container height
  const containerHeight = useMemo(
    () => Math.max(...grid.map((i) => i.y + i.h), 0),
    [grid]
  );

  // Navigate to sample2 page
  const handleClick = (img) => {
    const encodedUrl = encodeURIComponent(img.src?.portrait || "");
    const encodedQuery = encodeURIComponent(img.alt || img.photographer || "image");
    navigate(`sample2/${encodedUrl}/${encodedQuery}`);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-visible"
      style={{ height: containerHeight }}
    >
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute rounded-2xl overflow-hidden shadow-lg cursor-pointer will-change-transform border border-white/10"
          onClick={() => handleClick(item)}
          onMouseEnter={() => handleEnter(item.id)}
          onMouseLeave={() => handleLeave(item.id)}
        >
          <div
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${item.src.portrait})` }}
          >
            {/* Gradient overlay on hover */}
            {colorShiftOnHover && (
              <div
                data-overlay={item.id}
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-all"
              />
            )}
            
            {/* Text overlay with photographer info */}
            <div
              data-text={item.id}
              className="absolute bottom-0 left-0 right-0 p-4 opacity-0 translate-y-2"
              style={{ transform: "translateY(10px)" }}
            >
              <p className="text-sm font-semibold text-white truncate">
                {item.photographer || "Unknown"}
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                Click to view
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}