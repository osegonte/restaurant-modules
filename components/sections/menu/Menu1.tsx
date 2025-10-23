'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { Leaf, Wheat } from 'lucide-react'

interface MenuItem {
  name_de: string
  name_en: string
  price: string              // "12.50" or "12.50 - 18.00" for variants
  description_de?: string
  description_en?: string
  image?: string
  category: string           // "appetizers" | "mains" | "desserts" | "drinks"
  dietary_tags?: ('vegetarian' | 'vegan' | 'gluten-free')[]
}

interface Menu1Props {
  title_de: string
  title_en: string
  subtitle_de?: string
  subtitle_en?: string
  items: MenuItem[]
  language: 'de' | 'en'
  categories?: { id: string; label_de: string; label_en: string }[]
}

const defaultCategories = [
  { id: 'appetizers', label_de: 'Vorspeisen', label_en: 'Appetizers' },
  { id: 'mains', label_de: 'Hauptgerichte', label_en: 'Main Courses' },
  { id: 'desserts', label_de: 'Desserts', label_en: 'Desserts' },
  { id: 'drinks', label_de: 'Getränke', label_en: 'Drinks' },
]

export default function Menu1({
  title_de,
  title_en,
  subtitle_de,
  subtitle_en,
  items,
  language = 'de',
  categories = defaultCategories,
}: Menu1Props) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || 'appetizers')

  const filteredItems = items.filter(item => item.category === activeCategory)

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

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-foreground/5 text-foreground hover:bg-foreground/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === 'de' ? category.label_de : category.label_en}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Items Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          key={activeCategory}
        >
          {filteredItems.map((item, index) => (
            <motion.article
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Dish Image */}
              {item.image && (
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={language === 'de' ? item.name_de : item.name_en}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Price Badge on Image */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
                    <span className="text-lg font-bold text-primary">€{item.price}</span>
                  </div>
                </div>
              )}

              {/* Dish Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-xl font-heading font-semibold text-foreground leading-tight">
                    {language === 'de' ? item.name_de : item.name_en}
                  </h3>
                  {!item.image && (
                    <span className="text-xl font-bold text-primary whitespace-nowrap">
                      €{item.price}
                    </span>
                  )}
                </div>

                {/* Description */}
                {(item.description_de || item.description_en) && (
                  <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                    {language === 'de' ? item.description_de : item.description_en}
                  </p>
                )}

                {/* Dietary Tags */}
                {item.dietary_tags && item.dietary_tags.length > 0 && (
                  <div className="flex gap-2 items-center">
                    {item.dietary_tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-1 text-xs text-foreground/60"
                        title={tag}
                      >
                        {getDietaryIcon(tag)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-foreground/60">
              {language === 'de' 
                ? 'Keine Gerichte in dieser Kategorie verfügbar.' 
                : 'No dishes available in this category.'}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}