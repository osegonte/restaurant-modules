'use client'
import { motion } from 'framer-motion'
import { Leaf, Wheat } from 'lucide-react'

interface MenuItem {
  name_de: string
  name_en: string
  price: string
  description_de?: string
  description_en?: string
  category: string
  dietary_tags?: ('vegetarian' | 'vegan' | 'gluten-free')[]
}

interface MenuCategory {
  id: string
  title_de: string
  title_en: string
  items: MenuItem[]
}

interface Menu3Props {
  title_de: string
  title_en: string
  subtitle_de?: string
  subtitle_en?: string
  categories: MenuCategory[]
  language: 'de' | 'en'
}

export default function Menu3({
  title_de,
  title_en,
  subtitle_de,
  subtitle_en,
  categories,
  language = 'de',
}: Menu3Props) {
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
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[55rem]">
        
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
            <p className="text-lg text-foreground/70 max-w-xl mx-auto">
              {language === 'de' ? subtitle_de : subtitle_en}
            </p>
          )}
        </motion.div>

        {/* Categories - Elegant Vertical Stack */}
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
            >
              {/* Category Title with Decorative Line */}
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 uppercase tracking-wider">
                  {language === 'de' ? category.title_de : category.title_en}
                </h3>
                <div className="w-16 h-0.5 bg-primary mx-auto" />
              </div>

              {/* Menu Items - Clean Typography */}
              <div className="space-y-8">
                {category.items.map((item, itemIndex) => (
                  <motion.article
                    key={itemIndex}
                    className="border-b border-foreground/10 pb-6 last:border-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: itemIndex * 0.08 }}
                  >
                    {/* Name and Price */}
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h4 className="text-xl md:text-2xl font-heading font-semibold text-foreground flex-1">
                        {language === 'de' ? item.name_de : item.name_en}
                      </h4>
                      <span className="text-xl md:text-2xl font-bold text-primary whitespace-nowrap">
                        €{item.price}
                      </span>
                    </div>

                    {/* Description */}
                    {(item.description_de || item.description_en) && (
                      <p className="text-sm md:text-base text-foreground/60 leading-relaxed mb-3 max-w-[90%]">
                        {language === 'de' ? item.description_de : item.description_en}
                      </p>
                    )}

                    {/* Dietary Tags - Inline */}
                    {item.dietary_tags && item.dietary_tags.length > 0 && (
                      <div className="flex gap-2 items-center flex-wrap">
                        {item.dietary_tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/10 rounded text-xs text-foreground/60"
                            title={tag}
                          >
                            {getDietaryIcon(tag)}
                            <span className="capitalize">
                              {tag === 'gluten-free' 
                                ? (language === 'de' ? 'Glutenfrei' : 'Gluten-free')
                                : (language === 'de' 
                                  ? (tag === 'vegetarian' ? 'Vegetarisch' : 'Vegan')
                                  : tag
                                )
                              }
                            </span>
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.article>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional Note */}
        <motion.p
          className="text-center text-sm text-foreground/50 mt-16 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {language === 'de'
            ? 'Alle Preise in Euro. Änderungen vorbehalten.'
            : 'All prices in Euro. Subject to change.'}
        </motion.p>
      </div>
    </section>
  )
}