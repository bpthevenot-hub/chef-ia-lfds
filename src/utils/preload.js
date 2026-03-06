/** Preload an array of image URLs */
export function preloadImages(urls) {
  urls.forEach((url) => {
    if (url) {
      const img = new Image();
      img.src = url;
    }
  });
}
