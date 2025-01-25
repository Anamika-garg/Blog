const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Multer Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "your-folder", // specify a folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // restrict file formats if needed
  },
});

// Create Multer upload middleware
const upload = multer({ storage: storage });

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Middleware to Handle File Upload and Cloudinary Upload (No need to manually handle the upload)
const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }

  try {
    // req.file.cloudinaryUrl will already be set by multer-storage-cloudinary
    console.log("File uploaded to Cloudinary:", req.file.cloudinaryUrl);

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ error: "Failed to upload file to Cloudinary" });
  }
};

module.exports = { upload, uploadToCloudinary };
