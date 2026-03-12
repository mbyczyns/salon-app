"use client";

import Image from "next/image";
import { useState } from "react";

// Definicja dostępnych kategorii
type Category = "WSZYSTKIE" | "FRYZURY" | "SALON";

// Zmodyfikowana struktura zdjęć, zawierająca ich kategorię
const galleryData = [
  { src: "/portret.jpg", category: "FRYZURY" },
  { src: "/portret.jpg", category: "SALON" }, // tymczasowe zdjęcie
  { src: "/portret.jpg", category: "FRYZURY" },
  { src: "/hair-salon-bg.png", category: "SALON" }, // tymczasowe zdjęcie
  { src: "/portret.jpg", category: "FRYZURY" },
  { src: "/portret.jpg", category: "FRYZURY" },
];

export default function GallerySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("WSZYSTKIE");

  // Filtrowanie zdjęć na podstawie wybranej kategorii
  const filteredImages = galleryData.filter(
    (img) => activeCategory === "WSZYSTKIE" || img.category === activeCategory
  );

  // Główna strona zawsze pokazuje po prostu kilka pierwszych zdjęć
  const visibleImagesCount = 3;
  const visibleImages = galleryData.slice(0, visibleImagesCount);

  // Kategorie do wyświetlenia w menu filtrów
  const categories: Category[] = ["WSZYSTKIE", "FRYZURY", "SALON"];

  return (
    <>
      {/* GALLERY SECTION */}
      <div className="mt-12 w-full max-w-5xl mx-auto rounded-xl bg-white shadow-xl outline outline-black/5 z-10 pt-8 px-8 pb-2 md:pt-12 md:px-12 md:pb-4">
        <div className="mb-5">
          <h2 className="text-4xl font-bold tracking-wider text-pink-400 mb-2 font-[family-name:var(--font-oswald-bold)]">
            Nasze Prace
          </h2>
          <p className="text-slate-600 font-[family-name:var(--font-oswald-light)] text-xl tracking-wide">
            Zobacz metamorfozy naszych klientek oraz wnętrze
          </p>
        </div>

        {/* VISIBLE IMAGES GRID */}
        {visibleImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {visibleImages.map((img, index) => (
              <div
                key={`${img.src}-${index}`}
                className="relative aspect-square overflow-hidden rounded-lg shadow-sm group cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <Image
                  src={img.category === "SALON" && img.src === "/portret.jpg" ? "/hair-salon-bg.png" : img.src} // Tymczasowe podmienienie ścieżek
                  alt={`${img.category} zdjęcie ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-slate-400 font-[family-name:var(--font-oswald-light)]">
            Brak zdjęć w tej kategorii.
          </div>
        )}

        {/* BUTTON TO OPEN MODAL */}
        <div className="my-4 md:my-4 flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full border-2 border-pink-400 px-8 py-3 text-pink-500 font-[family-name:var(--font-oswald-bold)] tracking-widest uppercase hover:bg-pink-400 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Zobacz pełną galerię
          </button>
        </div>
      </div>

      {/* MODAL POPUP */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setIsModalOpen(false)} // Close when clicking backdrop
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white z-10 sticky top-0">
              <div>
                <h3 className="text-3xl font-[family-name:var(--font-oswald-bold)] text-pink-400 tracking-wide mb-3 md:mb-0">
                  Pełna Galeria
                </h3>
              </div>

              {/* FILTRY W MODALU */}
              <div className="flex flex-wrap gap-2 md:ms-auto md:mr-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-1.5 rounded-full font-[family-name:var(--font-oswald-bold)] tracking-widest uppercase text-xs border-2 transition-all duration-300 ${activeCategory === category
                      ? "bg-pink-400 text-white border-pink-400 shadow-sm"
                      : "bg-transparent text-slate-400 border-slate-200 hover:border-pink-300 hover:text-pink-400"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 self-start md:self-center text-slate-400 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-colors flex items-center justify-center -mt-2 -mr-2 md:m-0"
                aria-label="Zamknij galerię"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content - Scrollable Grid */}
            <div className="p-6 md:p-8 overflow-y-auto bg-slate-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredImages.map((img, index) => (
                  <div
                    key={`modal-img-${index}`}
                    className="relative aspect-square overflow-hidden rounded-lg shadow-sm"
                  >
                    <Image
                      src={img.category === "SALON" && img.src === "/portret.jpg" ? "/hair-salon-bg.png" : img.src} // Tymczasowe podmienienie
                      alt={`Galeria zdjęcie ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    {/* Optional label for the category in the modal */}
                    {activeCategory === "WSZYSTKIE" && (
                      <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-md text-xs font-[family-name:var(--font-oswald-bold)] tracking-wider">
                        {img.category}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
