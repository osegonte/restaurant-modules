'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, Leaf, Award, Users } from 'lucide-react'

interface TeamMember {
  name: string
  role_de: string
  role_en: string
  image: string
}

interface Value {
  icon: 'heart' | 'leaf' | 'award' | 'users'
  title_de: string
  title_en: string
  description_de: string
  description_en: string
}

interface About2Props {
  title_de: string
  title_en: string
  subtitle_de?: string
  subtitle_en?: string
  mission_de: string
  mission_en: string
  teamMembers: TeamMember[]
  values: Value[]
  language: 'de' | 'en'
}

export default function About2({
  title_de,
  title_en,
  subtitle_de,
  subtitle_en,
  mission_de,
  mission_en,
  teamMembers,
  values,
  language = 'de',
}: About2Props) {
  const getIcon = (iconName: string) => {
    const iconClass = 'w-8 h-8'
    switch (iconName) {
      case 'heart':
        return <Heart className={iconClass} />
      case 'leaf':
        return <Leaf className={iconClass} />
      case 'award':
        return <Award className={iconClass} />
      case 'users':
        return <Users className={iconClass} />
      default:
        return <Heart className={iconClass} />
    }
  }

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

        {/* Mission Statement */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/80 font-light">
            {language === 'de' ? mission_de : mission_en}
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 text-primary">
                {getIcon(value.icon)}
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                {language === 'de' ? value.title_de : value.title_en}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {language === 'de' ? value.description_de : value.description_en}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Members Grid */}
        <div>
          <motion.h3
            className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {language === 'de' ? 'Unser Team' : 'Our Team'}
          </motion.h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.article
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <h4 className="text-xl font-heading font-semibold text-foreground mb-1">
                  {member.name}
                </h4>
                <p className="text-sm text-foreground/60">
                  {language === 'de' ? member.role_de : member.role_en}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}