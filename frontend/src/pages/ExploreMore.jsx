import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const artworks = [
  {
    id: 1,
    name: "Sunset Bliss",
    shortDesc: "A vibrant sunset captured on canvas.",
    fullDesc:
      "Sunset Bliss is a beautiful expression of nature's end-of-day colors, blending warm reds and oranges with cool purples.",
    price: "$350",
    artist: "Alice Monroe",
    image:
      "https://images.unsplash.com/photo-1549277513-f1b32fe1f8f5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Mountain Majesty",
    shortDesc: "The grandeur of towering peaks.",
    fullDesc:
      "Mountain Majesty captures the rugged beauty and serene calmness of mountain landscapes, evoking a sense of awe.",
    price: "$500",
    artist: "James Carter",
    image:
      "https://images.unsplash.com/photo-1549289524-06cf8837ace5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Ocean Whispers",
    shortDesc: "Gentle waves and endless horizons.",
    fullDesc:
      "Ocean Whispers is an ode to the calm and mystery of the sea, painted with delicate blues and whites.",
    price: "$420",
    artist: "Sophia Lee",
    image:
      "https://images.unsplash.com/photo-1689016466283-2e99396646f9?q=80&w=800&auto=format&fit=crop",
  },
  // Add more artworks as needed
];

const Navbar = () => (
  <nav className="flex items-center justify-between px-6 py-4 bg-black bg-opacity-80 text-white shadow-md fixed w-full top-0 z-50">
    <div className="text-3xl font-bold tracking-wide">🎨 Artistry</div>
    <div className="space-x-4">
      <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">
        Login
      </button>
      <button className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
        Sign Up
      </button>
    </div>
  </nav>
);

const ExploreMore = () => {
  const [selectedArt, setSelectedArt] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (selectedArt) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [selectedArt]);

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power3.in",
      onComplete: () => setSelectedArt(null),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-12 px-6">
      <Navbar />

      <h1 className="text-4xl font-bold text-center mb-12">Explore More Artworks</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {artworks.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-lg shadow-lg cursor-pointer overflow-hidden hover:shadow-2xl transition transform hover:scale-105"
            onClick={() => setSelectedArt(art)}
          >
            <img
              src={art.image}
              alt={art.name}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{art.name}</h3>
              <p className="text-gray-600 mt-1">{art.shortDesc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Expanded Card */}
      {selectedArt && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()} // prevent modal close when clicking inside
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-700 hover:text-black text-3xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={selectedArt.image}
              alt={selectedArt.name}
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-2">{selectedArt.name}</h2>
              <p className="text-gray-700 mb-4">{selectedArt.fullDesc}</p>
              <p className="text-lg font-semibold mb-2">
                Price: <span className="text-indigo-600">{selectedArt.price}</span>
              </p>
              <p className="text-gray-800">Artist: <span className="font-medium">{selectedArt.artist}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreMore;
