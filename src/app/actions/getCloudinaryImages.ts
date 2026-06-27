"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getAllGalleryImages() {
  try {
    const searchResult = await cloudinary.search
      .expression('folder:"golden-moments gallery/*"')
      .sort_by("public_id", "desc")
      .max_results(200)
      .execute();

    const images = searchResult.resources.map((resource: any, index: number) => {
      const sizes = [
        { w: 800, h: 1000 },
        { w: 900, h: 600 },
        { w: 800, h: 1200 },
        { w: 800, h: 800 },
        { w: 1000, h: 700 },
        { w: 800, h: 1120 },
        { w: 960, h: 620 },
        { w: 1200, h: 800 },
      ];
      const size = sizes[index % sizes.length];

      // Extract category from folder name
      let category = "All";
      const folderName = (resource.asset_folder || resource.folder || "").toLowerCase();
      
      if (folderName.includes("wedding")) category = "Wedding";
      else if (folderName.includes("rice")) category = "Rice Ceremony";
      else if (folderName.includes("maternity")) category = "Maternity";
      else if (folderName.includes("pre")) category = "Pre Wedding";
      else if (folderName.includes("portfolio")) category = "Portfolio";
      else if (folderName.includes("corporate")) category = "Corporate";
      else if (folderName.includes("baby")) category = "Baby Shoot";

      return {
        id: 1000 + index, 
        src: resource.secure_url,
        title: `${category} ${index + 1}`,
        category: category,
        description: `A timeless moment from the ${category.toLowerCase()}`,
        w: size.w,
        h: size.h,
      };
    });

    return images;
  } catch (error) {
    console.error(`Error fetching Cloudinary images:`, error);
    return [];
  }
}
