
'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface NavLink {
  label: string
  href: string
}

interface Header2Props {
  logo: string                    // Logo image path or text
  logoAlt?: string               // Alt text if logo is image
  leftNavLinks: NavLink[]        // Links left of logo
  rightNavLinks: NavLink[]       // Links right of logo
}

export default function Header2({
  logo,
  logoAlt = 'Restaurant logo',
  leftNavLinks,
  rightNavLinks
}: Header2Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Check if logo is an image path or text
  const isImageLogo = logo.includes('/') || logo.includes('.')

  return (
    <>
      {/* Header - Fixed at top, always solid */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-foreground/10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav 
          className="container mx-auto px-8 md:px-12 lg:px-12 max-w-[80rem]"
          aria-label="Main navigation"
        >
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between h-24">
            
            {/* Left Navigation Group */}
            <div className="flex items-center gap-10">
              {leftNavLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 tracking-wide relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-250" />
                </Link>
              ))}
            </div>
            
            {/* Centered Logo */}
            <Link 
              href="/"
              className="flex items-center justify-center"
              aria-label="Home"
            >
              {isImageLogo ? (
                <div className="relative h-12 w-auto">
                  <Image
                    src={logo}
                    alt={logoAlt}
                    height={48}
                    width={120}
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <span className="text-[1.75rem] font-heading font-bold text-foreground">
                  {logo}
                </span>
              )}
            </Link>
            
            {/* Right Navigation Group */}
            <div className="flex items-center gap-10">
              {rightNavLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 tracking-wide relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-250" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden items-center justify-between h-18 py-4">
            
            {/* Mobile Hamburger - Left */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            
            {/* Mobile Logo - Centered */}
            <Link 
              href="/"
              className="absolute left-1/2 -translate-x-1/2"
              aria-label="Home"
            >
              {isImageLogo ? (
                <div className="relative h-10 w-auto">
                  <Image
                    src={logo}
                    alt={logoAlt}
                    height={40}
                    width={100}
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <span className="text-2xl font-heading font-bold text-foreground">
                  {logo}
                </span>
              )}
            </Link>
            
            {/* Spacer for layout balance */}
            <div className="w-10" />
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <motion.div
          className="lg:hidden overflow-hidden bg-background border-t border-foreground/10"
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="container mx-auto px-8 py-6">
            <div className="flex flex-col items-center gap-4">
              {/* All links combined for mobile */}
              {[...leftNavLinks, ...rightNavLinks].map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ 
                    opacity: isMobileMenuOpen ? 1 : 0,
                    y: isMobileMenuOpen ? 0 : -10
                  }}
                  transition={{ 
                    duration: 0.3, 
                    delay: isMobileMenuOpen ? index * 0.08 : 0 
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-24 lg:h-24" aria-hidden="true" />
    </>
  )
}
