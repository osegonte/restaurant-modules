'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Mail } from 'lucide-react'

interface NavLink {
  label_de: string
  label_en: string
  href: string
}

interface SocialLink {
  platform: 'instagram' | 'facebook' | 'email'
  url: string
}

interface Footer1Props {
  logo: string                    // Text or image path
  logoAlt?: string
  navLinks: NavLink[]
  socialLinks?: SocialLink[]
  language: 'de' | 'en'
  restaurantName: string
}

export default function Footer1({
  logo,
  logoAlt = 'Restaurant logo',
  navLinks,
  socialLinks,
  language = 'de',
  restaurantName,
}: Footer1Props) {
  const currentYear = new Date().getFullYear()
  const isImageLogo = logo.includes('/') || logo.includes('.')

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
    <footer className="bg-foreground text-white py-8 md:py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[90rem]">
        
        {/* Single Row Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="block">
              {isImageLogo ? (
                <div className="relative h-8 w-auto">
                  <Image
                    src={logo}
                    alt={logoAlt}
                    height={32}
                    width={100}
                    className="object-contain brightness-0 invert"
                  />
                </div>
              ) : (
                <span className="text-2xl font-heading font-bold">
                  {logo}
                </span>
              )}
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            className="flex flex-wrap items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm text-white/80 hover:text-white transition-colors duration-200"
              >
                {language === 'de' ? link.label_de : link.label_en}
              </Link>
            ))}
          </motion.nav>

          {/* Social Icons */}
          {socialLinks && socialLinks.length > 0 && (
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Visit our ${social.platform}`}
                >
                  {getSocialIcon(social.platform)}
                </motion.a>
              ))}
            </motion.div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-6" />

        {/* Copyright */}
        <motion.div
          className="text-center text-sm text-white/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>
            © {currentYear} {restaurantName}.{' '}
            {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}