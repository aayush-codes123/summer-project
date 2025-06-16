const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const artworkRoutes = require('./routes/artworkRoutes.js');
const path = require('path')
const sellerRoutes = require('./routes/sellerRoutes');

dotenv.config();
connectDB();


const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",  // ✅ your frontend URL
    credentials: true                 // ✅ allow cookies / tokens to be sent
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", require("./routes/authRoutes"));
app.use('/api/seller/artworks', artworkRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/seller', sellerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
