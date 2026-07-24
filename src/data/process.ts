export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  image: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We begin by understanding you — how you live, how you gather, how you want a space to feel. We study the site, its light and its constraints.",
    image: "1522708323590-d24dbb6b0267",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Concept development, moodboards and spatial planning. We translate your life into a clear architectural and material direction.",
    image: "1600607687939-ce8a6c25118c",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Materials, furniture, lighting and detailing are resolved to the millimetre — every decision drawn, specified and coordinated.",
    image: "1586023492125-27b2c045efd7",
  },
  {
    number: "04",
    title: "Build",
    description:
      "Execution and on-site coordination. We work closely with makers and contractors to protect the integrity of the design.",
    image: "1533090161767-e6ffed986c88",
  },
  {
    number: "05",
    title: "Style",
    description:
      "The final layer — furniture, textiles, art and objects placed with care — before we hand over a home that is ready to be lived in.",
    image: "1600585154340-be6161a56a0c",
  },
];
