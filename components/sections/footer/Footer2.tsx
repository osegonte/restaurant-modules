'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Mail, Send } from 'lucide-react'

interface NavLink {
  label_de: string
  label_en: string
  href: string
}

interface SocialLink {
  platform: 'instagram' | 'facebook' | 'email'
  url: string
}

interface Footer2Props {
  logo: string
  logoAlt?: string
  restaurantName: string
  description_de: string
  description_en: string
  navLinks: NavLink[]
  socialLinks?: SocialLink[]
  hours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  language: 'de' | 'en'
}

export default function Footer2({
  logo,
  logoAlt = 'Restaurant logo',
  restaurantName,
  description_de,
  description_en,
  navLinks,
  socialLinks,
  hours,
  language = 'de',
}: Footer2Props) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const currentYear = new Date().getFullYear()
  const isImageLogo = logo.includes('/') || logo.includes('.')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert(language === 'de' 
      ? 'Vielen Dank für Ihre Anmeldung zum Newsletter!' 
      : 'Thank you for subscribing to our newsletter!')
    
    setEmail('')
    setIsSubmitting(false)
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />
      case 'facebook':
        return <Facebook className="w-5 h-5" />
      case 'email':
        return <Mail className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[90rem]">
        
        {/* Main Footer Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          
          {/* Column 1: About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-block mb-4">
              {isImageLogo ? (
                <div className="relative h-10 w-auto">
                  <Image
                    src={logo}
                    alt={logoAlt}
                    height={40}
                    width={120}
                    className="object-contain brightness-0 invert"
                  />
                </div>
              ) : (
                <span className="text-2xl font-heading font-bold">
                  {logo}
                </span>
              )}
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              {language === 'de' ? description_de : description_en}
            </p>
            
            {/* Social Links */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-3 mt-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Visit our ${social.platform}`}
                  >
                    {getSocialIcon(social.platform)}
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-heading font-bold mb-4">
              {language === 'de' ? 'Links' : 'Links'}
            </h3>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {language === 'de' ? link.label_de : link.label_en}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Column 3: Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-heading font-bold mb-4">
              {language === 'de' ? 'Öffnungszeiten' : 'Opening Hours'}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/70">
                <span>{language === 'de' ? 'Montag' : 'Monday'}</span>
                <span className="font-medium text-white">{hours.monday}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>{language === 'de' ? 'Dienstag' : 'Tuesday'}</span>
                <span className="font-medium text-white">{hours.tuesday}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>{language === 'de' ? 'Mittwoch' : 'Wednesday'}</span>
                <span className="font-medium text-white">{hours.wednesday}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>{language === 'de' ? 'Donnerstag' : 'Thursday'}</span>
                <span className="font-medium text-white">{hours.thursday}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>{language === 'de' ? 'Freitag' : 'Friday'}</span>
                <span className="font-medium text-white">{hours.friday}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>{language === 'de' ? 'Samstag' : 'Saturday'}</span>
                <span className="font-medium text-white">{hours.saturday}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>{language === 'de' ? 'Sonntag' : 'Sunday'}</span>
                <span className="font-medium text-white">{hours.sunday}</span>
              </div>
            </div>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-heading font-bold mb-4">
              {language === 'de' ? 'Newsletter' : 'Newsletter'}
            </h3>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              {language === 'de' 
                ? 'Bleiben Sie auf dem Laufenden über Neuigkeiten und Angebote.'
                : 'Stay updated with our latest news and offers.'}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={language === 'de' ? 'Ihre E-Mail' : 'Your email'}
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-white/40 transition-all"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-3 py-2 bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50"
                aria-label={language === 'de' ? 'Abonnieren' : 'Subscribe'}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>
              © {currentYear} {restaurantName}.{' '}
              {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
            </p>
            <div className="flex gap-6">
              <Link href="/impressum" className="hover:text-white transition-colors">
                {language === 'de' ? 'Impressum' : 'Imprint'}
              </Link>
              <Link href="/datenschutz" className="hover:text-white transition-colors">
                {language === 'de' ? 'Datenschutz' : 'Privacy'}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}