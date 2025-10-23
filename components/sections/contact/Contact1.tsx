'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

interface ContactInfo {
  phone: string
  email: string
  address: {
    street: string
    zip: string
    city: string
    country: string
  }
  hours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
}

interface Contact1Props {
  title_de: string
  title_en: string
  subtitle_de?: string
  subtitle_en?: string
  contactInfo: ContactInfo
  googleMapsEmbedUrl: string
  language: 'de' | 'en'
}

export default function Contact1({
  title_de,
  title_en,
  subtitle_de,
  subtitle_en,
  contactInfo,
  googleMapsEmbedUrl,
  language = 'de',
}: Contact1Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert(language === 'de' 
      ? 'Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen.' 
      : 'Thank you for your message! We will get back to you soon.')
    
    setFormData({ name: '', email: '', phone: '', message: '' })
    setIsSubmitting(false)
  }

  const daysOfWeek = [
    { key: 'monday', label_de: 'Montag', label_en: 'Monday' },
    { key: 'tuesday', label_de: 'Dienstag', label_en: 'Tuesday' },
    { key: 'wednesday', label_de: 'Mittwoch', label_en: 'Wednesday' },
    { key: 'thursday', label_de: 'Donnerstag', label_en: 'Thursday' },
    { key: 'friday', label_de: 'Freitag', label_en: 'Friday' },
    { key: 'saturday', label_de: 'Samstag', label_en: 'Saturday' },
    { key: 'sunday', label_de: 'Sonntag', label_en: 'Sunday' },
  ]

  return (
    <section className="py-20 md:py-28 bg-background" id="contact">
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

        {/* Main Content: Map + Sidebar */}
        <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
          
          {/* Google Maps Embed - 70% width on desktop */}
          <motion.div
            className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              src={googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={language === 'de' ? 'Restaurant Standort' : 'Restaurant Location'}
            />
          </motion.div>

          {/* Sidebar: Contact Info + Form */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-heading font-semibold text-foreground mb-6">
                {language === 'de' ? 'Kontaktinformationen' : 'Contact Information'}
              </h3>
              
              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground/90 mb-1">
                      {language === 'de' ? 'Adresse' : 'Address'}
                    </p>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {contactInfo.address.street}<br />
                      {contactInfo.address.zip} {contactInfo.address.city}<br />
                      {contactInfo.address.country}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground/90 mb-1">
                      {language === 'de' ? 'Telefon' : 'Phone'}
                    </p>
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                      className="text-sm text-foreground/70 hover:text-primary transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground/90 mb-1">
                      {language === 'de' ? 'E-Mail' : 'Email'}
                    </p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-sm text-foreground/70 hover:text-primary transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground/90 mb-2">
                      {language === 'de' ? 'Öffnungszeiten' : 'Opening Hours'}
                    </p>
                    <div className="space-y-1">
                      {daysOfWeek.map(day => (
                        <div key={day.key} className="flex justify-between text-xs text-foreground/70">
                          <span>{language === 'de' ? day.label_de : day.label_en}</span>
                          <span className="font-medium">
                            {contactInfo.hours[day.key as keyof typeof contactInfo.hours]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-heading font-semibold text-foreground mb-6">
                {language === 'de' ? 'Nachricht senden' : 'Send Message'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                    {language === 'de' ? 'Name' : 'Name'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-foreground/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder={language === 'de' ? 'Ihr Name' : 'Your name'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                    {language === 'de' ? 'E-Mail' : 'Email'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-foreground/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder={language === 'de' ? 'Ihre E-Mail' : 'Your email'}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground/80 mb-2">
                    {language === 'de' ? 'Telefon (optional)' : 'Phone (optional)'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-foreground/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder={language === 'de' ? 'Ihre Telefonnummer' : 'Your phone number'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                    {language === 'de' ? 'Nachricht' : 'Message'}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-foreground/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder={language === 'de' ? 'Ihre Nachricht...' : 'Your message...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    language === 'de' ? 'Wird gesendet...' : 'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {language === 'de' ? 'Nachricht senden' : 'Send Message'}
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}