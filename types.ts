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
  theme: Theme;
  header: HeaderData;
  hero: HeroSection;
  features: FeaturesSection;
  testimonials: TestimonialsSection;
  cta: CallToActionSection;
  footer: FooterData;
}