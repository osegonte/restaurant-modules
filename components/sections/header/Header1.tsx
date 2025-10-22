
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

interface NavLink {
  label: string
  href: string
}

interface Header1Props {
  logo: string | React.ReactNode  // Text or image/component
  navLinks: NavLink[]             // Array of navigation items
  ctaText: string                // Reserve/Order button text
  ctaLink: string                // CTA destination
}

export default function Header1({
  logo,
  navLinks,
  ctaText,
  ctaLink
}: Header1Props) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Track scroll position for header state change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
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

  return (
    <>
      {/* Header - Fixed at top */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md shadow-sm' 
            : 'bg-transparent backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav 
          className="container mx-auto px-6 md:px-8 lg:px-12 max-w-[90rem]"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-20 lg:h-20">
            
            {/* Logo */}
            <Link 
              href="/"
              className={`text-2xl font-heading font-bold transition-colors duration-400 ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              {logo}
            </Link>
            
            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`text-[0.9375rem] font-medium uppercase tracking-wider transition-all duration-250 hover:text-primary relative group ${
                    isScrolled ? 'text-foreground' : 'text-white'
                  }`}
                >
                  {link.label}
                  {/* Hover underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-250" />
                </Link>
              ))}
            </div>
            
            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <Link
                href={ctaLink}
                className={`inline-block px-6 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isScrolled
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'border-2 border-white text-white hover:bg-white hover:text-foreground'
                }`}
              >
                {ctaText}
              </Link>
            </div>
            
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors duration-400 ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Slide-out Menu */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-background z-50 lg:hidden overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-foreground"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Mobile Navigation Links */}
            <div className="flex flex-col items-center gap-6 px-6 py-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-medium uppercase tracking-wide text-foreground hover:text-primary transition-colors duration-250"
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <Link
                href={ctaLink}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-6 px-8 py-4 bg-primary text-white rounded-lg text-base font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors duration-300"
              >
                {ctaText}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </>
  )
}
