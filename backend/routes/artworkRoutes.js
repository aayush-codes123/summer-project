const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/multer');
const auth = require('../middleware/authMiddleware');
const artworkController = require('../controllers/artworkController');
const {
  createArtwork,
  getMyArtworks,
  deleteArtwork,
  updateArtwork,
} = require('../controllers/artworkController');

// POST new artwork
router.post('/', auth, upload.single('image'), createArtwork);

// GET all artworks by seller
router.get('/', auth, getMyArtworks);

// DELETE artwork by ID
router.delete('/:id', auth, deleteArtwork);

// PUT update artwork by ID
router.put('/:id', auth, updateArtwork);


router.get('/explore', artworkController.getAllArtworksPublic);
router.get('/:id', artworkController.getArtworkById);
module.exports = router;
