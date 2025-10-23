'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Quote } from 'lucide-react'

interface About1Props {
  title_de: string
  title_en: string
  subtitle_de?: string
  subtitle_en?: string
  story_de: string
  story_en: string
  pullQuote_de: string
  pullQuote_en: string
  chefImage: string
  chefName_de: string
  chefName_en: string
  chefTitle_de: string
  chefTitle_en: string
  language: 'de' | 'en'
}

export default function About1({
  title_de,
  title_en,
  subtitle_de,
  subtitle_en,
  story_de,
  story_en,
  pullQuote_de,
  pullQuote_en,
  chefImage,
  chefName_de,
  chefName_en,
  chefTitle_de,
  chefTitle_en,
  language = 'de',
}: About1Props) {
  return (
    <section className="py-20 md:py-28 bg-background" id="about">
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

        {/* Main Content: Side by Side */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Chef Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={chefImage}
                alt={language === 'de' ? chefName_de : chefName_en}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            
            {/* Chef Info Badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="font-heading font-bold text-xl text-foreground mb-1">
                {language === 'de' ? chefName_de : chefName_en}
              </p>
              <p className="text-sm text-foreground/60">
                {language === 'de' ? chefTitle_de : chefTitle_en}
              </p>
            </motion.div>
          </motion.div>

          {/* Story Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Pull Quote */}
            <motion.div
              className="relative mb-8 pl-8 border-l-4 border-primary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Quote className="absolute -left-3 top-0 w-6 h-6 text-primary bg-background" />
              <p className="text-2xl md:text-3xl font-heading font-semibold text-foreground leading-snug italic">
                {language === 'de' ? pullQuote_de : pullQuote_en}
              </p>
            </motion.div>

            {/* Story Paragraphs */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {(language === 'de' ? story_de : story_en).split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base md:text-lg leading-relaxed text-foreground/80"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}