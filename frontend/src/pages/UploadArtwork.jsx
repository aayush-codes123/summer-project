import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import background from "../images/background.jpg";

const UploadArtwork = () => {
  const navigate = useNavigate();
  const [sellerName, setSellerName] = useState("");
  const [artwork, setArtwork] = useState({
    title: "",
    description: "",
    price: "",
    label: "",
    status: "Available",
    image: null,
  });

  // Token for auth
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/seller/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) setSellerName(data.name);
        else if (res.status === 401) navigate("/signin");
      } catch (err) {
        console.error("Failed to fetch seller info", err);
      }
    };

    fetchSellerInfo();
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtwork({ ...artwork, [name]: value });
  };

  const handleImageChange = (e) => {
    setArtwork({ ...artwork, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(artwork).forEach(([key, val]) => formData.append(key, val));

    try {
      const res = await fetch("http://localhost:5000/api/seller/artworks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Artwork uploaded successfully!");
        setArtwork({
          title: "",
          description: "",
          price: "",
          label: "",
          status: "Available",
          image: null,
        });
      } else if (res.status === 401) {
        navigate("/signin");
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed relative px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-700/40 via-pink-600/25 to-indigo-700/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
      />

      {/* Logout Button */}
      <div className="absolute top-5 right-5 z-50">
        <button
          onClick={handleLogout}
          className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-red-500/60 transition"
        >
          Logout
        </button>
      </div>

      <motion.div
        className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/30 shadow-2xl w-full max-w-3xl z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-white text-3xl font-extrabold text-center mb-6">
          Welcome, {sellerName || "Seller"}!
        </h2>

        {/* Upload Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/80">Title</label>
              <input
                type="text"
                name="title"
                required
                value={artwork.title}
                onChange={handleChange}
                className="w-full p-3 mt-1 rounded-lg bg-white/20 text-white outline-none"
              />
            </div>
            <div>
              <label className="text-white/80">Label</label>
              <input
                type="text"
                name="label"
                required
                value={artwork.label}
                onChange={handleChange}
                className="w-full p-3 mt-1 rounded-lg bg-white/20 text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-white/80">Description</label>
            <textarea
              name="description"
              required
              rows={3}
              value={artwork.description}
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded-lg bg-white/20 text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/80">Price (NPR)</label>
              <input
                type="number"
                name="price"
                required
                value={artwork.price}
                onChange={handleChange}
                className="w-full p-3 mt-1 rounded-lg bg-white/20 text-white outline-none"
              />
            </div>
            <div>
              <label className="text-white/80">Status</label>
              <select
                name="status"
                value={artwork.status}
                onChange={handleChange}
                className="w-full p-3 mt-1 rounded-lg bg-white/20 text-white outline-none"
              >
                <option className="bg-gray-700" value="Available">
                  Available
                </option>
                <option className="bg-gray-700" value="Sold">
                  Sold
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-white/80">Artwork Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 mt-1 bg-white/20 text-white rounded-lg outline-none file:cursor-pointer"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-white/20 text-white py-3 rounded-lg hover:bg-purple-600/40 transition shadow-md mt-2"
          >
            Upload Artwork
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UploadArtwork;
