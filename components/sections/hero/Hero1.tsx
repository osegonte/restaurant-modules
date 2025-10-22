
'use client'
import { motion } from 'framer-motion'

interface Hero1Props {
  backgroundImage: string  // High-res image URL (min 2000x1200px recommended)
  title: string            // Restaurant name or primary headline
  subtitle: string         // Tagline or brief description
  ctaText: string         // Button label (e.g., "Reserve Table", "View Menu")
  ctaLink: string         // URL or anchor (#reservations, #menu)
}

export default function Hero1({ 
  backgroundImage, 
  title, 
  subtitle, 
  ctaText, 
  ctaLink 
}: Hero1Props) {
  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      aria-label="Restaurant hero section"
    >
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        role="img"
        aria-label="Restaurant interior showcasing ambiance and dining atmosphere"
      >
        {/* Gradient Overlay - Ensures text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-[56rem] mx-auto">
        
        {/* Restaurant Name / Headline */}
        <motion.h1
          className="text-[3.5rem] sm:text-[4.25rem] lg:text-[5rem] font-heading font-bold leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {title}
        </motion.h1>
        
        {/* Tagline / Description */}
        <motion.p
          className="text-lg sm:text-xl lg:text-2xl font-body leading-relaxed mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {subtitle}
        </motion.p>
        
        {/* Call-to-Action Button */}
        <motion.a
          href={ctaLink}
          className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold text-base tracking-wider uppercase px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.98 }}
        >
          {ctaText}
        </motion.a>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="text-white text-sm font-light tracking-wide uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: 'easeInOut',
              repeatType: 'loop'
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}