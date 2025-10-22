
'use client'
import { motion } from 'framer-motion'

interface Hero4Props {
  title: string            // Restaurant name (keep short, 2-4 words max)
  subtitle: string         // Brief tagline or cuisine type
  description?: string     // Optional 1-2 sentence description
  ctaText: string         // Button label
  ctaLink: string         // Button destination
}

export default function Hero4({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink
}: Hero4Props) {
  return (
    <section 
      className="relative min-h-[85vh] flex items-center justify-center bg-background px-8 md:px-12 py-20"
      aria-label="Restaurant hero section"
    >
      {/* Content Container - Centered with max-width */}
      <div className="max-w-[60rem] mx-auto text-center">
        
        {/* Decorative Divider - Subtle accent line */}
        <motion.div
          className="w-20 h-0.5 bg-accent mx-auto mb-8"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        
        {/* Restaurant Name - Dominant typographic element */}
        <motion.h1
          className="text-[4.5rem] sm:text-[6rem] lg:text-[7.5rem] font-heading font-bold leading-[0.95] text-foreground mb-8 tracking-tight"
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '-0.02em' }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {title}
        </motion.h1>
        
        {/* Tagline - Brand accent color */}
        <motion.p
          className="text-xl sm:text-2xl lg:text-[1.75rem] font-body font-light text-primary mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
        
        {/* Optional Description - Softer hierarchy */}
        {description && (
          <motion.p
            className="text-base sm:text-lg leading-[1.8] text-foreground/70 mb-16 max-w-[540px] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {description}
          </motion.p>
        )}
        
        {/* CTA Button - Minimal outline style */}
        <motion.a
          href={ctaLink}
          className="inline-block border border-foreground text-foreground hover:bg-foreground hover:text-background font-medium text-[0.9375rem] uppercase tracking-[0.15em] px-12 py-4 rounded-lg transition-all duration-350 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {ctaText}
        </motion.a>
      </div>
    </section>
  )
}
