
export const galleries = import.meta.glob(
  '/src/assets/galleries/**/*.{png,jpg,JPG,jpeg,webp}',
  { eager: true, query: '?url', import: 'default' }
)

export function getGalleryUrls(slug) {
  if(!slug) return [];
  return Object.entries(galleries)
         .filter(([path]) => path.includes(`/galleries/${slug}/`))
         .map(([, url]) => url);
}

export function loadImageSize(src, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error(`Image load timed out: ${src}`));
    }, timeoutMs);

    const cleanup = () => {
      clearTimeout(timeout);
      img.onload = null;
      img.onerror = null;
    }

    img.onload = () => {
      cleanup();
      resolve({
        src,
        w: img.naturalWidth,
        g: img.naturalHeight,
        o: img.naturalWidth >= img.naturalHeight ? 'L' : 'P'
      });
    }
    img.onerror = () => {
      cleanup();
      reject(new Error(`Image failed to load: ${src}`))
    };

    img.src = src;
  });
}