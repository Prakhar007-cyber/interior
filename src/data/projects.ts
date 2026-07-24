/**
 * Project case-studies. Kept as a plain typed array so it reads like a CMS
 * export — easy to extend and easy to explain. Image values are Unsplash photo
 * ids; the `unsplash()` helper turns them into optimised delivery URLs.
 */

export type GalleryItem = {
  id: string;
  alt: string;
  /** Layout hint used by the detail page to alternate composition. */
  span: "full" | "left" | "right" | "tall";
};

export type Project = {
  index: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  year: string;
  area: string;
  cover: string;
  hero: string;
  summary: string;
  philosophy: string[];
  challenge: string;
  outcome: string;
  materials: string[];
  gallery: GalleryItem[];
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "the-quiet-house",
    title: "The Quiet House",
    location: "New Delhi",
    category: "Residential",
    year: "2023",
    area: "4,200 sq ft",
    cover: "1616486338812-3dadae4b4ace",
    hero: "1600210492486-724fe5c67fb0",
    summary:
      "A family home stripped back to light, air and honest materials — designed to feel calm the moment you step inside.",
    philosophy: [
      "The Quiet House began with a single request: a home that could exhale. We removed the visual noise of the original apartment and rebuilt it around a restrained palette of lime plaster, pale oak and brushed brass.",
      "Every room is composed around the movement of daylight. Openings were widened, sightlines were opened between living spaces, and colour was almost entirely withdrawn so that texture and shadow could do the talking.",
    ],
    challenge:
      "The original layout was a warren of small, dark rooms typical of the building's era. The challenge was to introduce openness without losing the intimacy the family loved.",
    outcome:
      "A home that reads as one continuous, light-filled volume — yet still offers quiet corners to retreat to. The family describes it as the calmest place they have ever lived.",
    materials: ["Lime plaster", "Pale oak", "Brushed brass", "Linen"],
    gallery: [
      { id: "1600607687939-ce8a6c25118c", alt: "Living room in warm neutral tones", span: "full" },
      { id: "1600566753086-00f18fb6b3ea", alt: "Minimal dining area with oak table", span: "left" },
      { id: "1600585154340-be6161a56a0c", alt: "Bedroom with soft natural light", span: "right" },
      { id: "1583847268964-b28dc8f51f92", alt: "Detail of plaster wall and brass fitting", span: "tall" },
      { id: "1600121848594-d8644e57abab", alt: "Reading nook by the window", span: "full" },
    ],
  },
  {
    index: "02",
    slug: "house-of-light",
    title: "House of Light",
    location: "Jaipur",
    category: "Villa",
    year: "2022",
    area: "7,800 sq ft",
    cover: "1600047509807-ba8f99d2cdde",
    hero: "1615529182904-14819c35db37",
    summary:
      "A contemporary villa that choreographs the fierce Rajasthan sun into something soft, filtered and endlessly changing.",
    philosophy: [
      "In Jaipur, light is both a gift and a challenge. House of Light was conceived as an instrument for the sun — jaali screens, deep reveals and internal courtyards temper the glare and cast a slow theatre of shadow across the day.",
      "Local stone grounds the villa in its place, while the interiors stay deliberately quiet so that the shifting light remains the primary ornament.",
    ],
    challenge:
      "Harsh western light and 45°C summers threatened to make open interiors unlivable for half the year.",
    outcome:
      "Screened facades and a shaded central court keep the villa naturally cool while flooding every room with diffused, ever-moving daylight.",
    materials: ["Jaisalmer stone", "Teak", "Lime wash", "Cotton"],
    gallery: [
      { id: "1567016432779-094069958ea5", alt: "Sunlit villa interior with stone floor", span: "full" },
      { id: "1560448204-e02f11c3d0e2", alt: "Living space with filtered light", span: "left" },
      { id: "1560185007-cde436f6a4d0", alt: "Courtyard with planting", span: "right" },
      { id: "1502005229762-cf1b2da7c5d6", alt: "Bedroom with screened window", span: "full" },
      { id: "1554995207-c18c203602cb", alt: "Detail of carved stone screen", span: "tall" },
    ],
  },
  {
    index: "03",
    slug: "terra-residence",
    title: "Terra Residence",
    location: "Gurugram",
    category: "Penthouse",
    year: "2023",
    area: "5,600 sq ft",
    cover: "1493809842364-78817add7ffb",
    hero: "1586023492125-27b2c045efd7",
    summary:
      "A sky-high penthouse rooted, against expectation, in earth — travertine, clay and bronze against a wide city horizon.",
    philosophy: [
      "Terra Residence answers the coolness of glass towers with warmth. We wrapped the penthouse in travertine and clay-toned plaster, so that a home in the clouds still feels grounded in the earth.",
      "Furniture is low and sculptural, drawing the eye outward to the horizon while keeping the interior intimate and tactile.",
    ],
    challenge:
      "A vast open-plan shell with floor-to-ceiling glass felt impressive but impersonal and cold.",
    outcome:
      "Layered earth tones, sculptural volumes and considered lighting turn a showroom-like shell into a genuinely warm home in the sky.",
    materials: ["Travertine", "Clay plaster", "Bronze", "Wool"],
    gallery: [
      { id: "1615873968403-89e068629265", alt: "Penthouse living room at dusk", span: "full" },
      { id: "1631679706909-1844bbd07221", alt: "Open kitchen in warm stone", span: "left" },
      { id: "1618219908412-a29a1bb7b86e", alt: "Master bedroom with city view", span: "right" },
      { id: "1600566752355-35792bedcfea", alt: "Bronze and travertine detail", span: "tall" },
      { id: "1600585152220-90363fe7e115", alt: "Lounge with sculptural seating", span: "full" },
    ],
  },
  {
    index: "04",
    slug: "the-courtyard-home",
    title: "The Courtyard Home",
    location: "Ahmedabad",
    category: "Residential",
    year: "2021",
    area: "6,100 sq ft",
    cover: "1616137466211-f939a420be84",
    hero: "1616486029423-aaa4789e8c9a",
    summary:
      "A modern reinterpretation of the traditional Gujarati haveli, organised around a green, breathing courtyard at its heart.",
    philosophy: [
      "The Courtyard Home returns to an old idea — the house that turns inward around a central void. That courtyard cools the home, lights every room and gives the family a private piece of sky.",
      "Handcrafted detailing and regional craft run throughout, a quiet homage to Ahmedabad's deep architectural memory.",
    ],
    challenge:
      "A deep, narrow plot risked leaving the centre of the home dark and poorly ventilated.",
    outcome:
      "A central courtyard pulls light and air into the core of the house, while framing a calm green view from almost every room.",
    materials: ["Kota stone", "Handmade brick", "Rosewood", "Terracotta"],
    gallery: [
      { id: "1616594039964-ae9021a400a0", alt: "Courtyard with planting and stone floor", span: "full" },
      { id: "1616627561950-9f746e330187", alt: "Living room opening to courtyard", span: "left" },
      { id: "1600573472550-8090b5e0745e", alt: "Dining space with rosewood table", span: "right" },
      { id: "1600566752229-250ed79470f8", alt: "Bedroom with terracotta accents", span: "full" },
      { id: "1615874959474-d609969a20ed", alt: "Detail of handmade brick wall", span: "tall" },
    ],
  },
  {
    index: "05",
    slug: "sora",
    title: "Sora",
    location: "Mumbai",
    category: "Hospitality",
    year: "2024",
    area: "9,400 sq ft",
    cover: "1615529328331-f8917597711f",
    hero: "1617103996702-96ff29b1c467",
    summary:
      "An intimate restaurant and bar where diners move through a sequence of moods — from bright arrival to a deep, quiet close.",
    philosophy: [
      "Sora is designed as a journey. Guests arrive into a light, airy room and are drawn gradually inward to darker, more intimate spaces — the interior choreographs the arc of an evening.",
      "Materiality shifts with the mood: pale plaster and oak give way to smoked timber, deep clay and pools of low, warm light.",
    ],
    challenge:
      "A single long, awkward floor-plate needed to feel like several distinct spaces without losing flow or service efficiency.",
    outcome:
      "A layered sequence of rooms that lets guests choose their evening — lively and social at the front, hushed and romantic at the back.",
    materials: ["Smoked oak", "Micro-cement", "Aged brass", "Bouclé"],
    gallery: [
      { id: "1618220179428-22790b461013", alt: "Restaurant dining room with warm lighting", span: "full" },
      { id: "1598928506311-c55ded91a20c", alt: "Bar area in smoked timber", span: "left" },
      { id: "1604709177225-055f99402ea3", alt: "Intimate booth seating", span: "right" },
      { id: "1594026112284-02bb6f3352fe", alt: "Detail of brass and stone bar top", span: "tall" },
      { id: "1617806118233-18e1de247200", alt: "Private dining nook", span: "full" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
