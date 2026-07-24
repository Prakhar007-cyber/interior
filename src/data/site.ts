/** Global site constants: navigation, contact details, before/after pairs. */

export const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Studio", href: "/#studio" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Journal", href: "/#journal" },
  { label: "Contact", href: "/#contact" },
];

export const contact = {
  email: "studio@ateliervera.in",
  phone: "+91 98100 00000",
  // Digits only, for the WhatsApp click-to-chat link.
  whatsapp: "919810000000",
  address: "Studio No. 4, Mehrauli, New Delhi 110030",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
};

export type BeforeAfterPair = {
  title: string;
  location: string;
  before: string;
  after: string;
};

export const beforeAfter: BeforeAfterPair[] = [
  {
    title: "Living Room Transformation",
    location: "The Quiet House, New Delhi",
    before: "1484154218962-a197022b5858",
    after: "1616486338812-3dadae4b4ace",
  },
  {
    title: "Kitchen Reimagined",
    location: "Terra Residence, Gurugram",
    before: "1556909212-d5b604d0c90d",
    after: "1631679706909-1844bbd07221",
  },
];
