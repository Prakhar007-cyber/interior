export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  /** Article body — an array of paragraphs and pull quotes. */
  body: { type: "p" | "quote" | "h"; text: string }[];
};

export const articles: Article[] = [
  {
    slug: "the-art-of-quiet-luxury",
    title: "The Art of Quiet Luxury",
    excerpt:
      "Why the most expensive-feeling interiors are often the ones that whisper — and how restraint became the ultimate signal of taste.",
    category: "Philosophy",
    readTime: "6 min",
    date: "Mar 2024",
    image: "1618221195710-dd6b41faaea6",
    body: [
      { type: "p", text: "There is a particular kind of luxury that never announces itself. It does not sparkle or shout. You feel it in the weight of a door, the softness of a wall in evening light, the quiet confidence of a room that has nothing left to prove." },
      { type: "quote", text: "The most expensive-feeling interiors are often the ones that whisper." },
      { type: "p", text: "Quiet luxury is the discipline of subtraction. It asks not what more we can add, but what we can take away until only the essential remains — and then how beautifully we can make that essential thing." },
      { type: "h", text: "Material over ornament" },
      { type: "p", text: "In place of decoration, we lean on honest materials: stone with real depth, timber with grain you want to touch, plaster that catches light like skin. These things do not date because they were never fashionable to begin with." },
      { type: "p", text: "The result is a home that feels calm the moment you enter it — and keeps feeling that way, year after year, long after any trend has passed." },
    ],
  },
  {
    slug: "why-natural-materials-age-better",
    title: "Why Natural Materials Age Better",
    excerpt:
      "Stone, oak and brass don't wear out — they wear in. A case for designing homes that grow more beautiful with time.",
    category: "Materials",
    readTime: "5 min",
    date: "Jan 2024",
    image: "1531835551805-16d864c8d311",
    body: [
      { type: "p", text: "Synthetic materials are born at their peak. From the day they are installed, they can only degrade — scratching, fading, peeling toward an inevitable replacement. Natural materials live by a different rule entirely." },
      { type: "quote", text: "Stone, oak and brass don't wear out. They wear in." },
      { type: "p", text: "Oak deepens. Brass develops a patina that no factory can fake. Stone carries the marks of a life lived around it, softening at the edges where hands and feet have passed a thousand times." },
      { type: "h", text: "Designing for time" },
      { type: "p", text: "When we specify a material, we are really specifying a future. We ask how it will look in ten years, in twenty — whether it will become more itself, or less. The answer almost always leads us back to the natural world." },
      { type: "p", text: "A home built from materials that age well is a home that grows more beautiful precisely because it is being used. That, to us, is the opposite of disposable design." },
    ],
  },
  {
    slug: "designing-homes-around-natural-light",
    title: "Designing Homes Around Natural Light",
    excerpt:
      "Before a single wall goes up, we study the sun. How daylight becomes the first, and most important, material we design with.",
    category: "Process",
    readTime: "7 min",
    date: "Nov 2023",
    image: "1512918728675-ed5a9ecdebfd",
    body: [
      { type: "p", text: "Before we draw a single wall, we study the sun. We learn where it rises over the site, how it rakes across the floor at noon, where it settles in the last golden hour before dusk. Light is the first material we design with — and the most important." },
      { type: "quote", text: "A room is only as good as the light that fills it." },
      { type: "p", text: "Windows are placed not for symmetry but for the quality of light they invite. Deep reveals soften harsh glare. Internal courtyards pull daylight into the heart of a home. Every opening is a decision about mood." },
      { type: "h", text: "The theatre of the day" },
      { type: "p", text: "Designed well, a home becomes a slow instrument for the day — bright and social in the morning, warm and intimate by evening. The architecture barely changes, yet the space feels completely different from hour to hour." },
      { type: "p", text: "This is why we begin with how a space should feel. Get the light right, and everything else — material, colour, furniture — simply follows." },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
