const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function run() {
  try {
    const searchResult = await cloudinary.search
      .expression('folder:"golden-moments gallery/*"')
      .max_results(2)
      .execute();
    
    console.log("Images found:", searchResult.resources.length);
    if (searchResult.resources.length > 0) {
      console.log("Resource 0:", JSON.stringify(searchResult.resources[0], null, 2));
    }
  } catch(e) {
    console.error("Error:", e);
  }
}
run();
