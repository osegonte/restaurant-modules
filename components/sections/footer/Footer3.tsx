'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

interface NavLink {
  label_de: string
  label_en: string
  href: string
}

interface Footer3Props {
  restaurantName: string
  address: {
    street: string
    zip: string
    city: string
    country: string
  }
  phone: string
  email: string
  hours: {
    weekday: string
    weekend: string
  }
  navLinks: NavLink[]
  googleMapsEmbedUrl: string
  language: 'de' | 'en'
}

export default function Footer3({
  restaurantName,
  address,
  phone,
  email,
  hours,
  navLinks,
  googleMapsEmbedUrl,
  language = 'de',
}: Footer3Props) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[90rem]">
        
        <div className="grid md:grid-cols-[2fr,1fr] gap-12 mb-12">
          
          {/* Left: Contact Information (Prominent) */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">
                {restaurantName}
              </h2>

              {/* Address */}
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {language === 'de' ? 'Adresse' : 'Address'}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {address.street}<br />
                    {address.zip} {address.city}<br />
                    {address.country}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 mb-6">
                <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {language === 'de' ? 'Telefon' : 'Phone'}
                  </h3>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-white/80 hover:text-white transition-colors text-lg"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 mb-6">
                <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {language === 'de' ? 'E-Mail' : 'Email'}
                  </h3>
                  <a
                    href={`mailto:${email}`}
                    className="text-white/80 hover:text-white transition-colors text-lg"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-3">
                    {language === 'de' ? 'Öffnungszeiten' : 'Opening Hours'}
                  </h3>
                  <div className="space-y-2 text-white/80">
                    <div className="flex justify-between gap-8">
                      <span>{language === 'de' ? 'Mo - Fr' : 'Mon - Fri'}</span>
                      <span className="font-medium text-white">{hours.weekday}</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>{language === 'de' ? 'Sa - So' : 'Sat - Sun'}</span>
                      <span className="font-medium text-white">{hours.weekend}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Map Snippet + Navigation */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Small Map Preview */}
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={language === 'de' ? 'Standort' : 'Location'}
              />
            </div>

            {/* Navigation Links */}
            <nav className="space-y-3">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  {language === 'de' ? link.label_de : link.label_en}
                </Link>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <motion.div
            className="text-center text-sm text-white/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>
              © {currentYear} {restaurantName}.{' '}
              {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}