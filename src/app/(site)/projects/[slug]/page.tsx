import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { projects, getProject, type GalleryItem } from "@/data/projects";
import { ProjectHero } from "@/components/sections/ProjectHero";
import { RevealImage } from "@/components/animations/RevealImage";
import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TransitionLink } from "@/components/layout/PageTransition";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: `${project.title} — ${project.location}`,
    description: project.summary,
  };
}

// Editorial layout classes per gallery span hint — creates asymmetry.
const spanClass: Record<GalleryItem["span"], string> = {
  full: "w-full aspect-[16/9]",
  left: "w-full md:w-4/5 self-start aspect-[16/10]",
  right: "w-full md:w-4/5 self-end aspect-[16/10]",
  tall: "w-full md:w-1/2 self-center aspect-[3/4]",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  // Determine the next project for the closing link.
  const idx = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(idx + 1) % projects.length];

  const facts = [
    { label: "Location", value: project.location },
    { label: "Year", value: project.year },
    { label: "Area", value: project.area },
    { label: "Category", value: project.category },
  ];

  return (
    <article>
      <ProjectHero
        image={project.hero}
        title={project.title}
        location={project.location}
        category={project.category}
      />

      {/* Facts + summary */}
      <section className="bg-bone py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="grid grid-cols-2 gap-8 md:col-span-5 md:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="border-t border-line pt-4">
                  <span className="label text-stone">{fact.label}</span>
                  <p className="mt-2 font-serif text-xl text-ink">{fact.value}</p>
                </div>
              ))}
            </div>
            <div className="md:col-span-7">
              <p className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-snug tracking-tight text-ink">
                {project.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-bone pb-8 md:pb-16">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionLabel>The Concept</SectionLabel>
            </div>
            <div className="space-y-6 md:col-span-8">
              {project.philosophy.map((para, i) => (
                <Reveal key={i} delayIndex={i}>
                  <p className="text-lg leading-relaxed text-stone md:text-xl">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-bone py-16 md:py-24">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-5 md:gap-10 md:px-10">
          {project.gallery.map((item) => (
            <RevealImage
              key={item.id}
              id={item.id}
              alt={item.alt}
              sizes="(max-width: 768px) 100vw, 80vw"
              className={spanClass[item.span]}
            />
          ))}
        </div>
      </section>

      {/* Challenge + Outcome */}
      <section className="bg-charcoal py-20 text-bone md:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 md:grid-cols-2 md:gap-20 md:px-10">
          <div>
            <SectionLabel dark>The Challenge</SectionLabel>
            <p className="mt-6 font-serif text-2xl leading-snug text-bone md:text-3xl">
              {project.challenge}
            </p>
          </div>
          <div>
            <SectionLabel dark>The Outcome</SectionLabel>
            <p className="mt-6 font-serif text-2xl leading-snug text-bone md:text-3xl">
              {project.outcome}
            </p>
          </div>
        </div>

        {/* Materials */}
        <div className="mx-auto mt-16 max-w-[1600px] px-5 md:px-10">
          <span className="label text-stone">Materials</span>
          <div className="mt-5 flex flex-wrap gap-3">
            {project.materials.map((m) => (
              <span
                key={m}
                className="rounded-full border border-bone/20 px-5 py-2 text-sm text-bone/80"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Next project */}
      <section className="bg-bone py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <TransitionLink
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col gap-2"
            data-cursor-label="NEXT"
          >
            <span className="label text-stone">Next Project — {nextProject.index}</span>
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-[clamp(2.5rem,7vw,7rem)] leading-none tracking-tight text-ink transition-colors group-hover:text-clay">
                {nextProject.title}
              </h2>
              <ArrowUpRight className="h-10 w-10 shrink-0 text-ink transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-16 md:w-16" />
            </div>
          </TransitionLink>

          <div className="mt-14 border-t border-line pt-8">
            <TransitionLink
              href="/#projects"
              className="text-sm text-stone transition-colors hover:text-ink"
            >
              ← Back to all projects
            </TransitionLink>
          </div>
        </div>
      </section>
    </article>
  );
}
