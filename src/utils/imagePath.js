// Utility function to get the correct image path for both development and production
export const getImagePath = (imageName) => {
  // Check if we're in production (GitHub Pages) or development
  const isProduction = process.env.NODE_ENV === "production";
  const basePath = isProduction ? "/portfolio" : "";
  
  // Ensure imageName starts with a forward slash
  const normalizedImageName = imageName.startsWith("/") ? imageName : `/${imageName}`;
  
  const finalPath = `${basePath}${normalizedImageName}`;
  

  
  return finalPath;
};
