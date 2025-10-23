'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage {
  src: string
  alt: string
  caption_de?: string
  caption_en?: string
  size?: 'small' | 'medium' | 'large' // For bento-box layout
}

interface Gallery1Props {
  title_de: string
  title_en: string
  subtitle_de?: string
  subtitle_en?: string
  images: GalleryImage[]
  language: 'de' | 'en'
}

export default function Gallery1({
  title_de,
  title_en,
  subtitle_de,
  subtitle_en,
  images,
  language = 'de',
}: Gallery1Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length)
    }
  }
  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
    }
  }

  const getGridClass = (size?: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2'
      case 'medium':
        return 'md:col-span-2'
      default:
        return ''
    }
  }

  return (
    <section className="py-20 md:py-28 bg-background" id="gallery">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[90rem]">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-4">
            {language === 'de' ? title_de : title_en}
          </h2>
          {(subtitle_de || subtitle_en) && (
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              {language === 'de' ? subtitle_de : subtitle_en}
            </p>
          )}
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 ${getGridClass(
                image.size
              )}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
              />
              
              {/* Overlay with Caption */}
              {(image.caption_de || image.caption_en) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">
                    {language === 'de' ? image.caption_de : image.caption_en}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-white/70 transition-colors z-10"
                aria-label="Close lightbox"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                className="absolute left-4 text-white hover:text-white/70 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>

              {/* Image */}
              <motion.div
                className="relative max-w-5xl max-h-[85vh] w-full h-full"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[lightboxIndex].src}
                  alt={images[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
                
                {/* Caption */}
                {(images[lightboxIndex].caption_de || images[lightboxIndex].caption_en) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center p-4">
                    <p className="text-lg">
                      {language === 'de'
                        ? images[lightboxIndex].caption_de
                        : images[lightboxIndex].caption_en}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-4 text-white hover:text-white/70 transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-10 h-10" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                {lightboxIndex + 1} / {images.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}