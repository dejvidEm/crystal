export type MediaGalleryVideoItem = {
  id: string
  type: "video"
  src: string
  fallbackImage: string
}

export type MediaGalleryPhotoItem = {
  id: string
  type: "photo"
  src: string
  altIndex: number
}

export type MediaGalleryItem = MediaGalleryVideoItem | MediaGalleryPhotoItem

export const MEDIA_GALLERY_ITEMS: MediaGalleryItem[] = [
  {
    id: "photo-5486",
    type: "photo",
    src: "/bento/photo/IMG_5486.png",
    altIndex: 0,
  },
  {
    id: "photo-1813",
    type: "photo",
    src: "/bento/photo/IMG_1813.jpg",
    altIndex: 1,
  },
  {
    id: "photo-1814",
    type: "photo",
    src: "/bento/photo/IMG_1814.jpg",
    altIndex: 2,
  },
  {
    id: "photo-1815",
    type: "photo",
    src: "/bento/photo/IMG_1815.jpg",
    altIndex: 3,
  },
  {
    id: "video-two",
    type: "video",
    src: "/bento/video/two.mov",
    fallbackImage: "/bento/photo/IMG_4243.png",
  },
  {
    id: "photo-1816",
    type: "photo",
    src: "/bento/photo/IMG_1816.jpg",
    altIndex: 4,
  },
  {
    id: "photo-1817",
    type: "photo",
    src: "/bento/photo/IMG_5485.png",
    altIndex: 5,
  },
  {
    id: "photo-4243",
    type: "photo",
    src: "/bento/photo/IMG_4383.png",
    altIndex: 6,
  },
]

export const MOBILE_GALLERY_VISIBLE_COUNT = 4
