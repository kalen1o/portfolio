// Utility function to get the correct image path for both development and production
export const getImagePath = (imageName) => {
  // Check if we're in production (GitHub Pages) or development
  if (typeof window !== 'undefined') {
    // Client-side: check if we're on GitHub Pages
    if (window.location.hostname === 'kalen1o.github.io') {
      return `/portfolio${imageName}`;
    }
  }
  // Development or other cases
  return imageName;
};
