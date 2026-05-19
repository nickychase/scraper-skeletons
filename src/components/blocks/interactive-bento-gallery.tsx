"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Forked from the 21st.dev "interactive-bento-gallery" registry component
// (anurag-mishra22). Adapted for scraper-skeletons: trade-trust palette,
// no built-in section header (the <Gallery /> section wraps it), and
// drag-to-rearrange on grid tiles removed because it intercepts mobile
// vertical scroll. The draggable thumbnail dock inside the lightbox is kept.

export type MediaItem = {
  id: number;
  type: "image" | "video";
  title: string;
  desc: string;
  url: string;
  span: string;
};

function MediaTile({
  item,
  className,
  onClick,
}: {
  item: MediaItem;
  className?: string;
  onClick?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsInView(entry.isIntersecting));
      },
      { root: null, rootMargin: "50px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  useEffect(() => {
    let mounted = true;
    const node = videoRef.current;
    if (!node) return;

    const play = async () => {
      if (!isInView || !mounted) return;
      try {
        if (node.readyState >= 3) {
          setIsBuffering(false);
          await node.play();
        } else {
          setIsBuffering(true);
          await new Promise((resolve) => {
            node.oncanplay = resolve;
          });
          if (mounted) {
            setIsBuffering(false);
            await node.play();
          }
        }
      } catch (err) {
        console.warn("Video playback failed:", err);
      }
    };

    if (isInView) {
      play();
    } else {
      node.pause();
    }

    return () => {
      mounted = false;
      node.pause();
    };
  }, [isInView]);

  if (item.type === "video") {
    return (
      <div className={`${className} relative overflow-hidden`}>
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          onClick={onClick}
          playsInline
          muted
          loop
          preload="auto"
          style={{
            opacity: isBuffering ? 0.8 : 1,
            transition: "opacity 0.2s",
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <source src={item.url} type="video/mp4" />
        </video>
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-plumber-navy/10">
            <div className="size-6 animate-spin rounded-full border-2 border-plumber-cream/30 border-t-plumber-cream" />
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={item.url}
      alt={item.title}
      className={`${className} cursor-pointer object-cover`}
      onClick={onClick}
      loading="lazy"
      decoding="async"
    />
  );
}

function GalleryLightbox({
  selectedItem,
  onClose,
  setSelectedItem,
  mediaItems,
}: {
  selectedItem: MediaItem;
  onClose: () => void;
  setSelectedItem: (item: MediaItem | null) => void;
  mediaItems: MediaItem[];
}) {
  const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

  return (
    <>
      <motion.div
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed inset-0 z-10 min-h-screen w-full overflow-hidden rounded-none bg-plumber-navy/85 backdrop-blur-lg sm:h-[90vh] sm:rounded-lg md:h-[600px] md:rounded-xl"
      >
        <div className="flex h-full flex-col">
          <div className="flex flex-1 items-center justify-center p-2 sm:p-3 md:p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                className="relative aspect-[16/9] h-auto max-h-[70vh] w-full max-w-[95%] overflow-hidden rounded-lg shadow-md sm:max-w-[85%] md:max-w-3xl"
                initial={{ y: 20, scale: 0.97 }}
                animate={{
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 0.5,
                  },
                }}
                exit={{
                  y: 20,
                  scale: 0.97,
                  transition: { duration: 0.15 },
                }}
                onClick={onClose}
              >
                <MediaTile
                  item={selectedItem}
                  className="h-full w-full bg-plumber-navy-deep object-contain"
                  onClick={onClose}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plumber-navy/90 via-plumber-navy/40 to-transparent p-2 sm:p-3 md:p-4">
                  <h3 className="text-base font-semibold text-plumber-cream sm:text-lg md:text-xl">
                    {selectedItem.title}
                  </h3>
                  <p className="mt-1 text-xs text-plumber-cream/80 sm:text-sm">
                    {selectedItem.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          aria-label="Close gallery"
          className="absolute right-2 top-2 rounded-full bg-plumber-cream/90 p-2 text-plumber-navy backdrop-blur-sm hover:bg-plumber-cream sm:right-2.5 sm:top-2.5 md:right-3 md:top-3"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="size-4" />
        </motion.button>
      </motion.div>

      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={false}
        animate={{ x: dockPosition.x, y: dockPosition.y }}
        onDragEnd={(_, info) => {
          setDockPosition((prev) => ({
            x: prev.x + info.offset.x,
            y: prev.y + info.offset.y,
          }));
        }}
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 touch-none"
      >
        <div className="relative cursor-grab rounded-xl border border-plumber-yellow/40 bg-plumber-cream/20 shadow-lg backdrop-blur-xl active:cursor-grabbing">
          <div className="flex items-center -space-x-2 px-3 py-2">
            {mediaItems.map((item, index) => (
              <motion.div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(item);
                }}
                style={{
                  zIndex:
                    selectedItem.id === item.id
                      ? 30
                      : mediaItems.length - index,
                }}
                className={`relative size-8 shrink-0 cursor-pointer overflow-hidden rounded-lg sm:size-9 md:size-10 ${
                  selectedItem.id === item.id
                    ? "shadow-lg ring-2 ring-plumber-yellow"
                    : "hover:ring-2 hover:ring-plumber-cream/50"
                }`}
                initial={{ rotate: index % 2 === 0 ? -15 : 15 }}
                animate={{
                  scale: selectedItem.id === item.id ? 1.2 : 1,
                  rotate:
                    selectedItem.id === item.id
                      ? 0
                      : index % 2 === 0
                        ? -15
                        : 15,
                  y: selectedItem.id === item.id ? -8 : 0,
                }}
                whileHover={{
                  scale: 1.3,
                  rotate: 0,
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
              >
                <MediaTile
                  item={item}
                  className="h-full w-full"
                  onClick={() => setSelectedItem(item)}
                />
                {selectedItem.id === item.id && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute -inset-2 bg-plumber-yellow/30 blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function InteractiveBentoGallery({
  mediaItems,
}: {
  mediaItems: MediaItem[];
}) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  return (
    <AnimatePresence mode="wait">
      {selectedItem ? (
        <GalleryLightbox
          selectedItem={selectedItem}
          onClose={() => setSelectedItem(null)}
          setSelectedItem={setSelectedItem}
          mediaItems={mediaItems}
        />
      ) : (
        <motion.div
          className="grid auto-rows-[80px] grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          {mediaItems.map((item, index) => (
            <motion.div
              key={item.id}
              layoutId={`media-${item.id}`}
              className={`group relative cursor-pointer overflow-hidden rounded-xl ${item.span}`}
              onClick={() => setSelectedItem(item)}
              variants={{
                hidden: { y: 40, scale: 0.95, opacity: 0 },
                visible: {
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 350,
                    damping: 25,
                    delay: index * 0.05,
                  },
                },
              }}
              whileHover={{ scale: 1.02 }}
            >
              <MediaTile
                item={item}
                className="absolute inset-0 h-full w-full"
                onClick={() => setSelectedItem(item)}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:p-4">
                <div className="absolute inset-0 bg-gradient-to-t from-plumber-navy/85 via-plumber-navy/30 to-transparent" />
                <h3 className="relative line-clamp-1 text-sm font-semibold text-plumber-cream sm:text-base">
                  {item.title}
                </h3>
                <p className="relative mt-0.5 line-clamp-2 text-xs text-plumber-cream/80 sm:text-sm">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
