import Hero4 from '@/components/sections/hero/Hero4'
import Header1 from '@/components/sections/header/Header1'
import Menu1 from '@/components/sections/menu/Menu1'
import Contact1 from '@/components/sections/contact/Contact1'
import Footer1 from '@/components/sections/footer/Footer1'

export default function PreviewPage() {
  // Sample data for testing
  const sampleMenuItems = [
    {
      name_de: 'Bruschetta al Pomodoro',
      name_en: 'Tomato Bruschetta',
      price: '8.50',
      description_de: 'Geröstetes Brot mit frischen Tomaten, Basilikum und Olivenöl',
      description_en: 'Toasted bread with fresh tomatoes, basil and olive oil',
      image: '/menu/bruschetta.jpg',
      category: 'appetizers',
      dietary_tags: ['vegetarian', 'vegan'],
    },
    {
      name_de: 'Carpaccio vom Rind',
      name_en: 'Beef Carpaccio',
      price: '14.50',
      description_de: 'Hauchdünnes Rindfleisch mit Rucola, Parmesan und Balsamico',
      description_en: 'Thinly sliced beef with arugula, parmesan and balsamic',
      category: 'appetizers',
    },
    {
      name_de: 'Spaghetti Carbonara',
      name_en: 'Spaghetti Carbonara',
      price: '16.50',
      description_de: 'Klassische römische Pasta mit Ei, Pecorino und Guanciale',
      description_en: 'Classic Roman pasta with egg, pecorino and guanciale',
      image: '/menu/carbonara.jpg',
      category: 'mains',
    },
    {
      name_de: 'Risotto ai Funghi',
      name_en: 'Mushroom Risotto',
      price: '18.00',
      description_de: 'Cremiges Risotto mit gemischten Pilzen und Parmesan',
      description_en: 'Creamy risotto with mixed mushrooms and parmesan',
      category: 'mains',
      dietary_tags: ['vegetarian'],
    },
    {
      name_de: 'Saltimbocca alla Romana',
      name_en: 'Saltimbocca alla Romana',
      price: '24.50',
      description_de: 'Kalbsschnitzel mit Salbei, Parmaschinken und Weißwein',
      description_en: 'Veal cutlet with sage, parma ham and white wine',
      image: '/menu/saltimbocca.jpg',
      category: 'mains',
    },
    {
      name_de: 'Tiramisu',
      name_en: 'Tiramisu',
      price: '7.50',
      description_de: 'Hausgemachtes Tiramisu mit Mascarpone und Espresso',
      description_en: 'Homemade tiramisu with mascarpone and espresso',
      image: '/menu/tiramisu.jpg',
      category: 'desserts',
      dietary_tags: ['vegetarian'],
    },
    {
      name_de: 'Panna Cotta',
      name_en: 'Panna Cotta',
      price: '6.50',
      description_de: 'Italienische Sahnecreme mit Beerensauce',
      description_en: 'Italian cream dessert with berry sauce',
      category: 'desserts',
      dietary_tags: ['vegetarian', 'gluten-free'],
    },
    {
      name_de: 'Espresso',
      name_en: 'Espresso',
      price: '2.50',
      description_de: 'Klassischer italienischer Espresso',
      description_en: 'Classic Italian espresso',
      category: 'drinks',
      dietary_tags: ['vegan'],
    },
    {
      name_de: 'Cappuccino',
      name_en: 'Cappuccino',
      price: '3.50',
      description_de: 'Espresso mit aufgeschäumter Milch',
      description_en: 'Espresso with steamed milk',
      category: 'drinks',
      dietary_tags: ['vegetarian'],
    },
  ]

  const contactInfo = {
    phone: '+49 2381 123456',
    email: 'info@trattoria-bella.de',
    address: {
      street: 'Weststraße 12',
      zip: '59065',
      city: 'Hamm',
      country: 'Deutschland',
    },
    hours: {
      monday: '17:00 - 23:00',
      tuesday: '17:00 - 23:00',
      wednesday: '17:00 - 23:00',
      thursday: '17:00 - 23:00',
      friday: '17:00 - 00:00',
      saturday: '12:00 - 00:00',
      sunday: '12:00 - 22:00',
    },
  }

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Menu', href: '#menu' },
    { label: 'Über uns', href: '#about' },
    { label: 'Kontakt', href: '#contact' },
  ]

  const footerNavLinks = [
    { label_de: 'Impressum', label_en: 'Imprint', href: '/impressum' },
    { label_de: 'Datenschutz', label_en: 'Privacy', href: '/datenschutz' },
    { label_de: 'AGB', label_en: 'Terms', href: '/agb' },
  ]

  const socialLinks = [
    { platform: 'instagram' as const, url: 'https://instagram.com/trattoriabella' },
    { platform: 'facebook' as const, url: 'https://facebook.com/trattoriabella' },
    { platform: 'email' as const, url: 'mailto:info@trattoria-bella.de' },
  ]

  return (
    <>
      <Header1
        logo="Trattoria Bella"
        navLinks={navLinks}
        ctaText="Reservieren"
        ctaLink="#contact"
      />

      <Hero4
        title="Trattoria Bella"
        subtitle="Authentische italienische Küche"
        description="Erleben Sie die wahre italienische Küche in gemütlicher Atmosphäre. Hausgemachte Pasta, frische Zutaten und traditionelle Rezepte aus ganz Italien."
        ctaText="Speisekarte ansehen"
        ctaLink="#menu"
      />

      <Menu1
        title_de="Unsere Speisekarte"
        title_en="Our Menu"
        subtitle_de="Frisch zubereitet mit den besten Zutaten aus Italien"
        subtitle_en="Freshly prepared with the finest ingredients from Italy"
        items={sampleMenuItems}
        language="de"
      />

      <Contact1
        title_de="Besuchen Sie uns"
        title_en="Visit Us"
        subtitle_de="Wir freuen uns auf Ihren Besuch in unserem Restaurant"
        subtitle_en="We look forward to welcoming you to our restaurant"
        contactInfo={contactInfo}
        googleMapsEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2471.234567890!2d7.814832!3d51.679722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDQwJzQ3LjAiTiA3wrA0OCc1My40IkU!5e0!3m2!1sde!2sde!4v1234567890"
        language="de"
      />

      <Footer1
        logo="Trattoria Bella"
        navLinks={footerNavLinks}
        socialLinks={socialLinks}
        language="de"
        restaurantName="Trattoria Bella"
      />
    </>
  )
}