import { ThemeName } from "@/themes";

export interface SiteConfig {
  restaurantName: string;
  tagline: string;
  description: string;
  
  contact: {
    phone: string;
    email: string;
    address: {
      street: string;
      zip: string;
      city: string;
      country: string;
    };
  };
  
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  
  googleMapsUrl?: string;
  googleMapsEmbedUrl?: string;
  
  theme: ThemeName;
  
  modules: {
    hero: "Hero1" | "Hero2" | "Hero3" | "Hero4";
    header: "Header1" | "Header2" | "Header3";
    menu: "Menu1" | "Menu2" | "Menu3" | "Menu4";
    about?: "About1" | "About2" | "About3";
    gallery?: "Gallery1" | "Gallery2";
    contact: "Contact1" | "Contact2" | "Contact3";
    footer: "Footer1" | "Footer2" | "Footer3";
  };
  
  features: {
    reservations: boolean;
    menuCMS: boolean;
    multiLanguage: boolean;
  };
}
