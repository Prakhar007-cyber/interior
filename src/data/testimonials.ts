export type Testimonial = {
  quote: string;
  name: string;
  project: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They didn't just redesign our home. They changed the way we experience it.",
    name: "Ananya & Rohan Mehta",
    project: "The Quiet House, New Delhi",
  },
  {
    quote:
      "Every morning the light moves through the house differently. Living here feels like living inside a slow, beautiful film.",
    name: "Vikram Singh",
    project: "House of Light, Jaipur",
  },
  {
    quote:
      "We expected a designer. We found a studio that listened harder than anyone we have ever worked with.",
    name: "Priya Nair",
    project: "Terra Residence, Gurugram",
  },
  {
    quote:
      "Our guests feel the difference before they can name it. That is exactly what we hoped for.",
    name: "Kabir Shah",
    project: "Sora, Mumbai",
  },
];

export const stats = [
  { value: 75, suffix: "+", label: "Spaces Designed" },
  { value: 8, suffix: "", label: "Years of Practice" },
  { value: 12, suffix: "", label: "Cities" },
  { value: 150000, suffix: "+", label: "Sq. Ft. Designed", format: "compact" },
] as const;
