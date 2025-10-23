'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, ExternalLink } from 'lucide-react'
import Image from 'next/image'

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

interface Contact2Props {
  title_de: string
  title_en: string
  subtitle_de?: string
  subtitle_en?: string
  contactInfo: ContactInfo
  googleMapsUrl: string
  googleMapsEmbedUrl: string
  language: 'de' | 'en'
}

export default function Contact2({
  title_de,
  title_en,
  subtitle_de,
  subtitle_en,
  contactInfo,
  googleMapsUrl,
  googleMapsEmbedUrl,
  language = 'de',
}: Contact2Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert(language === 'de' 
      ? 'Vielen Dank! Wir haben Ihre Reservierungsanfrage erhalten und werden uns in Kürze bei Ihnen melden.' 
      : 'Thank you! We have received your reservation request and will contact you shortly.')
    
    setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '' })
    setIsSubmitting(false)
  }

  return (
    <section className="py-20 md:py-28 bg-background" id="contact">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[75rem]">
        
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

        <div className="grid lg:grid-cols-[2fr,1fr] gap-12">
          
          {/* Large Reservation Form */}
          <motion.div
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-heading font-bold text-foreground mb-8">
              {language === 'de' ? 'Tisch reservieren' : 'Reserve a Table'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground/80 mb-2">
                    {language === 'de' ? 'Name' : 'Name'} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-foreground/10 focus:border-primary focus:outline-none transition-all"
                    placeholder={language === 'de' ? 'Max Mustermann' : 'John Doe'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground/80 mb-2">
                    {language === 'de' ? 'E-Mail' : 'Email'} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-foreground/10 focus:border-primary focus:outline-none transition-all"
                    placeholder="max@beispiel.de"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-foreground/80 mb-2">
                  {language === 'de' ? 'Telefon' : 'Phone'} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-foreground/10 focus:border-primary focus:outline-none transition-all"
                  placeholder="+49 123 456789"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-foreground/80 mb-2">
                    {language === 'de' ? 'Datum' : 'Date'} *
                  </label>
                  <input
                    type="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-foreground/10 focus:border-primary focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-semibold text-foreground/80 mb-2">
                    {language === 'de' ? 'Uhrzeit' : 'Time'} *
                  </label>
                  <input
                    type="time"
                    id="time"
                    required
                    value={formData.time}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-foreground/10 focus:border-primary focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="guests" className="block text-sm font-semibold text-foreground/80 mb-2">
                    {language === 'de' ? 'Personen' : 'Guests'} *
                  </label>
                  <select
                    id="guests"
                    required
                    value={formData.guests}
                    onChange={e => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-foreground/10 focus:border-primary focus:outline-none transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground/80 mb-2">
                  {language === 'de' ? 'Besondere Wünsche (optional)' : 'Special Requests (optional)'}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-foreground/10 focus:border-primary focus:outline-none transition-all resize-none"
                  placeholder={language === 'de' ? 'Allergien, besondere Anlässe, etc.' : 'Allergies, special occasions, etc.'}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-lg py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  language === 'de' ? 'Wird gesendet...' : 'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {language === 'de' ? 'Reservierung anfragen' : 'Request Reservation'}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Sidebar: Small Map + Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Map Thumbnail */}
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
              <iframe
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={language === 'de' ? 'Karte' : 'Map'}
              />
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100"
              >
                <span className="bg-white text-foreground px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-lg">
                  {language === 'de' ? 'In Maps öffnen' : 'Open in Maps'}
                  <ExternalLink className="w-4 h-4" />
                </span>
              </a>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-foreground/80 leading-relaxed">
                  {contactInfo.address.street}<br />
                  {contactInfo.address.zip} {contactInfo.address.city}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>

              <div className="pt-4 border-t border-foreground/10">
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-semibold text-foreground/90">
                    {language === 'de' ? 'Öffnungszeiten' : 'Opening Hours'}
                  </span>
                </div>
                <div className="space-y-1 pl-8 text-xs text-foreground/70">
                  <div className="flex justify-between">
                    <span>{language === 'de' ? 'Mo-Do' : 'Mon-Thu'}</span>
                    <span className="font-medium">{contactInfo.hours.monday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'de' ? 'Fr-Sa' : 'Fri-Sat'}</span>
                    <span className="font-medium">{contactInfo.hours.friday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'de' ? 'So' : 'Sun'}</span>
                    <span className="font-medium">{contactInfo.hours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}