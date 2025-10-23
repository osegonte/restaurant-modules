'use client'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

interface Milestone {
  year: string
  title_de: string
  title_en: string
  description_de: string
  description_en: string
}

interface About3Props {
  title_de: string
  title_en: string
  subtitle_de?: string
  subtitle_en?: string
  foundingStory_de: string
  foundingStory_en: string
  milestones: Milestone[]
  language: 'de' | 'en'
}

export default function About3({
  title_de,
  title_en,
  subtitle_de,
  subtitle_en,
  foundingStory_de,
  foundingStory_en,
  milestones,
  language = 'de',
}: About3Props) {
  return (
    <section className="py-20 md:py-28 bg-background" id="about">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[75rem]">
        
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

        {/* Founding Story */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-6 text-primary">
            <Calendar className="w-6 h-6" />
          </div>
          <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
            {language === 'de' ? foundingStory_de : foundingStory_en}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          {/* Milestones */}
          <div className="space-y-16">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0

              return (
                <motion.article
                  key={index}
                  className={`relative flex items-center gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  {/* Year Badge - Desktop */}
                  <div className={`hidden md:flex flex-1 justify-${isEven ? 'end' : 'start'}`}>
                    {isEven && (
                      <motion.div
                        className="inline-flex items-center justify-center w-20 h-20 bg-primary text-white rounded-full font-heading font-bold text-2xl shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {milestone.year}
                      </motion.div>
                    )}
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-[1.875rem] md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10" />

                  {/* Content Card */}
                  <div className={`flex-1 ml-16 md:ml-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <motion.div
                      className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Year Badge - Mobile */}
                      <div className="inline-flex md:hidden items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-lg font-heading font-bold text-lg mb-4">
                        {milestone.year}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                        {language === 'de' ? milestone.title_de : milestone.title_en}
                      </h3>
                      <p className="text-base leading-relaxed text-foreground/70">
                        {language === 'de' ? milestone.description_de : milestone.description_en}
                      </p>
                    </motion.div>
                  </div>

                  {/* Year Badge - Desktop (Right Side) */}
                  <div className={`hidden md:flex flex-1 justify-${isEven ? 'start' : 'end'}`}>
                    {!isEven && (
                      <motion.div
                        className="inline-flex items-center justify-center w-20 h-20 bg-primary text-white rounded-full font-heading font-bold text-2xl shadow-lg"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {milestone.year}
                      </motion.div>
                    )}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>

        {/* Closing Statement */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-foreground/60 italic">
            {language === 'de'
              ? 'Unsere Geschichte geht weiter...'
              : 'Our story continues...'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}