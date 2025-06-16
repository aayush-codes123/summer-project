import React, { useState } from "react";
import UploadArtwork from "./UploadArtwork";
import MyArtworks from "./MyArtworks";

const SellerDashboard = () => {
  const [activePage, setActivePage] = useState("upload");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-white"
      style={{ backgroundImage: `url('/images/background2.jpg')` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-pink-600 to-indigo-700 opacity-90 -z-10"></div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-black/60 backdrop-blur-md shadow-lg relative z-10">
        <h1 className="text-2xl font-bold">🎨 ArtVerse - Seller Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setActivePage("upload")}
            className={`px-4 py-2 rounded-lg transition ${
              activePage === "upload"
                ? "bg-purple-600"
                : "bg-white/20 hover:bg-white/40"
            }`}
          >
            Upload Artwork
          </button>
          <button
            onClick={() => setActivePage("myartworks")}
            className={`px-4 py-2 rounded-lg transition ${
              activePage === "myartworks"
                ? "bg-purple-600"
                : "bg-white/20 hover:bg-white/40"
            }`}
          >
            My Artworks
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="p-6 relative z-10">
        {activePage === "upload" ? <UploadArtwork /> : <MyArtworks />}
      </main>
    </div>
  );
};

export default SellerDashboard;
