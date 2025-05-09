const cloudinary = require("../config/cloudinary");
const { v4: uuidv4 } = require("uuid");

class UploadService {
  static async uploadToCloudinary(fileBuffer) {
    return new Promise((resolve, reject) => {
      const uniqueFilename = uuidv4();

      cloudinary.uploader.upload_stream(
        {
          folder: "bookstore-ktp",
          format: "png",
          public_id: uniqueFilename,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      ).end(fileBuffer);
    });
  }

  static async uploadMultiple(files) {
    if (!Array.isArray(files) || files.length === 0) {
      throw new Error("No files provided.");
    }

    const uploadPromises = files.map((file) => this.uploadToCloudinary(file.buffer));
    return await Promise.all(uploadPromises);
  }
}

module.exports = UploadService;
