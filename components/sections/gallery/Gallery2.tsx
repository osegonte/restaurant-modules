'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

interface GalleryImage {
  src: string
  alt: string
  caption_de?: string
  caption_en?: string
}

interface Gallery2Props {
  title_de: string
  title_en: string
  subtitle_de?: string
  subtitle_en?: string
  images: GalleryImage[]
  language: 'de' | 'en'
  autoPlayDelay?: number
}

export default function Gallery2({
  title_de,
  title_en,
  subtitle_de,
  subtitle_en,
  images,
  language = 'de',
  autoPlayDelay = 5000,
}: Gallery2Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const goToPrevious = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  const goToSlide = (index: number) => setCurrentIndex(index)

  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(goToNext, autoPlayDelay)
    return () => clearInterval(interval)
  }, [isAutoPlay, currentIndex, autoPlayDelay])

  return (
    <section className="py-20 md:py-28 bg-background" id="gallery">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[90rem]">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-4">
            {language === 'de' ? title_de : title_en}
          </h2>
          {(subtitle_de || subtitle_en) && (
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              {language === 'de' ? subtitle_de : subtitle_en}
            </p>
          )}
        </motion.div>

        <div className="relative">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-foreground/5">
            <AnimatePresence mode="wait">
              <motion.div key={currentIndex} className="relative w-full h-full" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <Image src={images[currentIndex].src} alt={images[currentIndex].alt} fill className="object-cover" sizes="100vw" priority={currentIndex === 0} />
                {(images[currentIndex].caption_de || images[currentIndex].caption_en) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-8">
                    <motion.p className="text-white text-lg md:text-xl font-medium" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                      {language === 'de' ? images[currentIndex].caption_de : images[currentIndex].caption_en}
                    </motion.p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110" aria-label="Previous image">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110" aria-label="Next image">
              <ChevronRight className="w-6 h-6" />
            </button>
            <button onClick={() => setIsAutoPlay(!isAutoPlay)} className="absolute top-4 right-4 bg-white/90 hover:bg-white text-foreground p-2.5 rounded-full shadow-lg transition-all duration-300" aria-label={isAutoPlay ? 'Pause slideshow' : 'Play slideshow'}>
              {isAutoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          <motion.div className="mt-6 flex gap-3 overflow-x-auto pb-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            {images.map((image, index) => (
              <motion.button key={index} onClick={() => goToSlide(index)} className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all duration-300 ${currentIndex === index ? 'ring-4 ring-primary scale-105' : 'opacity-60 hover:opacity-100'}`} whileHover={{ scale: currentIndex === index ? 1.05 : 1.02 }} whileTap={{ scale: 0.95 }}>
                <Image src={image.src} alt={`Thumbnail ${index + 1}`} fill className="object-cover" sizes="100px" />
              </motion.button>
            ))}
          </motion.div>

          {isAutoPlay && (
            <div className="mt-4 h-1 bg-foreground/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-primary" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: autoPlayDelay / 1000, ease: 'linear', repeat: Infinity }} key={currentIndex} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}