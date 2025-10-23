'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Leaf, Wheat } from 'lucide-react'

interface MenuItem {
  name_de: string
  name_en: string
  price: string
  description_de?: string
  description_en?: string
  image?: string
  category: string
  dietary_tags?: ('vegetarian' | 'vegan' | 'gluten-free')[]
}

interface MenuCategory {
  id: string
  title_de: string
  title_en: string
  items: MenuItem[]
}

interface Menu2Props {
  title_de: string
  title_en: string
  subtitle_de?: string
  subtitle_en?: string
  categories: MenuCategory[]
  language: 'de' | 'en'
}

export default function Menu2({
  title_de,
  title_en,
  subtitle_de,
  subtitle_en,
  categories,
  language = 'de',
}: Menu2Props) {
  const getDietaryIcon = (tag: string) => {
    switch (tag) {
      case 'vegetarian':
      case 'vegan':
        return <Leaf className="w-4 h-4 text-accent" />
      case 'gluten-free':
        return <Wheat className="w-4 h-4 text-accent" />
      default:
        return null
    }
  }

  return (
    <section className="py-20 md:py-28 bg-background" id="menu">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[75rem]">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
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

        {/* Categories - Vertical Stack */}
        <div className="space-y-20">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
            >
              {/* Category Title */}
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-10 text-center">
                {language === 'de' ? category.title_de : category.title_en}
              </h3>

              {/* Menu Items List */}
              <div className="space-y-8">
                {category.items.map((item, itemIndex) => {
                  const isEven = itemIndex % 2 === 0

                  return (
                    <motion.article
                      key={itemIndex}
                      className="grid md:grid-cols-[1fr,2fr] gap-6 items-center"
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: itemIndex * 0.1 }}
                    >
                      {/* Image - Alternating sides */}
                      {item.image && (
                        <div
                          className={`relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg ${
                            isEven ? 'md:order-1' : 'md:order-2'
                          }`}
                        >
                          <Image
                            src={item.image}
                            alt={language === 'de' ? item.name_de : item.name_en}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      )}

                      {/* Text Content */}
                      <div className={isEven ? 'md:order-2' : 'md:order-1'}>
                        {/* Name and Price Row with Dotted Line */}
                        <div className="flex items-baseline gap-2 mb-3">
                          <h4 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                            {language === 'de' ? item.name_de : item.name_en}
                          </h4>
                          <div className="flex-1 border-b-2 border-dotted border-foreground/20 mb-1" />
                          <span className="text-xl md:text-2xl font-bold text-primary whitespace-nowrap">
                            €{item.price}
                          </span>
                        </div>

                        {/* Description */}
                        {(item.description_de || item.description_en) && (
                          <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-3">
                            {language === 'de' ? item.description_de : item.description_en}
                          </p>
                        )}

                        {/* Dietary Tags */}
                        {item.dietary_tags && item.dietary_tags.length > 0 && (
                          <div className="flex gap-3 items-center">
                            {item.dietary_tags.map((tag, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1.5"
                                title={tag}
                              >
                                {getDietaryIcon(tag)}
                                <span className="text-xs text-foreground/60 capitalize">
                                  {tag === 'gluten-free' ? 'Glutenfrei' : tag}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.article>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}