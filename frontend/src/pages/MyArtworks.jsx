import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import background2 from "../images/background2.jpg";

const MyArtworks = () => {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Get token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/seller/artworks", {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("Fetched artworks:", data);
      if (res.ok) setArtworks(data);
      else if (res.status === 401) navigate("/signin");
    } catch (err) {
      console.error("Failed to fetch artworks", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this artwork?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/seller/artworks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setArtworks(artworks.filter((art) => art._id !== id));
      } else if (res.status === 401) {
        navigate("/signin");
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const handleEditToggle = (art) => {
    setEditMode(art._id);
    setEditForm(art);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/seller/artworks/${editForm._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        fetchArtworks();
        setEditMode(null);
      } else if (res.status === 401) {
        navigate("/signin");
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error("Edit error", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-start px-4"
      style={{
        backgroundImage: `url(${background2})`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>

      {/* Logout Button */}
      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={handleLogout}
          className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-red-500/60 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/30 shadow-2xl max-w-5xl w-full mx-auto mt-28 mb-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          My Artworks
        </h2>

        {artworks.length === 0 ? (
          <p className="text-white text-center">No artworks uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {artworks.map((art) => (
              <motion.div
                key={art._id}
                className="bg-white/10 rounded-xl p-4 border border-white/20 shadow-lg backdrop-blur-md"
                whileHover={{ scale: 1.02 }}
              >
                {editMode === art._id ? (
                  <form onSubmit={handleEditSubmit} className="space-y-3">
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      className="w-full p-2 rounded bg-white/20 text-white"
                      required
                    />
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      className="w-full p-2 rounded bg-white/20 text-white"
                      required
                    />
                    <input
                      type="number"
                      name="price"
                      value={editForm.price}
                      onChange={handleEditChange}
                      className="w-full p-2 rounded bg-white/20 text-white"
                      required
                    />
                    <input
                      type="text"
                      name="label"
                      value={editForm.label}
                      onChange={handleEditChange}
                      className="w-full p-2 rounded bg-white/20 text-white"
                    />
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                      className="w-full p-2 rounded bg-white/20 text-white"
                    >
                      <option className="bg-gray-800" value="Available">
                        Available
                      </option>
                      <option className="bg-gray-800" value="Sold">
                        Sold
                      </option>
                    </select>
                    <div className="flex justify-between mt-2">
                      <button
                        type="submit"
                        className="bg-green-500/70 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditMode(null)}
                        className="bg-gray-500/60 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <img
                      src={`http://localhost:5000${art.imageUrl}`}
                      alt={art.title}
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                    <h3 className="text-white font-semibold">{art.title}</h3>
                    <p className="text-white/80 text-sm">{art.description}</p>
                    <p className="text-white/70">Rs. {art.price}</p>
                    <p className="text-white/60 text-sm">Status: {art.status}</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleEditToggle(art)}
                        className="bg-blue-500/70 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(art._id)}
                        className="bg-red-500/70 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyArtworks;
