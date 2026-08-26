import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { stories } from '@/lib/content';
import { blurProps } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Stories & Impact',
  description:
    'Read stories of transformation from the communities Prince Asamany Foundation serves in Ejisu, Ashanti Region, Ghana.',
};

export default function StoriesPage() {
  return (
    <>
      {/* Hero */}
      <PageHeader
        overline="Impact Stories"
        title="Stories of those we've helped"
        description="Every number is a person. Every project is a life changed. Here are some of the people whose lives have been touched by the work of the Foundation."
      />

      {/* Story grid */}
      <section className="bg-brand-cream section-padding" aria-labelledby="stories-grid-heading">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <h2 id="stories-grid-heading" className="sr-only">Story grid</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story) => (
              <article key={story.id} className="bg-white rounded-card-lg overflow-hidden group">
                {/* Photo */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    {...blurProps(story.image)}
                  />
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-body font-semibold ${story.tagColor}`}>
                    {story.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-3">
                  <blockquote className="font-display italic text-base text-brand-navy leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-2">
                    <div className="font-body text-sm font-bold text-brand-navy">{story.name}</div>
                    <div className="font-body text-xs text-brand-navy/70 mt-0.5">{story.role}</div>
                    {story.date && (
                      <div className="font-body text-xs font-semibold text-brand-red-dark mt-1">{story.date}</div>
                    )}
                  </footer>
                  <Link
                    href={`/stories/${story.id}`}
                    className="font-body text-sm font-semibold text-brand-red-dark transition-colors duration-200 mt-2 inline-block"
                    aria-label={`Read ${story.name}'s full story`}
                  >
                    Read full story →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-green section-padding">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center flex flex-col items-center gap-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
            Be part of the next story.
          </h2>
          <p className="font-body text-lg text-white/90 leading-relaxed">
            Together we can restore hope and change lives. Support the Foundation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/donate" className="inline-flex items-center justify-center font-body font-semibold text-base bg-brand-red text-white px-8 py-4 rounded-btn border-2 border-brand-red hover:bg-brand-red-dark transition-all duration-200 w-full sm:w-auto sm:px-10">
              Donate Now
            </Link>
            <Link href="/get-involved" className="inline-flex items-center justify-center font-body font-semibold text-base bg-transparent text-white px-8 py-4 rounded-btn border-2 border-white/50 hover:bg-white/10 transition-all duration-200 w-full sm:w-auto">
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
