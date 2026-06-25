// scripts/upload-hall-of-love.js
require("dotenv").config({ path: ".env.local" });
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// Configuration
// Pointing to your local drive path for the photos
const PHOTOS_DIR = "T:\\GOLDENMOMENT ALL PHOTO";
const OUTPUT_FILE = path.join(__dirname, "../src/data/hallOfLoveData.ts");
const CLOUDINARY_FOLDER = "golden-moments/hall-of-love";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function main() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("❌ Cloudinary credentials are missing in .env.local!");
    process.exit(1);
  }

  if (!fs.existsSync(PHOTOS_DIR)) {
    console.error(`❌ Photos directory not found at ${PHOTOS_DIR}`);
    process.exit(1);
  }

  // 1. Read existing data to avoid overwriting your manual name changes!
  let existingData = [];
  if (fs.existsSync(OUTPUT_FILE)) {
    const content = fs.readFileSync(OUTPUT_FILE, "utf-8");
    const match = content.match(/export const hallOfLovePhotos: HallOfLovePhoto\[\] = (\[[\s\S]*\]);/);
    if (match && match[1]) {
      try {
        existingData = JSON.parse(match[1]);
        console.log(`✅ Loaded ${existingData.length} existing photos from data file.`);
      } catch (e) {
        console.error("Could not parse existing data. Starting fresh.");
      }
    }
  }

  let nextId = existingData.length > 0 ? Math.max(...existingData.map(p => p.id)) + 1 : 1;

  console.log("🔍 Reading local photos...");
  const files = fs.readdirSync(PHOTOS_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext);
  });

  if (files.length === 0) {
    console.error(`❌ No valid images found in ${PHOTOS_DIR}`);
    process.exit(1);
  }

  let newUploadsCount = 0;

  for (const file of files) {
    const filePath = path.join(PHOTOS_DIR, file);
    const originalFileName = path.parse(file).name;
    
    // Check if we already uploaded this file by looking for the filename in the image URLs
    // This allows you to safely rename the client "name" in the data file without it re-uploading!
    const alreadyUploaded = existingData.some(photo => 
      photo.full_image_url.includes(encodeURIComponent(originalFileName)) || 
      photo.full_image_url.includes(originalFileName)
    );

    if (alreadyUploaded) {
      console.log(`⏩ Skipping ${file} - already uploaded!`);
      continue;
    }

    console.log(`☁️ Uploading NEW photo: ${originalFileName}...`);

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: CLOUDINARY_FOLDER,
        use_filename: true,
        unique_filename: false, // Keep filenames clean for future matching
      });

      const thumbnailUrl = result.secure_url.replace(
        "/upload/",
        "/upload/c_limit,w_800/q_auto/f_auto/"
      );
      const fullImageUrl = result.secure_url.replace(
        "/upload/",
        "/upload/q_auto/f_auto/"
      );

      existingData.unshift({
        id: nextId++,
        name: originalFileName, // Placeholder name, you can change this in the TS file!
        thumbnail_url: thumbnailUrl,
        full_image_url: fullImageUrl,
      });

      newUploadsCount++;
    } catch (error) {
      console.error(`❌ Failed to upload ${file}:`, error.message);
    }
  }

  if (newUploadsCount === 0) {
    console.log("✅ No new photos to upload. Everything is up to date!");
    return;
  }

  console.log(`✅ Upload complete! Added ${newUploadsCount} new photos. Saving data...`);

  const tsContent = `export interface HallOfLovePhoto {
  id: number;
  name: string;
  thumbnail_url: string;
  full_image_url: string;
}

export const hallOfLovePhotos: HallOfLovePhoto[] = ${JSON.stringify(existingData, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, tsContent, "utf-8");
  console.log(`🎉 Success! Data file updated with your new photos while keeping your previous changes intact!`);
}

main().catch((err) => {
  console.error("An unexpected error occurred:", err);
});
