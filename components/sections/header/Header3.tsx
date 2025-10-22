

'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, Instagram, Facebook, Phone, Mail, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface NavLink {
  label: string
  href: string
  isActive?: boolean
}

interface SocialLink {
  platform: 'instagram' | 'facebook' | 'twitter'
  url: string
}

interface Header3Props {
  logo: string                    // Logo image path or text
  logoAlt?: string               // Alt text if logo is image
  navLinks: NavLink[]            // Main navigation links
  phone?: string                 // Phone number
  email?: string                 // Email address
  hours?: string                 // Opening hours text
  socialLinks?: SocialLink[]     // Social media links
  ctaText: string               // Sidebar CTA button text
  ctaLink: string               // CTA destination
}

export default function Header3({
  logo,
  logoAlt = 'Restaurant logo',
  navLinks,
  phone,
  email,
  hours,
  socialLinks,
  ctaText,
  ctaLink
}: Header3Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Check if logo is an image path or text
  const isImageLogo = logo.includes('/') || logo.includes('.')

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSidebarOpen])

  // Close sidebar on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isSidebarOpen])

  // Social icon mapping
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-5 h-5" />
      case 'facebook': return <Facebook className="w-5 h-5" />
      default: return null
    }
  }

  return (
    <>
      {/* Compact Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-foreground/8"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav 
          className="container mx-auto px-4 sm:px-6"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-14">
            
            {/* Logo */}
            <Link 
              href="/"
              className="flex items-center"
              aria-label="Home"
            >
              {isImageLogo ? (
                <div className="relative h-8 w-auto">
                  <Image
                    src={logo}
                    alt={logoAlt}
                    height={32}
                    width={80}
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <span className="text-xl font-heading font-bold text-foreground">
                  {logo}
                </span>
              )}
            </Link>
            
            {/* Hamburger Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-foreground hover:text-foreground/70 transition-colors duration-200"
              aria-label="Open menu"
              aria-expanded={isSidebarOpen}
            >
              <Menu className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Spacer */}
      <div className="h-14" aria-hidden="true" />

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsSidebarOpen(false)}
              aria-hidden="true"
            />

            {/* Sidebar */}
            <motion.aside
              className="fixed top-0 right-0 bottom-0 w-[85vw] sm:w-80 bg-background z-60 overflow-y-auto shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex flex-col h-full">
                
                {/* Close Button */}
                <div className="flex justify-end p-6">
                  <motion.button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 text-foreground hover:text-primary transition-colors duration-200"
                    aria-label="Close menu"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="w-6 h-6" strokeWidth={2} />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <nav className="px-8 py-4">
                  <div className="flex flex-col gap-6">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.06,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`block text-2xl font-medium transition-colors duration-250 border-l-3 pl-4 -ml-4 ${
                            link.isActive 
                              ? 'text-primary border-primary' 
                              : 'text-foreground/90 hover:text-primary border-transparent hover:border-primary'
                          }`}
                          aria-current={link.isActive ? 'page' : undefined}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                {/* Divider */}
                {(phone || email || hours) && (
                  <div className="mx-8 my-8 h-px bg-foreground/10" />
                )}

                {/* Contact Info Section */}
                {(phone || email || hours) && (
                  <motion.div
                    className="px-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-foreground/60 mb-4">
                      Contact
                    </h3>
                    <div className="flex flex-col gap-3 text-sm text-foreground/80">
                      {phone && (
                        <a 
                          href={`tel:${phone.replace(/\s/g, '')}`}
                          className="flex items-center gap-3 hover:text-primary transition-colors duration-200"
                        >
                          <Phone className="w-4 h-4" />
                          <span>{phone}</span>
                        </a>
                      )}
                      {email && (
                        <a 
                          href={`mailto:${email}`}
                          className="flex items-center gap-3 hover:text-primary transition-colors duration-200"
                        >
                          <Mail className="w-4 h-4" />
                          <span>{email}</span>
                        </a>
                      )}
                      {hours && (
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4" />
                          <span>{hours}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Divider */}
                {socialLinks && socialLinks.length > 0 && (
                  <div className="mx-8 my-8 h-px bg-foreground/10" />
                )}

                {/* Social Links */}
                {socialLinks && socialLinks.length > 0 && (
                  <motion.div
                    className="px-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-foreground/60 mb-4">
                      Follow Us
                    </h3>
                    <div className="flex gap-4">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-foreground hover:text-primary transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Visit our ${social.platform}`}
                        >
                          {getSocialIcon(social.platform)}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Spacer to push CTA to bottom */}
                <div className="flex-grow" />

                {/* CTA Button - Fixed to bottom */}
                <motion.div
                  className="p-8 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <Link
                    href={ctaLink}
                    onClick={() => setIsSidebarOpen(false)}
                    className="block w-full bg-primary hover:bg-primary/90 text-white text-center font-semibold text-base uppercase tracking-wide py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {ctaText}
                  </Link>
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
