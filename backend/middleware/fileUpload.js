const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Multer Memory Storage Configuration
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

// Middleware to Handle File Upload and Cloudinary Upload
const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }

  try {
    // Directly upload the file from memory (no need to save it locally)
    const result = await cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        transformation: [
          { quality: "auto", fetch_format: "auto" }
        ],
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: "Failed to upload file to Cloudinary" });
        }

        req.file.cloudinaryUrl = result.secure_url; // Attach the Cloudinary URL to the request
        next(); // Proceed to next middleware or route handler
      }
    );

    req.file.stream.pipe(result);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ error: "Failed to upload file to Cloudinary" });
  }
};

module.exports = { upload, uploadToCloudinary };
