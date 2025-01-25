const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads"); 
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });


const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'your-folder', // specify a folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // restrict file formats if needed
  },
});

const upload = multer({ storage: storage });


// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Middleware to Handle File Upload and Cloudinary Upload
const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }

  try {
    const filePath = path.resolve(`./uploads/${req.file.filename}`);
    const result = await cloudinary.uploader.upload(filePath, {
      transformation: [
        { quality: "auto", fetch_format: "auto" }
      ],
    });

    req.file.cloudinaryUrl = result.secure_url;

    // Remove local file after upload
    fs.unlinkSync(filePath);

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ error: "Failed to upload file to Cloudinary" });
  }
};

module.exports = { upload, uploadToCloudinary };
