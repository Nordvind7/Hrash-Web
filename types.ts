// --- Generic Design Types ---
import { DESIGN_TYPES } from './constants/design-types';

export type DesignTypeId = typeof DESIGN_TYPES[number]['id'];

// --- Website-Specific Types ---

export interface NavLink {
  text: string;
  href: string;
}

export interface HeaderData {
  logoText: string;
  navLinks: NavLink[];
}

export interface HeroSection {
  headline: string;
  subheadline: string;
  ctaButton: {
    text: string;
    href: string;
  };
  imagePrompt: string;
  imageUrl?: string; // Will be populated after generation
}

export interface Feature {
  icon: string; // Emoji or simple name for an icon
  title: string;
  description: string;
}

export interface FeaturesSection {
  title: string;
  subtitle: string;
  features: Feature[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatarPrompt: string;
  avatarUrl?: string; // Will be populated after generation
}

export interface TestimonialsSection {
  title: string;
  testimonials: Testimonial[];
}

export interface CallToActionSection {
    headline: string;
    subheadline: string;
    buttonText: string;
}

export interface FooterData {
  copyrightText: string;
  socialLinks: {
    platform: 'Twitter' | 'LinkedIn' | 'Instagram' | 'Facebook';
    href: string;
  }[];
}

export interface Theme {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    headingColor: string;
    subtleTextColor: string;
    fontFamily: {
        heading: string;
        body: string;
    };
    googleFontUrl: string;
    borderRadius: string;
}

export interface WebsiteData {
  designType: 'website'; // To distinguish from other design types
  theme: Theme;
  header: HeaderData;
  hero: HeroSection;
  features: FeaturesSection;
  testimonials: TestimonialsSection;
  cta: CallToActionSection;
  footer: FooterData;
}


// --- Graphic Asset-Specific Types ---

export interface AppDesignData {
    designType: 'app-design';
    title: string;
    imagePrompt: string;
    imageUrl?: string;
}

export interface MarketingKitData {
    designType: 'marketing-kit';
    slideTitle: string;
    mainThesis: string;
    keyPoints: string[];
    backgroundImagePrompt: string;
    backgroundImageUrl?: string;
}

export interface LogoData {
    designType: 'logo';
    brandName: string;
    colorLogoPrompt: string;
    colorLogoUrl?: string;
    bwLogoPrompt: string;
    bwLogoUrl?: string;
}

export interface BusinessCardData {
    designType: 'business-card';
    name: string;
    jobTitle: string;
    phone: string;
    email: string;
    website: string;
    backgroundImagePrompt: string;
    backgroundImageUrl?: string;
}

export interface YoutubeCoverData {
    designType: 'youtube-cover';
    headline: string;
    channelName: string;
    backgroundImagePrompt: string;
    backgroundImageUrl?: string;
}

export interface ArticleCoverData {
    designType: 'article-cover';
    title: string;
    imagePrompt: string;
    imageUrl?: string;
}

export interface AdCreativeData {
    designType: 'ad-creative';
    headline: string;
    callToAction: string;
    backgroundImagePrompt: string;
    backgroundImageUrl?: string;
}

export interface PosterData {
    designType: 'poster';
    title: string;
    subtitle: string;
    eventInfo: string;
    backgroundImagePrompt: string;
    backgroundImageUrl?: string;
}

export interface ChecklistData {
    designType: 'checklist';
    title: string;
    items: string[];
    backgroundImagePrompt: string;
    backgroundImageUrl?: string;
}

export interface LeadMagnetData {
    designType: 'lead-magnet';
    title: string;
    author: string;
    backgroundImagePrompt: string;
    backgroundImageUrl?: string;
}

export type GraphicAssetData = 
  | AppDesignData
  | MarketingKitData
  | LogoData
  | BusinessCardData
  | YoutubeCoverData
  | ArticleCoverData
  | AdCreativeData
  | PosterData
  | ChecklistData
  | LeadMagnetData;


// Union type for all possible outputs
export type DesignOutput = WebsiteData | GraphicAssetData;