"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function PhotoGallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openIndex, photos.length]);

  return (
    <div className="gallery">
      <button
        type="button"
        className="gallery-hero"
        onClick={() => setOpenIndex(0)}
        aria-label={`View ${alt} photo 1 of ${photos.length}`}
      >
        <Image src={photos[0]} alt={alt} fill sizes="(max-width: 60rem) 100vw, 74rem" priority />
      </button>

      {photos.length > 1 && (
        <div className="gallery-grid">
          {photos.slice(1).map((src, i) => (
            <button
              type="button"
              key={src}
              className="gallery-thumb"
              onClick={() => setOpenIndex(i + 1)}
              aria-label={`View ${alt} photo ${i + 2} of ${photos.length}`}
            >
              <Image src={src} alt={alt} fill sizes="(max-width: 46rem) 33vw, 15vw" />
            </button>
          ))}
        </div>
      )}

      {openIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true">
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
          >
            ×
          </button>
          <button
            type="button"
            className="lightbox-prev"
            onClick={() => setOpenIndex((openIndex - 1 + photos.length) % photos.length)}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <div className="lightbox-image">
            <Image
              src={photos[openIndex]}
              alt={alt}
              fill
              sizes="100vw"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <button
            type="button"
            className="lightbox-next"
            onClick={() => setOpenIndex((openIndex + 1) % photos.length)}
            aria-label="Next photo"
          >
            ›
          </button>
          <div className="lightbox-count">
            {openIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
}
