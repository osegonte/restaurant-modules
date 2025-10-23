'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Leaf, Wheat } from 'lucide-react'

interface MenuItem {
  name_de: string
  name_en: string
  price: string
  description_de?: string
  description_en?: string
  dietary_tags?: ('vegetarian' | 'vegan' | 'gluten-free')[]
}

interface MenuCategory {
  id: string
  title_de: string
  title_en: string
  heroImage: string
  items: MenuItem[]
}

interface Menu4Props {
  title_de: string
  title_en: string
  subtitle_de?: string
  subtitle_en?: string
  categories: MenuCategory[]
  language: 'de' | 'en'
}

export default function Menu4({
  title_de,
  title_en,
  subtitle_de,
  subtitle_en,
  categories,
  language = 'de',
}: Menu4Props) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    categories[0]?.id || null
  )

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const getDietaryIcon = (tag: string) => {
    switch (tag) {
      case 'vegetarian':
      case 'vegan':
        return <Leaf className="w-3.5 h-3.5 text-accent" />
      case 'gluten-free':
        return <Wheat className="w-3.5 h-3.5 text-accent" />
      default:
        return null
    }
  }

  return (
    <section className="py-20 md:py-28 bg-background" id="menu">
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

        {/* Accordion Categories */}
        <div className="space-y-6">
          {categories.map((category, categoryIndex) => {
            const isExpanded = expandedCategory === category.id

            return (
              <motion.div
                key={category.id}
                className="rounded-2xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                {/* Category Header with Hero Image */}
                <motion.button
                  onClick={() => toggleCategory(category.id)}
                  className="relative w-full h-64 md:h-80 overflow-hidden group"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Hero Image */}
                  <Image
                    src={category.heroImage}
                    alt={language === 'de' ? category.title_de : category.title_en}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="100vw"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Category Title */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-4xl md:text-5xl font-heading font-bold mb-2">
                        {language === 'de' ? category.title_de : category.title_en}
                      </h3>
                      <div className="flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
                        <span>
                          {isExpanded
                            ? (language === 'de' ? 'Schließen' : 'Close')
                            : (language === 'de' ? 'Öffnen' : 'Open')}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.button>

                {/* Expandable Menu Items */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="bg-white overflow-hidden"
                    >
                      <div className="p-8 md:p-12">
                        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                          {category.items.map((item, itemIndex) => (
                            <motion.article
                              key={itemIndex}
                              className="border-b border-foreground/10 pb-6 last:border-0"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: itemIndex * 0.08 }}
                            >
                              {/* Name and Price */}
                              <div className="flex items-baseline justify-between gap-3 mb-2">
                                <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                                  {language === 'de' ? item.name_de : item.name_en}
                                </h4>
                                <div className="flex items-center gap-1">
                                  <span className="text-lg md:text-xl font-bold text-primary whitespace-nowrap">
                                    €{item.price}
                                  </span>
                                </div>
                              </div>

                              {/* Description */}
                              {(item.description_de || item.description_en) && (
                                <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                                  {language === 'de' ? item.description_de : item.description_en}
                                </p>
                              )}

                              {/* Dietary Tags */}
                              {item.dietary_tags && item.dietary_tags.length > 0 && (
                                <div className="flex gap-2 items-center flex-wrap">
                                  {item.dietary_tags.map((tag, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center gap-1 text-xs text-foreground/60"
                                      title={tag}
                                    >
                                      {getDietaryIcon(tag)}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </motion.article>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}