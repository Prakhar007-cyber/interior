import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles, getArticle } from "@/data/journal";
import { RevealImage } from "@/components/animations/RevealImage";
import { Reveal } from "@/components/animations/Reveal";
import { TransitionLink } from "@/components/layout/PageTransition";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Journal" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article className="bg-bone">
      {/* Header */}
      <header className="mx-auto max-w-[900px] px-5 pb-12 pt-32 text-center md:pt-44">
        <div className="flex items-center justify-center gap-3 text-stone">
          <span className="label">{article.category}</span>
          <span className="h-1 w-1 rounded-full bg-stone/50" />
          <span className="text-sm">{article.readTime}</span>
          <span className="h-1 w-1 rounded-full bg-stone/50" />
          <span className="text-sm">{article.date}</span>
        </div>
        <h1 className="mt-8 font-serif text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-tight text-ink">
          {article.title}
        </h1>
        <p className="mt-6 text-lg text-stone">{article.excerpt}</p>
      </header>

      {/* Lead image */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <RevealImage
          id={article.image}
          alt={article.title}
          className="aspect-[16/9]"
          sizes="90vw"
          priority
        />
      </div>

      {/* Body */}
      <div className="mx-auto max-w-[720px] px-5 py-16 md:py-24">
        <div className="space-y-8">
          {article.body.map((block, i) => {
            if (block.type === "quote") {
              return (
                <Reveal key={i}>
                  <blockquote className="border-l-2 border-clay py-2 pl-6 font-serif text-2xl leading-snug tracking-tight text-ink md:text-3xl">
                    {block.text}
                  </blockquote>
                </Reveal>
              );
            }
            if (block.type === "h") {
              return (
                <Reveal key={i}>
                  <h2 className="pt-4 font-serif text-2xl tracking-tight text-ink md:text-3xl">
                    {block.text}
                  </h2>
                </Reveal>
              );
            }
            return (
              <Reveal key={i}>
                <p className="text-lg leading-relaxed text-stone">{block.text}</p>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <TransitionLink
            href="/#journal"
            className="text-sm text-stone transition-colors hover:text-ink"
          >
            ← Back to the journal
          </TransitionLink>
        </div>
      </div>
    </article>
  );
}
