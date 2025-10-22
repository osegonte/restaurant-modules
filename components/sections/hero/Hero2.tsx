
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Hero2Props {
  image: string            // High-quality food or interior photo
  imageAlt: string         // Descriptive alt text for accessibility
  categoryLabel: string    // Small label (e.g., "Since 2020", "Family Owned")
  title: string           // Restaurant name or headline
  description: string     // 2-3 sentence description
  ctaText: string        // Button text
  ctaLink: string        // Button destination
  imageOnLeft?: boolean  // Layout direction (default: true)
}

export default function Hero2({
  image,
  imageAlt,
  categoryLabel,
  title,
  description,
  ctaText,
  ctaLink,
  imageOnLeft = true
}: Hero2Props) {
  return (
    <section className="min-h-[90vh] flex items-center py-16 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[90rem]">
        
        <div className={`grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center ${
          !imageOnLeft ? 'md:grid-flow-dense' : ''
        }`}>
          
          {/* Image Side */}
          <motion.div
            className={`relative ${imageOnLeft ? '' : 'md:col-start-2'}`}
            initial={{ opacity: 0, x: imageOnLeft ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div 
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </motion.div>
          
          {/* Text Side */}
          <motion.article
            className={`flex flex-col justify-center ${
              imageOnLeft ? '' : 'md:col-start-1 md:row-start-1'
            }`}
            initial={{ opacity: 0, x: imageOnLeft ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Category Label */}
            <motion.span
              className="text-xs font-semibold uppercase tracking-[0.1em] text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {categoryLabel}
            </motion.span>
            
            {/* Restaurant Name / Headline */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] text-foreground mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {title}
            </motion.h1>
            
            {/* Description */}
            <motion.p
              className="text-base md:text-lg leading-[1.8] text-foreground/80 mb-10 max-w-[540px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {description}
            </motion.p>
            
            {/* CTA Button */}
            <motion.a
              href={ctaLink}
              className="inline-block self-start bg-primary hover:bg-secondary text-white font-semibold px-10 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-250 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {ctaText}
            </motion.a>
          </motion.article>
          
        </div>
      </div>
    </section>
  )
}