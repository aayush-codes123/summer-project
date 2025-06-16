const Artwork = require('../models/Artwork');

const createArtwork = async (req, res) => {
  try {
    const { title, description, price, label, status } = req.body;

    if (!req.file) return res.status(400).json({ message: 'Image file is required' });

    const artwork = new Artwork({
      title,
      description,
      price,
      label,
      status,
      imageUrl: `/uploads/${req.file.filename}`,
      seller: req.user._id,
    });

    const saved = await artwork.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find({ seller: req.user._id });
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findOneAndDelete({
      _id: req.params.id,
      seller: req.user._id,
    });
    if (!artwork) return res.status(404).json({ message: 'Artwork not found or not authorized' });
    res.json({ message: 'Artwork deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateArtwork = async (req, res) => {
  try {
    const updated = await Artwork.findOneAndUpdate(
      { _id: req.params.id, seller: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Artwork not found or not authorized' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllArtworksPublic = async (req, res) => {
  try {
    const artworks = await Artwork.find({}); // Optionally filter e.g., { status: "public" }
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching artworks' });
  }
};

module.exports = { createArtwork, getMyArtworks, deleteArtwork, updateArtwork, getAllArtworksPublic };
