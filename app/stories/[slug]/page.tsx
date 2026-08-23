import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { stories } from '@/lib/content';

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return stories.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.id === slug);
  if (!story) notFound();
  return {
    title: `Story: ${story.name}`,
    description: story.quote,
  };
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = stories.find((s) => s.id === slug);
  if (!story) notFound();

  return (
    <>
      {/* Hero image */}
      <section className="relative h-[50vh] min-h-72 bg-brand-navy overflow-hidden">
        <Image src={story.image} alt={story.imageAlt} fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-gold" aria-hidden="true" />
        {/* Tag */}
        <div className="absolute top-24 md:top-28 left-5 md:left-8">
          <span className={`px-3 py-1.5 rounded-full text-xs font-body font-bold ${story.tagColor}`}>
            {story.tag}
          </span>
        </div>
      </section>

      {/* Article */}
      <article className="bg-brand-cream section-padding">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          {/* Back affordance at the top so readers can leave from anywhere */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link href="/stories" className="font-body text-sm font-semibold text-brand-navy border-b-2 border-brand-gold pb-1 hover:text-brand-red-dark transition-colors duration-200">
              ← All stories
            </Link>
          </nav>

          {/* Byline */}
          <header className="mb-10">
            <h1 className="font-display text-4xl md:text-5xl font-black text-brand-navy leading-tight mb-3">
              Story: {story.name}
            </h1>
            <p className="font-body text-sm text-brand-navy/55">{story.role}, {story.location}</p>
          </header>

          {/* Pull quote */}
          <blockquote className="border-l-4 border-brand-gold pl-6 mb-10">
            <p className="font-display italic text-xl text-brand-navy leading-relaxed">
              &ldquo;{story.quote}&rdquo;
            </p>
          </blockquote>

          {/* Body paragraphs */}
          <div className="flex flex-col gap-5">
            {story.body.map((para, i) => (
              <p key={i} className="font-body text-lg text-brand-navy/75 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Back link + CTA */}
          <div className="mt-14 pt-8 border-t border-brand-navy/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <Link href="/stories" className="font-body text-sm font-semibold text-brand-navy border-b-2 border-brand-gold pb-1 hover:text-brand-red-dark transition-colors duration-200">
              ← All stories
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center font-body font-semibold text-sm bg-brand-red text-white px-6 py-3 rounded-btn border-2 border-brand-red hover:bg-brand-red-dark transition-all duration-200"
            >
              Support the Foundation
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
