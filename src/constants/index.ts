export const BRAND_NAME = "Wise Care";
export const BRAND_TAGLINE = "Doc2Door";
export const NATIONAL_EMERGENCY_NUMBER = "112";

export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Providers", href: "/providers" },
  { label: "Emergency", href: "/emergency" },
  { label: "FAQ", href: "/faq" },
] as const;

export const FOOTER_LINKS = {
  company: [
    { label: "About", href: "/about" },
    { label: "Providers", href: "/providers" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Emergency Directory", href: "/emergency" },
    { label: "Dashboard", href: "/dashboard" },
  ],
} as const;
