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

interface Contact3Props {
  title_de: string
  title_en: string
  subtitle_de?: string
  subtitle_en?: string
  contactInfo: ContactInfo
  googleMapsEmbedUrl: string
  language: 'de' | 'en'
}

export default function Contact3({
  title_de,
  title_en,
  subtitle_de,
  subtitle_en,
  contactInfo,
  googleMapsEmbedUrl,
  language = 'de',
}: Contact3Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert(language === 'de' 
      ? 'Nachricht gesendet! Wir melden uns bald bei Ihnen.' 
      : 'Message sent! We will get back to you soon.')
    
    setFormData({ name: '', email: '', message: '' })
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

        {/* Split Screen Layout */}
        <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Left: Google Maps */}
          <motion.div
            className="relative h-[400px] lg:h-[700px]"
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

          {/* Right: Contact Info + Form */}
          <motion.div
            className="bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Contact Details */}
            <div className="mb-10 space-y-6">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                {language === 'de' ? 'Kontaktinformationen' : 'Contact Information'}
              </h3>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    {language === 'de' ? 'Adresse' : 'Address'}
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {contactInfo.address.street}<br />
                    {contactInfo.address.zip} {contactInfo.address.city}<br />
                    {contactInfo.address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">
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

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">
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

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-foreground mb-3">
                    {language === 'de' ? 'Öffnungszeiten' : 'Opening Hours'}
                  </p>
                  <div className="space-y-1.5">
                    {daysOfWeek.map(day => (
                      <div key={day.key} className="flex justify-between text-sm">
                        <span className="text-foreground/70">
                          {language === 'de' ? day.label_de : day.label_en}
                        </span>
                        <span className="font-medium text-foreground">
                          {contactInfo.hours[day.key as keyof typeof contactInfo.hours]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-foreground/10 mb-10" />

            {/* Quick Contact Form */}
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                {language === 'de' ? 'Schnelle Anfrage' : 'Quick Inquiry'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-foreground/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder={language === 'de' ? 'Ihr Name' : 'Your Name'}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-foreground/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder={language === 'de' ? 'Ihre E-Mail' : 'Your Email'}
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-foreground/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder={language === 'de' ? 'Ihre Nachricht...' : 'Your Message...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
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