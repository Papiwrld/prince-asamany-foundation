import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <section className="bg-brand-navy section-padding min-h-[70vh] flex items-center">
      <div className="max-w-xl mx-auto px-5 md:px-8 text-center">
        <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold">
          404
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
          This page seems to have wandered off.
        </h1>
        <p className="font-body text-lg text-white/70 leading-relaxed mt-5">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get
          you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center font-body font-semibold text-base bg-brand-red text-white px-8 py-4 rounded-btn border-2 border-brand-red hover:bg-brand-red-dark hover:border-brand-red-dark transition-colors duration-200 w-full sm:w-auto"
          >
            Back to Home
          </Link>
          <Link
            href="/stories"
            className="inline-flex items-center justify-center font-body font-semibold text-base text-white px-8 py-4 rounded-btn border-2 border-white/40 hover:bg-white hover:text-brand-navy transition-colors duration-200 w-full sm:w-auto"
          >
            Read Impact Stories
          </Link>
        </div>
      </div>
    </section>
  );
}
