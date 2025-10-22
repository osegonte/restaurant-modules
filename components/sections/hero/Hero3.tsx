

'use client'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'

interface Hero3Props {
  videoSrc: string         // Primary video source (MP4)
  videoSrcWebM?: string    // WebM fallback for better compression
  posterImage: string      // Fallback image / mobile poster
  title: string           // Short, impactful headline
  subtitle: string        // Brief atmospheric description
  ctaText: string        // Button label
  ctaLink: string        // Button destination
}

export default function Hero3({
  videoSrc,
  videoSrcWebM,
  posterImage,
  title,
  subtitle,
  ctaText,
  ctaLink
}: Hero3Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  // Auto-play video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Autoplay prevented:', err)
      })
    }
  }, [])

  // Toggle play/pause
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      aria-label="Restaurant video hero section"
    >
      {/* Video Background Layer */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={posterImage}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Restaurant atmosphere and culinary artistry showcase video"
        >
          {videoSrcWebM && <source src={videoSrcWebM} type="video/webm" />}
          <source src={videoSrc} type="video/mp4" />
          {/* Fallback for browsers without video support */}
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${posterImage})` }}
          />
        </video>
        
        {/* Dark Cinematic Overlay - 60% for dramatic effect */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Container - Optically centered */}
      <div 
        className="relative z-10 text-center text-white px-6 max-w-[45rem] mx-auto"
        style={{ transform: 'translateY(-4%)' }} // Optical center adjustment
      >
        
        {/* Headline */}
        <motion.h1
          className="text-6xl sm:text-7xl lg:text-[5.5rem] font-heading font-bold leading-[1.05] mb-5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {title}
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl font-body font-light leading-relaxed mb-14 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {subtitle}
        </motion.p>
        
        {/* CTA Button - Outline style for elegance */}
        <motion.a
          href={ctaLink}
          className="inline-block border-2 border-white text-white hover:bg-white hover:text-foreground font-medium text-base tracking-wide uppercase px-12 py-4 rounded-xl backdrop-blur-sm transition-all duration-400 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white drop-shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {ctaText}
        </motion.a>
      </div>

      {/* Video Play/Pause Control - Bottom right */}
      <motion.button
        onClick={toggleVideo}
        className="absolute bottom-6 right-6 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </motion.button>
    </section>
  )
}