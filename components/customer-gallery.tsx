"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-context"

type GalleryImage = {
  id: string
  src: string
  alt: string
  title: string
  width: number
  height: number
  span?: "col" | "row" | "both" | "none"
}

export function CustomerGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const { t } = useLanguage()

  // Gallery images data - replace with your actual images
  const galleryImages: GalleryImage[] = [
    {
      id: "1",
      src: "/images/client1.jpg",
      alt: "Luxury sedan after detailing",
      title: t.gallery?.luxurySedanTitle || "Luxury Sedan Transformation",
      width: 800,
      height: 600,
      span: "col",
    },
    {
      id: "2",
      src: "/images/client2.jpg",
      alt: "SUV interior detailing",
      title: t.gallery?.suvInteriorTitle || "Premium SUV Interior",
      width: 800,
      height: 600,
    },
    {
      id: "3",
      src: "/images/client3.jpg",
      alt: "Sports car ceramic coating",
      title: t.gallery?.sportsCarTitle || "Ceramic Coating Excellence",
      width: 800,
      height: 600,
      span: "row",
    },
    {
      id: "4",
      src: "/images/client4.jpg",
      alt: "Exotic car detailing",
      title: t.gallery?.exoticCarTitle || "Exotic Car Perfection",
      width: 800,
      height: 600,
    },
    {
      id: "5",
      src: "/images/client5.jpg",
      alt: "Classic car restoration",
      title: t.gallery?.classicCarTitle || "Classic Beauty Restored",
      width: 800,
      height: 600,
    },
    {
      id: "6",
      src: "/images/client6.jpg",
      alt: "Luxury vehicle paint correction",
      title: t.gallery?.paintCorrectionTitle || "Flawless Paint Correction",
      width: 800,
      height: 600,
      span: "both",
    },
  ]

  // Open lightbox
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image)
    document.body.style.overflow = "hidden" // Prevent scrolling when lightbox is open
  }

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "" // Re-enable scrolling
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className={cn(
              "relative overflow-hidden rounded-lg group cursor-pointer",
              image.span === "col" && "md:col-span-2",
              image.span === "row" && "md:row-span-2",
              image.span === "both" && "md:col-span-2 md:row-span-2",
            )}
            onClick={() => openLightbox(image)}
          >
            {/* Image */}
            <div className="aspect-[4/3] relative overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90"></div>

              {/* Title overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div className="self-end">
                  <ZoomIn className="text-white/70 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  {image.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Image */}
              <div className="relative">
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  width={selectedImage.width}
                  height={selectedImage.height}
                  className="max-h-[85vh] w-auto object-contain"
                />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4">
                  <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}