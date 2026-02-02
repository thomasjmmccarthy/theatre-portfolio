import { galleryManifest } from "../../../generated/galleryManifest";

export const galleries = import.meta.glob(
  '/src/assets/galleries/**/*.{png,jpg,JPG,jpeg,webp}',
  { eager: true, query: '?url', import: 'default' }
)

export function getGallery(slug) {
  if(!slug) return [];
  return galleryManifest[slug] ?? [];
}